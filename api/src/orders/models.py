from django.db import models
from users.models import CustomUser


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user_order")
    amount_of_tickets = models.IntegerField(default=1)
    travel_class = models.CharField(max_length=255)
    # booking_optie
    total_amount = models.DecimalField(max_digits=25, decimal_places=2)
    #emission saved

