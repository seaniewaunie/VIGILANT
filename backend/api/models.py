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
	total_incidents = IntegerFields()
	
class Visualization(models.Model):
	name = CharField(max_length=100)
	type = CharField(max_length=20)
	

class User(models.Model):
	username = models.CharField(max_length=200)
	password = models.CharField(max_length=200)
	
class Filter(models.Model):
