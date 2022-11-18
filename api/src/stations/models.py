from django.db import models


class CompatibleStationLink(models.Model):
    """
    Database model for linking compatible Stations
    """
    source = models.ForeignKey(
        "stations.Station", on_delete=models.CASCADE, related_name="+"
    )
    target = models.ForeignKey(
        "stations.Station", on_delete=models.CASCADE, related_name="+"
    )

    def __str__(self):
        return f"{self.source.name} <-> {self.target.name}"


class Station(models.Model):
    """
    Station database model
    """
    beneCode = models.CharField(max_length=255)
    name = models.CharField(max_length=255) 
    compatible_stations = models.ManyToManyField(
        "self", through=CompatibleStationLink, blank=True
    )
    
    def __str__(self):
        return self.name


class BookingEntry(models.Model):
    from_station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name="from_point_a", blank=True, null=True)
    to_station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name="to_point_b", blank=True, null=True)
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()
    number_of_transfers = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=25, decimal_places=2)