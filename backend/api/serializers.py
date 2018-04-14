from rest_framework import serializers
from . import models

# Serializers define the API representation.
#class UserSerializer(serializers.HyperlinkedModelSerializer):
#    class Meta:
#        model = User
#        fields = ('url', 'username', 'email', 'is_staff')
		
class CrimeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Crimedata
        fields = ('crime_id', 'date', 'time', 'day', 'code', 'description', 'district', 'weapon', 'address', 'neighborhood', 'premise', 'inside_outside', 'latitude', 'longitude' )

# ViewSets define the view behavior.
#class UserViewSet(viewsets.ModelViewSet):
#    queryset = User.objects.all()
#    serializer_class = UserSerializer