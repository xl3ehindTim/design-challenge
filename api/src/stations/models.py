from django.db import models


class Station(models.Model):
    beneCode = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name