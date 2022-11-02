from dataclasses import fields
from http.client import IM_USED
from rest_framework.serializers import ModelSerializer
from base.models import classroom,message


class RoomSerializer(ModelSerializer):
      class Meta:
          model=classroom
          fields='__all__'

class MessageSerializer(ModelSerializer):

      class Meta:
          model=message
          fields='__all__'
          