from django.contrib import admin
from .models import Station, CompatibleStationLink, BookingEntry

admin.site.register(Station)
admin.site.register(CompatibleStationLink)
admin.site.register(BookingEntry)