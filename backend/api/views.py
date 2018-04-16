from django.shortcuts import render
from django import http
from rest_framework import generics
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
import datetime

from . import models
from . import serializers
# Create your views here.

class ListCrimes(generics.ListCreateAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.CrimeSerializer


class DetailCrime(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.GlobalFilterSerializer

	
class GlobalFilter(APIView):
	serializer_class = serializers.CrimeSerializer

	
	def get_queryset(self):
		queryset = models.Crimedata.objects.all()
		return queryset

	def get(self, request, start_date, end_date):
		queryset = models.Crimedata.objects.filter(date__range=[start_date, end_date]).order_by("date")
		return_json = {'labels': [], 'values': []}
		start_d = datetime.datetime.strptime(start_date, "%Y-%m-%d")
		end_d = datetime.datetime.strptime(end_date, "%Y-%m-%d")
		for n in range( ( end_d - start_d ).days + 1 ):
			return_json['labels'].append( (start_d + datetime.timedelta( n )).strftime('%m/%d/%Y')  )
			return_json['values'].append(0)
		for row in queryset:
			date = (row.date).strftime('%m/%d/%Y') 
			print(date)
			index = return_json['labels'].index(date)
			return_json['values'][index] = return_json['values'][index] + 1
		print(return_json)
		#print(getattr(queryset[0], "date"))
		return http.JsonResponse(return_json)
		
		