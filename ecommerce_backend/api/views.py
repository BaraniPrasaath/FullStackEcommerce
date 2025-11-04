# Checkpoint 3: Implemented secure authentication with salt & pepper password hashing and also Elastic search implementation



from django.shortcuts import render

# DRF View base + HTTP responses.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Built-in models
#from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# Function and Class
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.decorators import api_view

# My File
from .serializers import RegisterSerializer
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

#used for searching
from .documents import ProductDocument
from django_elasticsearch_dsl.search import Search

#built-in methods
import json
from django.db import transaction, IntegrityError
from rest_framework import generics, filters

from .utils.security import verify_password

from django.contrib.auth import get_user_model
from .models import CustomUser as User

from datetime import timedelta
from django.conf import settings

  
User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Works When the user sign-in
@csrf_exempt
def login_user(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required"}, status=400)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        # get user by email
        user = User.objects.filter(email=email).first()
        if user is None:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

        # verify password using your salt + pepper function
        if not verify_password(password, user.password, user.salt):
            return JsonResponse({"error": "Invalid credentials"}, status=400)

        # generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # set 7-day expiry for access token (default is shorter)
        refresh.set_exp(lifetime=timedelta(days=7))
        refresh.access_token.set_exp(lifetime=timedelta(days=7))

        # create response
        response = JsonResponse({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email
            },
            "access_token": access_token,    
            "refresh_token": refresh_token   
        }, status=200)

        # store tokens securely in HTTP-only cookies
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,   
            samesite='None',
            max_age=7 * 24 * 60 * 60  # 7 days
        )

        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=7 * 24 * 60 * 60
        )

        return response

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@api_view(['POST'])
def bulk_create_products(request):
    """
    Accepts a JSON array of product objects and bulk-creates them.
    Each object should contain: pdt_id, pdt_name, pdt_mrp, pdt_dis_price, pdt_qty, ct_id
    """
    data = request.data
    if not isinstance(data, list):
        return Response({"error": "Expected a JSON array"}, status=status.HTTP_400_BAD_REQUEST)

    created = 0
    errors = []
    objs = []

    with transaction.atomic():
        for i, item in enumerate(data, start=1):
            try:
                # validate required fields
                for f in ("pdt_id", "pdt_name", "pdt_mrp", "pdt_qty", "ct_id"):
                    if f not in item:
                        raise ValueError(f"Missing field: {f}")

                ct_id = item.get("ct_id")
                try:
                    category = Category.objects.get(ct_id=ct_id)
                except Category.DoesNotExist:
                    raise ValueError(f"Category ct_id={ct_id} does not exist")

                # create Product instance (do not save yet)
                p = Product(
                    pdt_id = item.get("pdt_id"),
                    pdt_name = item.get("pdt_name"),
                    pdt_mrp = item.get("pdt_mrp"),
                    pdt_dis_price = item.get("pdt_dis_price"),
                    pdt_qty = item.get("pdt_qty"),
                    ct = category
                )
                objs.append(p)
            except Exception as e:
                errors.append({"index": i, "error": str(e), "item": item})

        # If there were any validation errors, roll back and return
        if errors:
            return Response({"created": 0, "errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        try:
            Product.objects.bulk_create(objs)
            created = len(objs)
        except IntegrityError as e:
            return Response({"error": "DB integrity error", "detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"created": created}, status=status.HTTP_201_CREATED)


    
class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('ct_id')
    serializer_class = CategorySerializer

# get single category (optional)
class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'ct_id'

# list products (optionally filter by category via query param)
class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['pdt_name']

    def get_queryset(self):
        qs = Product.objects.select_related('ct').all().order_by('pdt_id')
        ct_id = self.request.query_params.get('ct_id')  # ?ct=1
        if ct_id:
            qs = qs.filter(ct__ct_id=ct_id)
        return qs

# product detail
class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('ct').all()
    serializer_class = ProductSerializer
    lookup_field = 'pdt_id'

#new

@api_view(['GET'])
def search_products(request):
    import re
    from elasticsearch_dsl import Q
    from .models import Product  # for fallback
    from .serializers import ProductSerializer  # create if not already

    q = request.GET.get('q', '').strip()
    if not q:
        return Response([], status=status.HTTP_200_OK)

    q_lower = q.lower()
    price_filter = None
    match = re.search(r'(\d{2,6})', q_lower)

    # extract price filters
    if match:
        amount = float(match.group(1))
        if any(w in q_lower for w in ["under", "below", "less"]):
            price_filter = ("lte", amount)
        elif any(w in q_lower for w in ["over", "above", "greater"]):
            price_filter = ("gte", amount)
        elif "between" in q_lower:
            nums = re.findall(r'\d+', q_lower)
            if len(nums) >= 2:
                price_filter = ("between", (float(nums[0]), float(nums[1])))

        q = re.sub(r'\b(under|below|less|over|above|greater|than|between|\d{2,6})\b', '', q_lower).strip()

    # --- Elasticsearch search ---
    s = ProductDocument.search()

    try:
        # Text + fuzzy combo
        text_query = Q(
            "bool",
            should=[
                Q("multi_match",
                  query=q,
                  type="best_fields",
                  fields=["pdt_name^3", "ct.ct_name^2", "ct.ct_description"],
                  fuzziness="AUTO",
                  prefix_length=1,
                  operator="or"),
                Q("match_phrase", **{"pdt_name": q})
            ],
            minimum_should_match=1
        )

        s = s.query(text_query)

        if price_filter:
            op, val = price_filter
            if op == "between":
                s = s.filter("range", pdt_dis_price={"gte": val[0], "lte": val[1]})
            else:
                s = s.filter("range", **{"pdt_dis_price": {op: val}})

        results = s.execute()
        if not results.hits:
            raise Exception("No results from Elasticsearch")

        # ✅ format ES results
        data = []
        for hit in results:
            ct = getattr(hit, "ct", None)
            category_name = None
            if ct:
                try:
                    category_name = ct.get("ct_name") if hasattr(ct, "get") else getattr(ct, "ct_name", None)
                except Exception:
                    pass

            data.append({
                "pdt_id": getattr(hit, "pdt_id", None),
                "pdt_name": getattr(hit, "pdt_name", None),
                "pdt_mrp": getattr(hit, "pdt_mrp", None),
                "pdt_dis_price": getattr(hit, "pdt_dis_price", None),
                "pdt_qty": getattr(hit, "pdt_qty", None),
                "category": category_name,
                "_score": getattr(hit.meta, "score", None),
            })

        return Response(data, status=200)

    except Exception as e:
        print("⚠️ Elasticsearch failed or empty:", e)

        # Fallback: Django ORM simple search
        products = Product.objects.filter(pdt_name__icontains=q)
        if price_filter:
            op, val = price_filter
            if op == "between":
                products = products.filter(pdt_dis_price__gte=val[0], pdt_dis_price__lte=val[1])
            elif op == "lte":
                products = products.filter(pdt_dis_price__lte=val)
            elif op == "gte":
                products = products.filter(pdt_dis_price__gte=val)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=200)





























# @api_view(['GET'])
# def search_products(request):
#     import re
#     from elasticsearch_dsl import Q

#     q = request.GET.get('q', '').strip()
#     if not q:
#         return Response([], status=status.HTTP_200_OK)

#     page = int(request.GET.get('page', 1))
#     size = int(request.GET.get('size', 20))
#     start = (page - 1) * size

#     # --- 🧩 Extract numeric filter ---
#     q_lower = q.lower()
#     price_filter = None
#     match = re.search(r'(\d{2,6})', q_lower)

#     if match:
#         amount = float(match.group(1))
#         if any(word in q_lower for word in ["under", "below", "less"]):
#             price_filter = ("lte", amount)
#         elif any(word in q_lower for word in ["over", "above", "greater"]):
#             price_filter = ("gte", amount)

#         # Clean out those words for better text relevance
#         q = re.sub(r'\b(under|below|less|over|above|greater|than|\d{2,6})\b', '', q_lower).strip()

#     # --- Base search ---
#     s = ProductDocument.search()

#     text_query = Q(
#         "multi_match",
#         query=q,
#         type="best_fields",
#         fields=[
#             "pdt_name^3",
#             "ct.ct_name^2",
#             "ct.ct_description"
#         ],
#         fuzziness="AUTO",
#         prefix_length=1,
#         operator="or"
#     )

#     s = s.query(text_query)

#     # --- 🧩 Safe price filter ---
#     if price_filter:
#         op, val = price_filter
#         try:
#             s = s.filter("range", **{"pdt_dis_price": {op: val}})
#         except Exception as e:
#             # Log and continue gracefully
#             print("Price filter error:", e)

#     # Pagination
#     s = s[start:start + size]

#     try:
#         results = s.execute()
#     except Exception as e:
#         # Return clean JSON instead of crashing
#         return Response({"error": f"Elasticsearch query failed: {str(e)}"}, status=500)

#     # --- Format response ---
#     data = []
#     for hit in results:
#         ct = getattr(hit, "ct", None)

#     # safely extract category name from both dict or AttrDict
#         if ct:
#             try:
#                 category_name = ct.get("ct_name") if hasattr(ct, "get") else getattr(ct, "ct_name", None)
#             except Exception:
#                 category_name = None
#         else:
#             category_name = None

#         data.append({
#             "pdt_id": getattr(hit, "pdt_id", None),
#             "pdt_name": getattr(hit, "pdt_name", None),
#             "pdt_mrp": getattr(hit, "pdt_mrp", None),
#             "pdt_dis_price": getattr(hit, "pdt_dis_price", None),
#             "pdt_qty": getattr(hit, "pdt_qty", None),
#             "category": category_name,
#             "_score": getattr(hit.meta, "score", None),
#         })

#     return Response(data, status=200)











# old previous 
# @api_view(['GET'])
# def search_products(request):
#     q = request.GET.get('q', '').strip()
#     if not q:
#         return Response([], status=status.HTTP_200_OK)

#     page = int(request.GET.get('page', 1))
#     size = int(request.GET.get('size', 20))
#     start = (page - 1) * size

#     s = ProductDocument.search()

#     # ✅ Use a flexible fuzzy query (for typos and partial matches)
#     s = s.query(
#         "multi_match",
#         query=q,
#         type="best_fields",
#         fields=[
#             "pdt_name^3",              # prioritize product name
#             "ct.ct_name^2",            # then category name
#             "ct.ct_description"        # then category description
#         ],
#         fuzziness="AUTO",
#         prefix_length=1,
#         operator="or"
#     )

#     s = s[start:start + size]

#     try:
#         results = s.execute()
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     data = []
#     for hit in results:
#         # ✅ Safe extraction — handle both dict and AttrDict from Elasticsearch
#         ct_data = None
#         if hasattr(hit, "ct") and hit.ct:
#             # sometimes hit.ct is AttrDict instead of dict
#             if isinstance(hit.ct, dict):
#                 ct_data = hit.ct.get("ct_name")
#             elif hasattr(hit.ct, "ct_name"):
#                 ct_data = hit.ct.ct_name

#         data.append({
#             "pdt_id": getattr(hit, "pdt_id", None),
#             "pdt_name": getattr(hit, "pdt_name", None),
#             "pdt_mrp": getattr(hit, "pdt_mrp", None),
#             "pdt_dis_price": getattr(hit, "pdt_dis_price", None),
#             "pdt_qty": getattr(hit, "pdt_qty", None),
#             "category": ct_data,
#             "_score": getattr(hit.meta, "score", None),
#         })

#     return Response(data, status=status.HTTP_200_OK)


# old
# Add this function
# @api_view(['GET'])
# def search_products(request):
#     """
#     Search products using Elasticsearch.
#     Query params:
#       - q: search string (required)
#       - page: page number (default 1)
#       - size: number of items per page (default 20)
#     """
#     q = request.GET.get('q', '').strip()
#     if not q:
#         return Response([], status=status.HTTP_200_OK)

#     # Pagination
#     page = int(request.GET.get('page', 1))
#     size = int(request.GET.get('size', 20))
#     start = (page - 1) * size

#     # Build search query
#     s = ProductDocument.search().query(
#         "multi_match",
#         query=q,
#         type="cross_fields",
#         fields=["pdt_name", "ct.ct_name"],
#         operator="and"
#     )[start:start + size]

#     try:
#         results = s.execute()
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     data = []
#     for hit in results:
#         ct_name = None
#         if hasattr(hit, "ct") and isinstance(hit.ct, dict):
#             ct_name = hit.ct.get("ct_name")
#         elif hasattr(hit, "ct") and hasattr(hit.ct, "ct_name"):
#             ct_name = hit.ct.ct_name

#         data.append({
#             "pdt_id": getattr(hit, "pdt_id", None),
#             "pdt_name": getattr(hit, "pdt_name", None),
#             "pdt_mrp": getattr(hit, "pdt_mrp", None),
#             "pdt_dis_price": getattr(hit, "pdt_dis_price", None),
#             "pdt_qty": getattr(hit, "pdt_qty", None),
#             "category": ct_name,
#             "_score": getattr(hit.meta, "score", None),
#         })

#     return Response(data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def search_products(request):
#     query = request.GET.get('q', '')
#     if not query:
#         return Response({'error': 'Query parameter "q" is required'}, status=status.HTTP_400_BAD_REQUEST)
    
#     # Perform a simple text search
#     s = ProductDocument.search().query("multi_match", query=query, fields=['pdt_name', 'ct.ct_name'])
#     results = s.execute()

#     data = []
#     for hit in results:
#         data.append({
#             'pdt_id': hit.pdt_id,
#             'pdt_name': hit.pdt_name,
#             'pdt_mrp': hit.pdt_mrp,
#             'pdt_dis_price': hit.pdt_dis_price,
#             'pdt_qty': hit.pdt_qty,
#             'category': hit.ct.ct_name if hasattr(hit.ct, 'ct_name') else None
#         })

#     return Response(data)