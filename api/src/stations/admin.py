from django.contrib import admin
from .models import Station, CalenderEntry, BookingEntry

admin.site.register(Station)
admin.site.register(CalenderEntry)
admin.site.register(BookingEntry)