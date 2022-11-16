from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework import viewsets, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.permissions import AllowAny


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "green_coins",
            "is_active",
            "is_superuser",
            "is_staff",
        )
        depth = 1


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    ordering_fields = "__all__"
    filterset_fields = ("id",)
    search_fields = ("email", "first_name", "last_name")

    @action(detail=False, methods=["get"])
    def get_current_user(self, request, *args, **kwargs):
        return Response(UserSerializer(request.user).data)

    @action(detail=True, methods=["get"])
    def get_user_points(self, request, *args, **kwargs):
        user = self.get_object()

        return HttpResponse(f"={user.green_coins}")

    def perform_create(self, serializer):
        data_password = self.request.data.get("password")
        data_confirm_password = self.request.data.get("confirm_password")

        if data_password and data_password != data_confirm_password:
            raise Exception("Passwords do not match")

        user = serializer.save()

        if data_password:
            user.set_password(data_password)
            user.save()

    def perform_update(self, serializer):
        data_password = self.request.data.get("password")
        data_confirm_password = self.request.data.get("confirm_password")

        if data_password and data_password != data_confirm_password:
            raise Exception("Passwords do not match")

        user = serializer.save()

        if data_password:
            user.set_password(data_password)
            user.save()


# register viewsets for the rest-api
def register(restrouter):
    restrouter.register(r"users", UserViewSet)
