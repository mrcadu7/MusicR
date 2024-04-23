from rest_framework import serializers
from .models import *
from django.db.models import Avg

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
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Song
        fields = ['song_id', 'artist', 'album', 'title', 'duration', 'average_rating']
        
    def get_average_rating(self, obj):
        # Calcula a média das avaliações para a música
        average_rating = SongReview.objects.filter(song=obj).aggregate(Avg('rating'))['rating__avg']
        return average_rating
        
        
class PlaylistSongSerializer(serializers.ModelSerializer):
    song = SongSerializer()
    artist = serializers.SerializerMethodField()
    album = serializers.SerializerMethodField()

    class Meta:
        model = Addition
        fields = ['song', 'artist', 'album', 'created_at']

    def get_artist(self, obj):
        return obj.song.artist.name if obj.song.artist else None

    def get_album(self, obj):
        return obj.song.album.title if obj.song.album else None
        
        
class PlaylistSerializer(serializers.ModelSerializer):
    song_details = PlaylistSongSerializer(source='addition_set', many=True, read_only=True)

    class Meta:
        model = Playlists
        fields = ['id', 'user', 'title', 'description', 'created_at', 'updated_at', 'image_url', 'song_details']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for song_detail in representation['song_details']:
            song_detail['added_at'] = song_detail['created_at']
            del song_detail['created_at']
        return representation
    

class SongReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SongReview
        fields = '__all__'
        

class AlbumReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumReview
        fields = '__all__'
        

class ArtistReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistReview
        fields = '__all__'