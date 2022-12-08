from .models import Order
from rest_framework import serializers
from rest_framework import viewsets


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

def register(restrouter):
    restrouter.register(r"orders", OrderViewSet)