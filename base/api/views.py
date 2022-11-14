from urllib import response
from base.api import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import classroom,message
from .serializers import RoomSerializer,MessageSerializer

@api_view(['GET','POST'])
def getRoutes(request):
    routes=[
        'GET /api',
        'GET /api/rooms',
        'GET /api/rooms/:id',
        'GET /api/messages'
        'POST /api/room'
    ]
    return Response(routes)
@api_view(['POST'])


@api_view(['GET'])
def getrooms(request):
    rooms=classroom.objects.all()
    serializer = RoomSerializer(rooms,many=True)
    return Response(serializer.data)    

@api_view(['GET'])
def getroomid(request,pk):
    room=classroom.objects.get(id=pk)
    serializer = RoomSerializer(room,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getmessage(request):
    msg=message.objects.all()
    msgserl = MessageSerializer(msg,many=True)
    return Response(msgserl.data)           
