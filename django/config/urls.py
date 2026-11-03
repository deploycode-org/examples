from django.urls import path

from config import views

urlpatterns = [
    path("", views.index),
    path("health", views.health),
]
