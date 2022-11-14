from django.core.management.base import BaseCommand
from stations.models import Station, BookingEntry
import requests
import datetime


class Command(BaseCommand):
    help = "Fetch Booking Entries from API"

    def handle(self, *args, **options):
        stations = Station.objects.all()

        for from_station in stations:
            start_date = datetime.date.today()
            end_date = start_date + datetime.timedelta(days=30)

            for to_station in stations:
                if to_station != from_station:
                    while start_date != end_date:
                        booking_entries = requests.get(f"https://www.nsinternational.com/api/v2/traveloffers/booking-calendar/{from_station.beneCode}/{to_station.beneCode}/{str(start_date).replace('-', '')}").json()

                        for entry in booking_entries:
                            if entry.get("latestLowestPrice") != None:
                                departure_date = entry.get("departureDate")
                                arrival_date = entry.get("arrivalDate")

                                if BookingEntry.objects.filter(departure_date=departure_date, arrival_date=arrival_date).exists() == False:
                                    BookingEntry.objects.create(
                                      from_station=from_station,
                                      to_station=to_station,
                                      departure_date=departure_date,
                                      arrival_date=arrival_date,
                                      number_of_transfers=entry.get("numberOfTransfers"),
                                      price=entry.get("latestLowestPrice"),
                                    )

                        start_date = start_date + datetime.timedelta(days=1)