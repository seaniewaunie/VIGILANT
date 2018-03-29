from django.db import models

# Create your models here.
class CrimeEntry(models.Model):
	date = DateField()
	time = TimeField()
	crime_code = CharField(max_length=5)
	location = CharField(max_length=50)
	description = CharField(max_length = 30)
	inside_outside = BooleanField()
	weapon = CharField(max_length=10)
	post = IntegerField()
	district = CharField(max_length=15)
	neighborhood = CharField(max_length=50)
	latitude = FloatField()
	longitude = FloatField()
	premise = CharField(max_length=20)
	total_incidents = IntegerField()
	
class Visualization(models.Model):
	name = CharField(max_length=100)
	type = CharField(max_length=20)
	#the ID of this visualization 
	visualization_id = IntegerField()
	#the user that this visualization is associated with 
	user_id = IntegerField()
	

class User(models.Model):
	username = models.CharField(max_length=200)
	password = models.CharField(max_length=200)
	#the ID of this user
	user_id = IntegerField()
	
class Filter(models.Model):
	# the visualization that this filter is associated with 
	visualization_id = IntegerField()
	start_date = DateField()
	end_date = DateField()
	start_time = TimeField()
	end_time = TimeField()
	descriptions = = ListCharField(base_field=CharField(max_length=30), size = 50, max_length = (50*31))
	inside_outside = BooleanField()
	weapons = ListCharField(base_field=CharField(max_length=10), size = 4, max_length = (4*11))
	districts = ListCharField(base_field=CharField(max_length=15), size = 10, max_length = (10*16))
	start_latitude = FloatField()
	end_latitude = FloatField()
	start_longitude = FloatField()
	end_longitude = FloatField()
	
