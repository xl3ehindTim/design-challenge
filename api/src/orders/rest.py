from .models import Order
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from stations.models import BookingEntry


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(methods=['get'], detail=False)
    def book(self, request):
        """
        @param booking_option
        @param amount_of_tickets
        @param travel_class
        """
        user = self.request.user
        
        booking_option_param = self.request.GET.get("booking_option")
        amount_of_tickets_param = self.request.GET.get("amount_of_tickets")
        travel_class_param = self.request.GET.get("travel_class")

        if not user:
            return Response({
                'status': 'error',
                'message': 'Not authenticated',
            })

        if not booking_option_param:
            return Response({
                'status': 'error',
                'message': 'No booking_option param supplied',
            })

        booking_option = BookingEntry.objects.get(pk=booking_option_param)
        
        if not booking_option:
            return Response({"status": "error"})

        order = Order.objects.create(
            user=user,
            booking_option=booking_option,
            travel_class="Eerste klasse",
            amount_of_tickets=amount_of_tickets_param,
            total_amount=100, # amount_of_tickets_param * booking_option.price
        )

        serializer = self.get_serializer(order, many=False)
        
        return Response(serializer.data)
        

def register(restrouter):
    restrouter.register(r"orders", OrderViewSet)