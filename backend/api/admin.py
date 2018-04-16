from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Crimedata
from .models import Globalfilters

admin.site.register(Crimedata)
admin.site.register(Globalfilters)