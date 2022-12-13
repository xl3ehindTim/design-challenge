from django.contrib import admin
from .models import Station, BookingEntry, CompatibleStationLink

admin.site.register(Station)
admin.site.register(CompatibleStationLink)
admin.site.register(BookingEntry)