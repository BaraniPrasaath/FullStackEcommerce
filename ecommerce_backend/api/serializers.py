from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import connection
from .models import Category, Product
from .utils.security import hash_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'confirm_password']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        # remove confirm_password before saving
        validated_data.pop('confirm_password', None)

        email = validated_data['email']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']

        # hash the password and generate salt using your custom utility
        hashed_password, salt = hash_password(password)

        # create user (NO username field)
        user = User.objects.create(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=hashed_password,
        )

        #  manually store salt in your custom user table
        with connection.cursor() as cursor:
            cursor.execute("UPDATE api_customuser SET salt=%s WHERE id=%s", [salt, user.id])

        return user

class ProductSerializer(serializers.ModelSerializer):
    ct_id = serializers.IntegerField(source="ct.ct_id", read_only=True)
    class Meta:
        model = Product
        fields = ['pdt_id', 'pdt_name', 'pdt_mrp', 'pdt_dis_price', 'pdt_qty', 'ct_id']


class CategorySerializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(source='products.count', read_only=True)
    class Meta:
        model = Category
        fields = ['ct_id', 'ct_name', 'ct_description', 'ct_date', 'products_count']
