# file: api/urls.py

from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.authtoken import views as drf_views

from . import views

urlpatterns = [
	path('', views.ListCrimes.as_view()),
	path('<int:pk>/', views.DetailCrime.as_view()),
	#path('gfilter/start_date=<start_date>&end_date=<end_date>&start_time=<start_time>&end_time=<end_time>', views.GlobalFilter.as_view()),
	re_path(r'^gfilter/start_date=(?P<start_date>.*)&end_date=(?P<end_date>.*)&start_time=(?P<start_time>.*)&end_time=(?P<end_time>.*)&days=(?P<days>\[(\w*)(,*\w*)*\])&codes=(?P<codes>\[(\w*)(,*\w*)*\])&districts=(?P<districts>\[(\w*)(,*\w*)*\])&weapons=(?P<weapons>\[(\w*)(,*\w*)*\])&start_lat=(?P<start_lat>.*)&end_lat=(?P<end_lat>.*)&start_long=(?P<start_long>.*)&end_long=(?P<end_long>.*)&i_o=(?P<i_o>\[(\w*)(,*\w*)*\])$', views.GlobalFilterStructured.as_view()),
	re_path(r'^start_date=(?P<start_date>.*)&end_date=(?P<end_date>.*)&start_time=(?P<start_time>.*)&end_time=(?P<end_time>.*)&days=(?P<days>\[(\w*)(,*\w*)*\])&codes=(?P<codes>\[(\w*)(,*\w*)*\])&districts=(?P<districts>\[(\w*)(,*\w*)*\])&weapons=(?P<weapons>\[(\w*)(,*\w*)*\])&start_lat=(?P<start_lat>.*)&end_lat=(?P<end_lat>.*)&start_long=(?P<start_long>.*)&end_long=(?P<end_long>.*)&i_o=(?P<i_o>\[(\w*)(,*\w*)*\])$', views.GlobalFilterRawData.as_view()),
	path('codelookup/', views.CrimeCodeLookup.as_view()),
	re_path(r'^add/name=(?P<name>.*)&type=(?P<type>.*)$', views.AddVisualization.as_view()),
	re_path(r'hide/id=(?P<id>\d+)$', views.HideVisualization.as_view()),
	re_path(r'restore/id=(?P<id>\d+)$', views.RestoreVisualization.as_view()),
	re_path(r'^lfilter/id=(?P<id>\d+)&start_date=(?P<start_date>.*)&end_date=(?P<end_date>.*)&start_time=(?P<start_time>.*)&end_time=(?P<end_time>.*)&days=(?P<days>\[(\w*)(,*\w*)*\])&codes=(?P<codes>\[(\w*)(,*\w*)*\])&districts=(?P<districts>\[(\w*)(,*\w*)*\])&weapons=(?P<weapons>\[(\w*)(,*\w*)*\])&start_lat=(?P<start_lat>.*)&end_lat=(?P<end_lat>.*)&start_long=(?P<start_long>.*)&end_long=(?P<end_long>.*)&i_o=(?P<i_o>\[(\w*)(,*\w*)*\])$', views.SetLocalFilter.as_view()),
	path('getrestorable/', views.GetRestorableVisualizations.as_view()),
]
