# file: api/urls.py

from django.conf.urls import url
from rest_framework.authtoken import views as drf_views
from django.contrib import admin
from django.urls import include, path
from . import views



urlpatterns = [
	path('', views.ListCrimes.as_view()),
	path('<int:pk>/', views.DetailCrime.as_view()),
	path('gfilter/', views.GlobalFilter.as_view()),
]
