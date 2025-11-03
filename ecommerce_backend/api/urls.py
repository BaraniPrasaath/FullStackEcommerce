from django.urls import path
from . import views
from .views import RegisterView
from .views import search_products
from .views import bulk_create_products

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    #path('token/', GetTokenView.as_view(), name='token'),
    #path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),

    path('categories/', views.CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<int:id>/', views.CategoryDetailAPIView.as_view(), name='category-detail'),
    path('products/', views.ProductListAPIView.as_view(), name='product-list'),        # GET /api/products/?ct=1
    path('products/<int:id>/', views.ProductDetailAPIView.as_view(), name='product-detail'),
    path('search/', search_products, name='search_products'),
    path('products/bulk_create/', bulk_create_products, name='bulk_create_products'),
]