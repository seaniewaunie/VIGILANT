from django.shortcuts import render
from django import http
from rest_framework import generics
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
import datetime
import re
import string
from django.db.models import Q

from . import models
from . import serializers
from django.core import serializers as django_serializers
# Create your views here.

class ListCrimes(generics.ListCreateAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.CrimeSerializer


class DetailCrime(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.CrimeSerializer

	
class GlobalFilterStructured(APIView):
	serializer_class = serializers.CrimeSerializer

	
	def get_queryset(self):
		queryset = models.Crimedata.objects.all()
		return queryset

	def get(self, request, start_date="", end_date="", days="[]", start_time="", end_time="", codes="[]", districts="[]", weapons="[]", start_lat=0.0, end_lat=0.0, start_long=0.0, end_long=0.0, i_o=""):
		days_words = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	
		#put codes in a list for easy filtering
		codes = codes.replace('[', '')
		codes = codes.replace(']', '')
		codes = re.split(',\s*', codes)
		
		#put districts in a list for easy filtering
		districts = districts.replace('[', '')
		districts = districts.replace(']', '')
		districts = re.split(',\s*', districts)
		for i in range(len(districts)):
			districts[i] = districts[i].upper()
			
		#put weapons in a list for easy filtering
		weapons = weapons.replace('[', '')
		weapons = weapons.replace(']', '')
		weapons = re.split(',\s*', weapons)
		for i in range(len(weapons)):
			weapons[i] = weapons[i].upper()
			
		#put days in a list for easy filtering
		days = days.replace('[', '')
		days = days.replace(']', '')
		days = re.split(',\s*', days)
		if days[0] != '':
			for i in range(len(days)):
				days[i] = int(days[i])
				days[i] = days_words[days[i]]

		
		s_lat = -1.0
		e_lat = -1.0
		s_long = -1.0
		e_long = -1.0
			
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
			
		#filter on list of days of the week
		if days[0] != '':
			queryset = queryset.filter(day__in=days)
			
		#filter on list of crime codes
		if codes[0] != '':
			queryset = queryset.filter(code__in=codes)
			
		#filter on list of districts
		if districts[0] != '':
			queryset = queryset.filter(district__in=districts)
			
		if weapons[0] != '':
			if "NULL" in weapons:
				weapons.remove("NULL")
				if len(weapons) != 0:
					queryset = queryset.filter(Q(weapon__in=weapons) | Q(weapon__isnull=True))
				else:	
					queryset = queryset.filter(weapon__isnull=True)
			else:
				queryset = queryset.filter(weapon__in=weapons)

		
		if start_lat != "" and end_lat != "":
			s_lat = float(start_lat)
			e_lat = float(end_lat)
		if start_long != "" and end_long != "":
			s_long = float(start_long)
			e_long = float(end_long)

			
		if s_lat != -1.0 and e_lat != -1.0:
			queryset = queryset.filter(latitude__range=[s_lat, e_lat])
		if s_long != -1.0 and e_long != -1.0:
			queryset = queryset.filter(longitude__range=[s_long, e_long])
			
		if i_o != "":
			i_o = i_o.upper()
			if i_o == "IO" or i_o == "OI" or i_o == "BOTH":
				queryset = queryset.filter(inside_outside__in=["I", "O"])
			else:
				queryset = queryset.filter(inside_outside=i_o)
			
			
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
		
		
class GlobalFilterRawData(APIView):
	serializer_class = serializers.CrimeSerializer

	
	def get_queryset(self):
		queryset = models.Crimedata.objects.all()
		return queryset

	def get(self, request, start_date="", end_date="", days="[]", start_time="", end_time="", codes="[]", districts="[]", weapons="[]", start_lat=0.0, end_lat=0.0, start_long=0.0, end_long=0.0, i_o=""):
		days_words = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		
		#put codes in a list for easy filtering
		codes = codes.replace('[', '')
		codes = codes.replace(']', '')
		codes = re.split(',\s*', codes)
		
		#put districts in a list for easy filtering
		districts = districts.replace('[', '')
		districts = districts.replace(']', '')
		districts = re.split(',\s*', districts)
		for i in range(len(districts)):
			districts[i] = districts[i].upper()
			
		#put weapons in a list for easy filtering
		weapons = weapons.replace('[', '')
		weapons = weapons.replace(']', '')
		weapons = re.split(',\s*', weapons)
		for i in range(len(weapons)):
			weapons[i] = weapons[i].upper()
			
		#put days in a list for easy filtering
		days = days.replace('[', '')
		days = days.replace(']', '')
		days = re.split(',\s*', days)
		if days[0] != '':
			for i in range(len(days)):
				days[i] = int(days[i])
				days[i] = days_words[days[i]]
			
		s_lat = -1.0
		e_lat = -1.0
		s_long = -1.0
		e_long = -1.0
			
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
			
		#filter on list of days of the week
		if days[0] != '':
			queryset = queryset.filter(day__in=days)
			
		#filter on list of crime codes
		if codes[0] != '':
			queryset = queryset.filter(code__in=codes)
			
		#filter on list of districts
		if districts[0] != '':
			queryset = queryset.filter(district__in=districts)
			
		if weapons[0] != '':
			if "NULL" in weapons:
				weapons.remove("NULL")
				if len(weapons) != 0:
					queryset = queryset.filter(Q(weapon__in=weapons) | Q(weapon__isnull=True))
				else:	
					queryset = queryset.filter(weapon__isnull=True)
			else:
				queryset = queryset.filter(weapon__in=weapons)

		
		if start_lat != "" and end_lat != "":
			s_lat = float(start_lat)
			e_lat = float(end_lat)
		if start_long != "" and end_long != "":
			s_long = float(start_long)
			e_long = float(end_long)

			
		if s_lat != -1.0 and e_lat != -1.0:
			queryset = queryset.filter(latitude__range=[s_lat, e_lat])
		if s_long != -1.0 and e_long != -1.0:
			queryset = queryset.filter(longitude__range=[s_long, e_long])
			
		if i_o != "":
			i_o = i_o.upper()
			if i_o == "IO" or i_o == "OI" or i_o == "BOTH":
				queryset = queryset.filter(inside_outside__in=["I", "O"])
			else:
				queryset = queryset.filter(inside_outside=i_o)
			
			
		#create the return json
		return_json = {'data': [], 'count': 0}
		for row in queryset:
			data = {}
			data['date'] = row.date
			data['time'] = row.time
			data['day'] = row.day
			data['code'] = row.code
			data['description'] = row.description
			data['district'] = row.district
			data['weapon'] = row.weapon
			data['address'] = row.address
			data['neightborhood'] = row.neighborhood
			data['premise'] = row.premise
			data['inside_outside'] = row.inside_outside
			data['latitude'] = row.latitude
			data['longitude'] = row.longitude
			return_json['data'].append(data)
		return_json['count'] = queryset.count()
		return http.JsonResponse(return_json)
		
		