# Checkpoint 2: Added Product, User, and Order models; integrated MySQL database.


from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):

    salt = models.CharField(max_length=255, blank=True, null=True)

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email


class Category(models.Model):
    ct_id = models.AutoField(primary_key=True) 
    ct_name = models.CharField(max_length=100)
    ct_description = models.CharField(max_length=255, blank=True)
    ct_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'categories'

    def __str__(self):
        return self.ct_name


class Product(models.Model):
    pdt_id = models.AutoField(primary_key=True)
    pdt_name = models.CharField(max_length=150)
    pdt_mrp = models.DecimalField(max_digits=10, decimal_places=2)
    pdt_dis_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    pdt_qty = models.IntegerField(default=0)
    ct = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', db_column='ct_id')

    class Meta:
        db_table = 'products'

    def __str__(self):
        return self.pdt_name
