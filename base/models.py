from email.policy import default
from statistics import mode
from django.db import models
from django.forms import CharField
from matplotlib.pyplot import cla
from django.contrib.auth.models import User


# Create your models here.
# # we have passed only i for getting 50 char it was set up in models in homes -> feed

#cntr+/ - to comment all

class topics(models.Model):
    names = models.CharField(max_length=200,null=True)

    def __str__(self):
        return str(self.names)

class classroom(models.Model):
    topic=models.ForeignKey(topics,on_delete=models.SET_NULL,null=True)
    host=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name=models.CharField(max_length=100)
    description = models.TextField(null=True,blank=True)
    participants=models.ManyToManyField(User,related_name='participants',blank=True)
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class message(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    room=models.ForeignKey(classroom,on_delete=models.SET_NULL,null=True)
    body=models.TextField()
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]


    


    


