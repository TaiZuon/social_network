from rest_framework import serializers
from .models import Channel, Messeeji, UserMess
from userprofiles.models import UserProfile, ImageProfile
from rest_framework_mongoengine.serializers import DocumentSerializer

class ChannelSerializer(DocumentSerializer):
    class Meta:
        model = Channel
        fields = '__all__'

class MesseejiSerializer(DocumentSerializer):
    class Meta:
        model = Messeeji
        fields = '__all__'
        
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageProfile
        fields = '__all__'
