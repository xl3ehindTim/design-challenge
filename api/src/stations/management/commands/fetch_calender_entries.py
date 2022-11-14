from django.core.management.base import BaseCommand
from stations.models import Station, CalenderEntry
import requests


class Command(BaseCommand):
    help = "Fetch Calender Entries from API"

    def handle(self, *args, **options):
        stations = Station.objects.all()

        for from_station in stations:
            for to_station in stations:
                if to_station != from_station:
                    calender_entries = requests.get(f"https://www.nsinternational.com/api/v2/traveloffers/booking-calendar/{from_station.beneCode}/{to_station.beneCode}").json()

                    for entry in calender_entries.get("calendarEntries"):
                        if entry.get("status").get("code") == "BOOKABLE" and entry.get("firstTravelConnection") != None:
                            # Get data
                            date = entry.get("calendarDate")
                            departure_date = entry.get("firstTravelConnection").get("departureDate")
                            arrival_date = entry.get("firstTravelConnection").get("arrivalDate")

                            # Check if entry already exists in our database, if not add to the database
                            if CalenderEntry.objects.filter(date=date, departure_date=departure_date, arrival_date=arrival_date).exists() == False:
                                price = entry.get("price").get("lowest")
                                category = entry.get("price").get("category") # Train class

                                CalenderEntry.objects.create(
                                  from_station=from_station,
                                  to_station=to_station,
                                  date=date,
                                  price=price,
                                  category=category,
                                  departure_date=departure_date,
                                  arrival_date=arrival_date
                                )
