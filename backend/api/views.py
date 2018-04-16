from django.shortcuts import render
from django import http
from rest_framework import generics
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
import datetime
import re
import string

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
		queryset = models.Crimedata.objects.all()
		return queryset

	def get(self, request, start_date="", end_date="", start_time="", end_time="", codes=[]):
		#put codes in a list for easy filtering
		codes = codes.replace('[', '')
		codes = codes.replace(']', '')
		codes = re.split(',\s*', codes)
			
		#if start times and end times are empty, set them to default values
		if start_time == "":
			start_time = "00:00:00"
		if end_time == "":
			end_time = "23:59:59"
			
		queryset = self.get_queryset()
		#filter based on provided start_date / end_date and start time/end time
		if start_date == "" and end_date == "":
			queryset = queryset.filter(time__range=[start_time, end_time]).order_by("date")
		elif start_date == "":
			queryset = queryset.filter(date__lte=end_date, time__range=[start_time, end_time]).order_by("date")
		elif end_date == "":
			queryset = queryset.filter(date__gte=start_date, time__range=[start_time, end_time]).order_by("date")
		else:
			queryset = queryset.filter(date__range=[start_date, end_date], time__range=[start_time, end_time]).order_by("date")
			
		#filter on list of crime codes
		if codes[0] != '':
			queryset = queryset.filter(code__in=codes)
			
		#create the return json
		return_json = {'labels': [], 'values': []}
		start_d = datetime.datetime.combine(queryset[0].date, datetime.time())
		end_d = datetime.datetime.combine(queryset[queryset.count() - 1].date, datetime.time())
		for n in range( ( end_d - start_d ).days + 1 ):
			return_json['labels'].append( (start_d + datetime.timedelta( n )).strftime('%m/%d/%Y')  )
			return_json['values'].append(0)
		for row in queryset:
			date = (row.date).strftime('%m/%d/%Y') 
			index = return_json['labels'].index(date)
			return_json['values'][index] = return_json['values'][index] + 1
		return http.JsonResponse(return_json)
		
		