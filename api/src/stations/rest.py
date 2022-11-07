from rest_framework import serializers
from rest_framework import viewsets

from .models import Station


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = "__all__"


class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer

    search_fields = (
        "name",
    )


def register(restrouter):
    restrouter.register(r"stations", StationViewSet)