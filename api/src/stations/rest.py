from rest_framework import serializers
from rest_framework import viewsets
import datetime
from .models import Station, BookingEntry


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = "__all__"


class BookingEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingEntry
        fields = "__all__"


class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    lookup_field = 'beneCode'
    search_fields = (
        "name",
    )


class BookingEntryViewSet(viewsets.ModelViewSet):
    queryset = BookingEntry.objects.all()
    serializer_class = BookingEntrySerializer

    def get_queryset(self):
        # Filter for today/after today
        queryset = BookingEntry.objects.all() # filter(departure__day=)

        # If route has been supplied filter
        param_route = self.request.GET.get("route")

        if param_route:
            route = param_route.split("-")
            
            # From-To
            queryset = queryset.filter(
                from_station__beneCode=route[0],
                to_station__beneCode=route[1],
            )

        # If date has been given filter departure_date on this specific date
        param_date = self.request.GET.get("date")

        if param_date:
            queryset = queryset.filter(departure_date__date=param_date)

        return queryset.order_by('departure_date__hour', 'departure_date__minute')


def register(restrouter):
    # Register routes to the API
    restrouter.register(r"stations", StationViewSet)
    restrouter.register(r"booking-entries", BookingEntryViewSet)