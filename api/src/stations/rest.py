from rest_framework import serializers
from rest_framework import viewsets
import datetime
from .models import Station, CalenderEntry


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = "__all__"


class CalenderEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CalenderEntry
        fields = "__all__"


class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    lookup_field = 'beneCode'
    search_fields = (
        "name",
    )


class CalenderEntryViewSet(viewsets.ModelViewSet):
    queryset = CalenderEntry.objects.all()
    serializer_class = CalenderEntrySerializer

    def get_queryset(self):
        # Filter for today/after today
        today = datetime.date.today()
        queryset = CalenderEntry.objects.filter(date__gte=today)

        # If route has been supplied filter
        param_route = self.request.GET.get("route")

        if param_route:
            route = param_route.split("-")
            
            # From-To
            queryset = queryset.filter(
                from_station__beneCode=route[0],
                to_station__beneCode=route[1],
            )

        return queryset


def register(restrouter):
    restrouter.register(r"stations", StationViewSet)
    restrouter.register(r"calender-entries", CalenderEntryViewSet)