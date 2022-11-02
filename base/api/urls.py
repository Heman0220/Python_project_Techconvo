from django.urls import path
from .import views


urlpatterns=[

    path('',views.getRoutes),
    path('rooms/',views.getrooms),
    path('rooms/<str:pk>/',views.getroomid),
    path('messages',views.getmessage),
]