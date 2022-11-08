from django.core.management.base import BaseCommand
from stations.models import Station
import requests


class Command(BaseCommand):
    help = "Fetch Stations from API"

    def handle(self, *args, **options):
        stations = requests.get("https://www.nsinternational.com/api/v2/stations/").json()

        for station in stations:
            # Add to database if beneCode does not match
            if Station.objects.filter(beneCode=station.get("beneCode")).exists() == False and station.get("beneCode").startswith("NL") == False:
                Station.objects.create(
                    beneCode=station.get("beneCode"),
                    name=station.get("name"),
                )
                
        # Manually add NL international train stations
        """
        Almelo
        Amersfoort Centraal
        Amsterdam Centraal
        Apeldoorn
        Arnhem Centraal
        Breda
        Den Haag HS
        Deventer
        Hengelo
        Hilversum
        Rotterdam Centraal
        Schiphol Airport
        Utrecht Centraal
        """