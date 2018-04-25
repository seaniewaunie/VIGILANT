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
        fields = ('crime_id', 'date', 'time', 'day', 'description', 'district', 'weapon', 'address', 'neighborhood', 'premise', 'inside_outside', 'latitude', 'longitude' )
        # TODO: add code to the list above

class GlobalFilterSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Globalfilters
		fields = ('global_filter_id', 'start_date', 'end_date', 'start_time', 'end_time', 'code', 'district', 'weapon', 'start_lat', 'end_lat', 'start_lon', 'end_lon')
		
class VisualizationSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Localvisualization
		fields = ('local_filter_id', 'fk_user', 'name', 'type', 'visible', 'date_hidden', 'start_date', 'end_date', 'start_time', 'end_time', 'day', 'code', 'inside_outside', 'weapon', 'district', 'start_lat', 'end_lat', 'start_lon', 'end_lon')
		
# ViewSets define the view behavior.
#class UserViewSet(viewsets.ModelViewSet):
#    queryset = User.objects.all()
#    serializer_class = UserSerializer
