from rest_framework import serializers
from .models import *

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ['id', 'user', 'title', 'description', 'created_at', 'updated_at', 'image_url', 'songs']


class AdditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addition
        fields = ['id', 'song', 'playlist', 'created_at', 'updated_at']


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['artist_id', 'name']
 
        
class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['album_id', 'artist', 'title', 'release_date']
  
        
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['song_id', 'artist', 'album', 'title', 'duration']