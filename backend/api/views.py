import datetime
import re
import string
import time

from django import http
from django.core import serializers as django_serializers
from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.views import APIView

from . import models, serializers


class ListCrimes(generics.ListCreateAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.CrimeSerializer


class DetailCrime(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Crimedata.objects.all()
    serializer_class = serializers.CrimeSerializer
	
	
class CrimeCodeLookup(APIView):
	serializer_class = serializers.CrimeSerializer
	
	def get_queryset(self):
		queryset = models.Crimedata.objects.all()
		return queryset
		
	def get(self, request):
		queryset = self.get_queryset()
	
		#create the return json
		return_json = {'data': []}
		return_data = {}
		for row in queryset:
			description = row.description
			code = row.code
			weapon = row.weapon
			if code not in return_data:
				return_data[code] = [code, description, weapon]
		for key in return_data:
			if return_data[key][2] != None:
				weapon = ' ' + return_data[key][2]
			return_json['data'].append({'label':[return_data[key][1], weapon] , 
				'value': return_data[key][0]})
			
		return http.JsonResponse(return_json)
		
		
class AddVisualization(APIView):
	serializer_class = serializers.VisualizationSerializer
	
	def get_queryset(self):
		queryset = models.Localvisualization.objects.all()
		return queryset
	
	def get(self, request, name='', type='', field=''):
		new_visual = models.Localvisualization()
		
		new_visual.name = name
		new_visual.type = type
		new_visual.field = field
		new_visual.visible = 1
		new_visual.use_global = 1
		new_visual.fk_user = models.Users(pk=1)
		
		new_visual.save()
		
		return_json = {'visual_id': new_visual.pk}
		return http.JsonResponse(return_json)

		
class HideVisualization(APIView):
	serializer_class = serializers.VisualizationSerializer
	
	def get_queryset(self):
		queryset = models.Localvisualization.objects.all()
		return queryset
	
	def get(self, request, id=''):
		return_json = {}
		if id != '':
			id = int(id)
			visual = models.Localvisualization.objects.get(pk=id)
			visual.visible = 0
			date = datetime.date.today()
			date = datetime.date(date.year, date.month, date.day)
			visual.date_hidden = date
			visual.save()
			return_json['success'] = 1
		return http.JsonResponse(return_json)
		
		
class RestoreVisualization(APIView):
	serializer_class = serializers.VisualizationSerializer
	
	def get_queryset(self):
		queryset = models.Localvisualization.objects.all()
		return queryset
		
	def get(self, request, id=''):
		return_json = {}
		if id != '':
			id = int(id)
			visual = models.Localvisualization.objects.get(pk=id)
			visual.visible = 1
			visual.date_hidden = None
			visual.save()
			return_json['success'] = 1
		return http.JsonResponse(return_json)
	

class GetRestorableVisualizations(APIView):
	serializer_class = serializers.VisualizationSerializer
	
	def get_queryset(self):
		queryset = models.Localvisualization.objects.all()
		return queryset
		
	def get(self, request):
		return_json = {'day': [], 'week': [], 'month': []}
		already_added = []
		date = datetime.date.today()
		queryset = models.Localvisualization.objects.all().filter(date_hidden__range=[date - datetime.timedelta(days=1), date]).order_by('date_hidden')
		for row in queryset:
			days = None
			codes = None
			weapons = None
			districts = None
			if row.day != None:
				days = row.day.split(',')
				days = days[:-1]
			if row.code != None:
				codes = row.code.split(',')
				codes = codes[:-1]
			if row.weapon != None:
				weapons = row.weapon.split(',')
				weapons = weapons[:-1]
			if row.district != None:
				districts = row.district.split(',')
				districts = districts[:-1]
			return_json['day'].append({'id': row.pk, 'name': row.name, 'type': row.type, 'field': row.field, 'use_global': row.use_global,'start_date': row.start_date, 'end_date': row.end_date, 'start_time': row.start_time, 'end_time': row.end_time, 'days': days, 'codes': codes, 'i_o': row.inside_outside, 'weapons': weapons, 'districts': districts, 'start_lat': row.start_lat, 'start_lon': row.start_lon})
			already_added.append(row.pk)
			
		queryset = models.Localvisualization.objects.all().filter(date_hidden__range=[date - datetime.timedelta(days=7), date]).order_by('date_hidden')
		for row in queryset:
			if row.pk not in already_added:
				days = None
				codes = None
				weapons = None
				districts = None
				if row.day != None:
					days = row.day.split(',')
					days = days[:-1]
				if row.code != None:
					codes = row.code.split(',')
					codes = codes[:-1]
				if row.weapon != None:
					weapons = row.weapon.split(',')
					weapons = weapons[:-1]
				if row.district != None:
					districts = row.district.split(',')
					districts = districts[:-1]
				return_json['week'].append({'id': row.pk, 'name': row.name, 'type': row.type, 'field': row.field, 'use_global': row.use_global, 'start_date': row.start_date, 'end_date': row.end_date, 'start_time': row.start_time, 'end_time': row.end_time, 'days': days, 'codes': codes, 'i_o': row.inside_outside, 'weapons': weapons, 'districts': districts, 'start_lat': row.start_lat, 'start_lon': row.start_lon})
				already_added.append(row.pk)
			
		queryset = models.Localvisualization.objects.all().filter(date_hidden__range=[date - datetime.timedelta(days=30), date]).order_by('date_hidden')
		for row in queryset:
			if row.pk not in already_added:
				days = None
				codes = None
				weapons = None
				districts = None
				if row.day != None:
					days = row.day.split(',')
					days = days[:-1]
				if row.code != None:
					codes = row.code.split(',')
					codes = codes[:-1]
				if row.weapon != None:
					weapons = row.weapon.split(',')
					weapons = weapons[:-1]
				if row.district != None:
					districts = row.district.split(',')
					districts = districts[:-1]
				return_json['month'].append({'id': row.pk, 'name': row.name, 'type': row.type, 'field': row.field, 'use_global': row.use_global, 'start_date': row.start_date, 'end_date': row.end_date, 'start_time': row.start_time, 'end_time': row.end_time, 'days': days, 'codes': codes, 'i_o': row.inside_outside, 'weapons': weapons, 'districts': districts, 'start_lat': row.start_lat, 'start_lon': row.start_lon})
				already_added.append(row.pk)
			
		#print(date - datetime.timedelta(days=1))
		return http.JsonResponse(return_json)
	
	
class GetCurrentVisualizations(APIView):
	serializer_class = serializers.VisualizationSerializer
	
	def get_queryset(self):
		queryset = models.Localvisualization.objects.all()
		return queryset
		
	def get(self, request):
		return_json = {'data': []}
		queryset = models.Localvisualization.objects.all().filter(visible=1)
		for row in queryset:
			return_json['data'].append({'id': row.pk, 'name': row.name, 'type': row.type, 'field': row.field, 'use_global': row.use_global})
			
		#print(date - datetime.timedelta(days=1))
		return http.JsonResponse(return_json)
		

class SetLocalFilter(APIView):
	serializer_class = serializers.VisualizationSerializer
	
	def get_queryset(self):
		queryset = models.Localvisualization.objects.all()
		return queryset
		
	def get(self, request, id='', start_date='', end_date='', start_time='',
		end_time='', days='[]', codes='[]', districts='[]', weapons='[]',
		start_lat=0.0, end_lat=0.0, start_long=0.0, end_long=0.0, i_o='[]'):	
		return_json = {}
		if id != '':
			id = int(id)
			visual = models.Localvisualization.objects.get(pk=id)
			visual.use_global = 0
			days_words = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	
			#put codes in a list for easy filtering
			codes = codes.replace('[', '')
			codes = codes.replace(']', '')
			codes = re.split(',\s*', codes)
			for i in range(len(codes)):
				codes[i] = codes[i].upper()
			
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
			if days[0] != '' and days[0].upper() != 'ALL':
				for i in range(len(days)):
					days[i] = int(days[i])
					days[i] = days_words[days[i]]

			i_o = i_o.replace('[', '')
			i_o = i_o.replace(']', '')
			i_o = re.split(',\s*', i_o)
			
			s_lat = -1.0
			e_lat = -1.0
			s_long = -1.0
			e_long = -1.0
				
			#if start times and end times are empty, set them to default values
			if start_time == '':
				start_time = '00:00:00'
			if end_time == '':
				end_time = '23:59:59'
				
			visual.start_time = start_time
			visual.end_time = end_time
				
			queryset = self.get_queryset()
			#filter based on provided start_date / end_date and start time/end time
			if start_date == '' and end_date != '':
				visual.end_date = end_date
			elif end_date == '':
				visual.start_date = start_date
			else:
				visual.start_date = start_date
				visual.end_date = end_date
			
				
			#filter on list of i_o of the week
			if days[0] != '' and days[0].upper() != 'ALL':
				day_string = ''
				for day in days:
					day_string = day_string + day + ','
				visual.day = day_string
				
			#filter on list of crime codes
			if codes[0] != '':
				code_string = ''
				for code in codes:
					code_string = code_string + code + ','
				visual.code = code_string
				
			#filter on list of districts
			if districts[0] != '':
				district_string = ''
				for district in districts:
					district_string = district_string + district + ','
				visual.district = district_string
				
			if weapons[0] != '':
				weapon_string = ''
				for weapon in weapons:
					weapon_string = weapon_string + weapon + ','
				visual.weapon = weapon_string

			
			if start_lat != '' and end_lat != '':
				s_lat = float(start_lat)
				e_lat = float(end_lat)
			if start_long != '' and end_long != '':
				s_long = float(start_long)
				e_long = float(end_long)

				
			if s_lat != -1.0 and e_lat != -1.0:
				visual.start_lat = s_lat
				visual.end_lat = e_lat
			if s_long != -1.0 and e_long != -1.0:
				visual.start_lon = s_long
				visual.end_lon = e_long
				
			if i_o[0] != '':
				i_o[0] = i_o[0].upper()
				visual.inside_outside = i_o[0]
				
			visual.save()
			return_json['success'] = 1
		return http.JsonResponse(return_json)
		
	
class GlobalFilterStructured(APIView):
	serializer_class = serializers.CrimeSerializer
	
	def get_queryset(self):
		queryset = models.Crimedata.objects.all()
		return queryset

	def get(self, request, start_date='', end_date='', start_time='', end_time='',
		days='[]', codes='[]', districts='[]', weapons='[]', start_lat=0.0,
		end_lat=0.0, start_long=0.0, end_long=0.0, i_o='[]'):
		
		new_filter = models.Globalfilters(pk=1)
		
		days_words = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	
		#put codes in a list for easy filtering
		codes = codes.replace('[', '')
		codes = codes.replace(']', '')
		codes = re.split(',\s*', codes)
		for i in range(len(codes)):
			codes[i] = codes[i].upper()
		
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
		if days[0] != '' and days[0].upper() != 'ALL':
			for i in range(len(days)):
				days[i] = int(days[i])
				days[i] = days_words[days[i]]

		i_o = i_o.replace('[', '')
		i_o = i_o.replace(']', '')
		i_o = re.split(',\s*', i_o)
		#print(i_o)
		
		s_lat = -1.0
		e_lat = -1.0
		s_long = -1.0
		e_long = -1.0
			
		#if start times and end times are empty, set them to default values
		if start_time == '':
			start_time = '00:00:00'
		if end_time == '':
			end_time = '23:59:59'
			
		new_filter.start_time = start_time
		new_filter.end_time = end_time
			
		start_t = time.strptime(start_time, '%H:%M:%S')
		end_t = time.strptime(end_time, '%H:%M:%S')
		print(start_t)
		print(end_t)
	
		
		queryset = self.get_queryset()
		#filter based on provided start_date / end_date and start time/end time
		if start_date == '' and end_date == '':
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(time__range=[start_time, end_time]).order_by('date')
		elif start_date == '':
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(date__lte=end_date).filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(date__lte=end_date, time__range=[start_time,
					end_time]).order_by('date')
			new_filter.end_date = end_date
		elif end_date == '':
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(date__gte=start_date).filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(date__gte=start_date, time__range=[start_time,
					end_time]).order_by('date')
			new_filter.start_date = start_date
		else:
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(date__range=[start_date, end_date]).filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(date__range=[start_date, end_date],
					time__range=[start_time, end_time]).order_by('date')
			new_filter.start_date = start_date
			new_filter.end_date = end_date
		
		print(new_filter.start_date)
		print(new_filter.end_date)
			
		#filter on list of i_o of the week
		if days[0] != '' and days[0].upper() != 'ALL':
			queryset = queryset.filter(day__in=days)
			day_string = ''
			for day in days:
				day_string = day_string + day + ','
			new_filter.day = day_string
			
		#filter on list of crime codes
		if codes[0] != '':
			queryset = queryset.filter(description__in=codes)
			code_string = ''
			for code in codes:
				code_string = code_string + code + ','
			new_filter.code = code_string
			
		#filter on list of districts
		if districts[0] != '':
			queryset = queryset.filter(district__in=districts)
			district_string = ''
			for district in districts:
				district_string = district_string + district + ','
			new_filter.district = district_string
			
		if weapons[0] != '':
			weapon_string = ''
			for weapon in weapons:
				weapon_string = weapon_string + weapon + ','
			new_filter.weapon = weapon_string
			if 'NULL' in weapons:
				weapons.remove('NULL')
				if len(weapons) != 0:
					queryset = queryset.filter(Q(weapon__in=weapons) | Q(weapon__isnull=True))
				else:	
					queryset = queryset.filter(weapon__isnull=True)
			else:
				queryset = queryset.filter(weapon__in=weapons)

		
		if start_lat != '' and end_lat != '':
			s_lat = float(start_lat)
			e_lat = float(end_lat)
		if start_long != '' and end_long != '':
			s_long = float(start_long)
			e_long = float(end_long)

			
		if s_lat != -1.0 and e_lat != -1.0:
			queryset = queryset.filter(latitude__range=[s_lat, e_lat])
			new_filter.start_lat = s_lat
			new_filter.end_lat = e_lat
		if s_long != -1.0 and e_long != -1.0:
			queryset = queryset.filter(longitude__range=[s_long, e_long])
			new_filter.start_lon = s_long
			new_filter.end_lon = e_long
			
		if i_o[0] != '':
			i_o[0] = i_o[0].upper()
			if i_o[0] == 'BOTH':
				queryset = queryset.filter(inside_outside__in=['I', 'O'])
			else:
				queryset = queryset.filter(inside_outside=i_o[0])
			new_filter.inside_outside = i_o[0]
			
		new_filter.save()
			
		#create the return json
		return_json = {'labels': [], 'values': []}
		if queryset.count() != 0:
			start_d = datetime.datetime.combine(queryset[0].date, datetime.time())
			end_d = datetime.datetime.combine(queryset[queryset.count() - 1].date,
				datetime.time())
			for n in range( ( end_d - start_d ).days + 1 ):
				return_json['labels'].append( (start_d + 
					datetime.timedelta(n)).strftime('%m/%d/%Y'))
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

	def get(self, request, start_date='', end_date='', start_time='', end_time='',
		days='[]', codes='[]', districts='[]', weapons='[]', start_lat=0.0,
		end_lat=0.0, start_long=0.0, end_long=0.0, i_o='[]'):
		
		new_filter = models.Globalfilters(pk=1)
		
		days_words = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	
		#put codes in a list for easy filtering
		print(codes)
		codes = codes.replace('[', '')
		codes = codes.replace(']', '')
		codes = re.split(',\s*', codes)
		for i in range(len(codes)):
			codes[i] = codes[i].upper()
		print(codes)
		
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
		if days[0] != '' and days[0].upper() != 'ALL':
			for i in range(len(days)):
				days[i] = int(days[i])
				days[i] = days_words[days[i]]

		i_o = i_o.replace('[', '')
		i_o = i_o.replace(']', '')
		i_o = re.split(',\s*', i_o)
		#print(i_o)
		
		s_lat = -1.0
		e_lat = -1.0
		s_long = -1.0
		e_long = -1.0
			
		#if start times and end times are empty, set them to default values
		if start_time == '':
			start_time = '00:00:00'
		if end_time == '':
			end_time = '23:59:59'
			
		new_filter.start_time = start_time
		new_filter.end_time = end_time
		
		start_t = time.strptime(start_time, '%H:%M:%S')
		end_t = time.strptime(end_time, '%H:%M:%S')
		print(start_t)
		print(end_t)
			
		queryset = self.get_queryset()
		#filter based on provided start_date / end_date and start time/end time
		if start_date == '' and end_date == '':
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(time__range=[start_time, end_time]).order_by('date')
		elif start_date == '':
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(date__lte=end_date).filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(date__lte=end_date, time__range=[start_time,
					end_time]).order_by('date')
			new_filter.end_date = end_date
		elif end_date == '':
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(date__gte=start_date).filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(date__gte=start_date, time__range=[start_time,
					end_time]).order_by('date')
			new_filter.start_date = start_date
		else:
			if start_t > end_t:
				print("hello world")
				queryset = queryset.filter(date__range=[start_date, end_date]).filter(Q(time__range=[start_time, "00:00:00"]) | Q(time__range=["00:00:00", end_time])).order_by('date')
			else:
				queryset = queryset.filter(date__range=[start_date, end_date],
					time__range=[start_time, end_time]).order_by('date')
			new_filter.start_date = start_date
			new_filter.end_date = end_date
		
		print(new_filter.start_date)
		print(new_filter.end_date)
			
		#filter on list of i_o of the week
		if days[0] != '' and days[0].upper() != 'ALL':
			queryset = queryset.filter(day__in=days)
			day_string = ''
			for day in days:
				day_string = day_string + day + ','
			new_filter.day = day_string
			
		#filter on list of crime codes
		if codes[0] != '':
			queryset = queryset.filter(description__in=codes)
			code_string = ''
			for code in codes:
				code_string = code_string + code + ','
			new_filter.code = code_string
			
		#filter on list of districts
		if districts[0] != '':
			queryset = queryset.filter(district__in=districts)
			district_string = ''
			for district in districts:
				district_string = district_string + district + ','
			new_filter.district = district_string
			
		if weapons[0] != '':
			weapon_string = ''
			for weapon in weapons:
				weapon_string = weapon_string + weapon + ','
			new_filter.weapon = weapon_string
			if 'NULL' in weapons:
				weapons.remove('NULL')
				if len(weapons) != 0:
					queryset = queryset.filter(Q(weapon__in=weapons) | Q(weapon__isnull=True))
				else:	
					queryset = queryset.filter(weapon__isnull=True)
			else:
				queryset = queryset.filter(weapon__in=weapons)

		
		if start_lat != '' and end_lat != '':
			s_lat = float(start_lat)
			e_lat = float(end_lat)
		if start_long != '' and end_long != '':
			s_long = float(start_long)
			e_long = float(end_long)

			
		if s_lat != -1.0 and e_lat != -1.0:
			queryset = queryset.filter(latitude__range=[s_lat, e_lat])
			new_filter.start_lat = s_lat
			new_filter.end_lat = e_lat
		if s_long != -1.0 and e_long != -1.0:
			queryset = queryset.filter(longitude__range=[s_long, e_long])
			new_filter.start_lon = s_long
			new_filter.end_lon = e_long
			
		if i_o[0] != '':
			i_o[0] = i_o[0].upper()
			if i_o[0] == 'BOTH':
				queryset = queryset.filter(inside_outside__in=['I', 'O'])
			else:
				queryset = queryset.filter(inside_outside=i_o[0])
			new_filter.inside_outside = i_o[0]
			
		new_filter.save()
			
			
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
			data['neighborhood'] = row.neighborhood
			data['premise'] = row.premise
			data['inside_outside'] = row.inside_outside
			data['latitude'] = row.latitude
			data['longitude'] = row.longitude
			return_json['data'].append(data)
		return_json['count'] = queryset.count()
		return http.JsonResponse(return_json)
