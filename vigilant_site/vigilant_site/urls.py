from django.conf.urls import include, url
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.SimpleRouter()
router.register(r'users', UserViewSet)



# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    
    # Examples:
    # url(r'^$', 'vigilant_site.views.home', name='home'),
    # url(r'^vigilant_site/', include('vigilant_site.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls'), namespace ='rest_framework'), # url can be anything you want
    router.urls
]
