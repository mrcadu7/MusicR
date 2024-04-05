from rest_framework import serializers
from .models import Playlists, Addition

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ['id', 'user', 'title', 'description', 'created_at', 'updated_at', 'image_url', 'songs']

class AdditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addition
        fields = ['id', 'song', 'playlist', 'created_at', 'updated_at']
