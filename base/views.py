import imp
from unicodedata import name
from django.shortcuts import render,redirect
from .models import classroom,message,topics
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from .models import message
from .forms import room_form,user_form
from django.db.models import Q
# Create your views here.
"""  
 if request.method=='GET':
        delete=message.objects.POST.get('body')
        delete.all()
        return redirect('room',pk=room.id) 
           <form method="GET" action="">
            {%csrf_token%}
            <input type="submit" name="body" value='Delete'/>
          </form><hr>
        """

def signup(request):
 
    if request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        print("after submit")
        first_name=request.POST['first_name']
        last_name=request.POST['last_name']
        username=request.POST['user_name']
        email=request.POST['mail']
        password=request.POST['password1']
        password2=request.POST['password2']
        if password==password2:     
            if User.objects.filter(username=username).exists():
                messages.error(request,"user name already exist")
                return redirect('signup')   
            elif User.objects.filter(email=email).exists():
                messages.error(request,"mail already taken") 
                return redirect('signup')      
            else:    
                user=User.objects.create_user(first_name=first_name,last_name=last_name,username=username,email=email,password=password)
                user.save();
                return redirect('loginpage')
        else:
            messages.error(request,"password is not matching") 
            return redirect('signup')       
    else:
      return render(request,'base/signup.html')


def loginpage(request):

    page='loginpage'
    context={'page':page}
    if request.user.is_authenticated:
        return redirect('/')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
          user =User.objects.get(username=username)
        except:
            messages.error(request,'user doesnt exits')

        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return redirect('/')
        else:
            messages.error(request,'incorrect password')
            return render(request,'base/login.html',context)   
    else:
        return render(request,'base/login.html',context)

def logoutpage(request):
    logout(request)
    return redirect('/')     

def edit_user(request):
    user=request.user
    form=user_form(instance=user)
    context={
      'form':form
    }
    if request.method == 'POST':
        form = user_form(request.POST,instance=user)
        if form.is_valid():
           form.save()
           return redirect('user_profile',pk=user.id)
    return render(request,'base/edit_user.html',context)    
     
                  
        
def home(request):
    S = request.GET.get('S')   if request.GET.get('S') != None else ''
    all_count=classroom.objects.all().count
    data=classroom.objects.filter(
        Q(topic__names__icontains=S) |
        Q(name__icontains=S) |
        Q(description__icontains=S)).order_by('-created')
    topic=topics.objects.all()
    room_count = data.count()
    feed=message.objects.filter(room__topic__names__icontains=S).order_by('-created')
    context={
        'data':data,
        'topic':topic,
        'room_count':room_count,
        'feed':feed,
        'all_count':all_count,
        }
    return render(request,'base/home.html',context)

@login_required(login_url='/loginpage')
def room(request,pk):
    room=classroom.objects.get(id=pk)
    room_message=room.message_set.all().order_by('-created')
    participant = room.participants.all() 
    if request.method == 'POST':
        message.objects.create(
            user=request.user,
            room=room,
            body=request.POST.get('converstation')
        )
        room.participants.add(request.user)
        return redirect('room',pk=room.id)   
    context={
        'room':room,
        'room_message':room_message,
        'participant':participant
    }             
    return render(request,'base/room.html',context) 

@login_required(login_url='/loginpage')
def create_form(request):
    room_topic=topics.objects.all()
    form=room_form()
    context={
        'form':form,
        'topic':room_topic
        }
    if request.method == 'POST':
        name = request.POST.get('name')
        topic_name = request.POST.get('topic')
        topic,created = topics.objects.get_or_create(names=topic_name)
        description = request.POST.get('description')
        form=classroom.objects.create(
            topic=topic,
            host=request.user,
            name=name,description=description)
        form.save()
        return redirect('/') 
    return render(request,'base/room_form.html',context)  

@login_required(login_url='/loginpage')
def user_profile(request,pk):
    usern=User.objects.get(id=pk)
    data=usern.classroom_set.all()
    topic=topics.objects.all()
    all_count=classroom.objects.all().count
    feed=usern.message_set.all().order_by('-created')
    context={
        'data':data,
        'topic':topic,
        'feed':feed,
        'all_count':all_count
        }
    return render(request,'base/user_profile.html',context)

@login_required(login_url='/loginpage')
def update_form(request,pk):
    room=classroom.objects.get(id=pk)
    form=room_form(instance=room)
    topic=topics.objects.all()
    context={
        'room':room,
        'topic':topic}
    if request.user != room.host:
        return redirect('/')
    
    if request.method == 'POST':
        topic_name = request.POST.get('topic')
        topice,created = topics.objects.get_or_create(names=topic_name)
        room.description = request.POST.get('description')
        room.name=request.POST.get('name')
        room.topic=topice
        room.save()
        return redirect('/')
    return render(request,'base/room_form.html',context)

@login_required(login_url='/loginpage')
def delete_form(request,pk):
    room=classroom.objects.get(id=pk)

    if request.user != room.host:
        return redirect('/')

    if request.method == 'POST':
       room.delete()
       return redirect('/')
    return render(request,'base/delete.html',{'deleteval':room}) 

@login_required(login_url='/loginpage')
def delete_message(request,pk):
    messagebody=message.objects.get(id=pk)
    print('id from message',id)
    if request.user != messagebody.user:
        return redirect('/')

    if request.method == 'POST':
       messagebody.delete()
       return redirect('/')
    return render(request,'base/delete.html',{'deleteval':messagebody})     


    


