from django.shortcuts import render
from django import http
from rest_framework import generics
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
import datetime

from . import models
from . import serializers
# Create your views here.

class ListCrimes(generics.ListCreateAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.CrimeSerializer


class DetailCrime(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.CrimeSerializer

	
class GlobalFilter(APIView):
	serializer_class = serializers.CrimeSerializer
	
	
	def get_queryset(self):
		queryset = models.Crimedata.objects.filter(date__range=["2018-02-19", "2018-02-25"]).order_by("date")
		return queryset

	def get(self, request):
		queryset = self.get_queryset()
		return_json = {'labels': [], 'values': []}
		start_date = datetime.date( year = 2018, month = 2, day = 19 )
		end_date = datetime.date( year = 2018, month = 2, day = 25 )
		for n in range( ( end_date - start_date ).days + 1 ):
			return_json['labels'].append( (start_date + datetime.timedelta( n )).strftime('%m/%d/%Y')  )
			return_json['values'].append(0)
		for row in queryset:
			date = (row.date).strftime('%m/%d/%Y') 
			print(date)
			index = return_json['labels'].index(date)
			return_json['values'][index] = return_json['values'][index] + 1
		print(return_json)
		#print(getattr(queryset[0], "date"))
		return http.JsonResponse(return_json)
		
		