# file: api/urls.py

from django.conf.urls import url
from rest_framework.authtoken import views as drf_views
from django.contrib import admin
from django.urls import include, path, re_path
from . import views



urlpatterns = [
	path('', views.ListCrimes.as_view()),
	path('<int:pk>/', views.DetailCrime.as_view()),
	#path('gfilter/start_date=<start_date>&end_date=<end_date>&start_time=<start_time>&end_time=<end_time>', views.GlobalFilter.as_view()),
	re_path(r'^gfilter/(?P<start_date>.*)&(?P<end_date>.*)&(?P<start_time>.*)&(?P<end_time>.*)$', views.GlobalFilter.as_view()),
]
