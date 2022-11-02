from django.urls import URLPattern, path
from . import views


"""pk is automatically generating numbers"""
urlpatterns = [
    path('',views.home,name='home'),
    path('signup',views.signup,name='signup'),  
    path('loginpage',views.loginpage,name='loginpage'),
    path('logoutpage',views.logoutpage,name='logoutpage'),   
    path('edit_user',views.edit_user,name='edit_user'),


    path('room/<str:pk>',views.room,name='room'),  
    path('create_form',views.create_form,name='create_form'),
    path('user_profile/<str:pk>',views.user_profile,name='user_profile'),

    path('update_form/<str:pk>',views.update_form,name='update_form'), 
    path('delete_form/<str:pk>',views.delete_form,name='delete_form'), 
    path('delete_message/<str:pk>',views.delete_message,name='delete_message'),     
]