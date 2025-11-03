import os
import hashlib
import binascii
from dotenv import load_dotenv
from django.conf import settings


load_dotenv()

PEPPER = os.getenv("APP_PEPPER", "default_pepper_value")

def hash_password(password):
    """Hash password with salt and pepper."""
    salt = os.urandom(16).hex()
    pepper = getattr(settings, "PEPPER", "")
    hashed = hashlib.sha256((password + salt + pepper).encode()).hexdigest()
    return hashed, salt


def verify_password(password, stored_hash, salt):
    """Verify password against stored hash."""
    pepper = getattr(settings, "PEPPER", "")
    check_hash = hashlib.sha256((password + salt + pepper).encode()).hexdigest()
    return check_hash == stored_hash