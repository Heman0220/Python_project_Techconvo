from dataclasses import fields
from pyexpat import model
from django.forms import ModelForm
from .models import classroom,User
from django.forms import ModelForm


class room_form(ModelForm):

    class Meta:
        model= classroom
        fields= '__all__'
        exclude = ['host','participants']


class user_form(ModelForm):

    class Meta:
        model=User
        fields=['username','email']