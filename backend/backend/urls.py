"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls import url

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

urlpatterns = [
    #url(r'^auth$', drf_views.obtain_auth_token, name='auth'),
	path('admin/', admin.site.urls),
	path('api/', include('api.urls')),
]

# Routers provide an easy way of automatically determining the URL conf.
#router = routers.DefaultRouter()
#router.register(r'users', UserViewSet)


#urlpatterns = [
#    url(r'^admin/', admin.site.urls),
#    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
#    path('router/', include(router.urls)),
#    url(r'^', TemplateView.as_view(template_name="index.html")),
    #path('', include('api.urls')),
#]
