from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=100)
    artist_id = models.CharField(max_length=100, primary_key=True)
    
    def __str__(self):
        return self.name


class Album(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    album_id = models.CharField(max_length=100, primary_key=True)
    
    def __str__(self):
        return self.title


class Song(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    duration = models.DurationField()
    song_id = models.CharField(max_length=100, primary_key=True)
    
    def __str__(self):
        return self.title


class Playlists(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image_url = models.URLField(null=True, blank=True)
    songs = models.ManyToManyField(Song, through='Addition')
    
    def __str__(self):
        return self.title


class Addition(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlists, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "adição"
        verbose_name_plural = "adições"
        
    def __str__(self):
        return self.song.title