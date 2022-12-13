from django.db import models
from users.models import CustomUser
from stations.models import BookingEntry

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user_order")
    amount_of_tickets = models.PositiveIntegerField(default=1)
    travel_class = models.CharField(max_length=255)
    booking_option = models.ForeignKey(BookingEntry, on_delete=models.CASCADE, related_name="booking_order", blank=True, null=True)
    total_amount = models.DecimalField(max_digits=25, decimal_places=2)
    emission_saved = models.CharField(max_length=255, blank =True, null=True )

