from django.db import models


# Station database model
class Station(models.Model):
    beneCode = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class BookingEntry(models.Model):
    from_station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name="from_point_a", blank=True, null=True)
    to_station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name="to_point_b", blank=True, null=True)
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()
    number_of_transfers = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=25, decimal_places=2)