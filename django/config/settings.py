"""Settings for the Django example: one page, no apps, a local SQLite database."""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Set DJANGO_SECRET_KEY in the service variables; the fallback is for running locally.
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "django-insecure-example-key-change-me")
DEBUG = os.environ.get("DJANGO_DEBUG") == "1"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "*").split(",")

INSTALLED_APPS: list[str] = []

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

USE_TZ = True

# HTTPS ends at the reverse proxy in front of the app.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
