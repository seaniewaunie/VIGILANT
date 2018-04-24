# Register your models here.
from django.contrib import admin

from .models import Crimedata, Globalfilters

admin.site.register(Crimedata)
admin.site.register(Globalfilters)
