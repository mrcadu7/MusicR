from django.contrib import admin
from .models import Artist, Album, Song, Playlists, Addition

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'artist_id')
    search_fields = ('name',)

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'release_date')
    list_filter = ('artist',)
    search_fields = ('title', 'artist__name')

class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'album', 'duration')
    list_filter = ('artist', 'album')
    search_fields = ('title', 'artist__name', 'album__title')

class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at', 'updated_at')
    list_filter = ('user',)
    search_fields = ('title', 'user__username')

class AdditionAdmin(admin.ModelAdmin):
    list_display = ('song', 'playlist', 'created_at')
    list_filter = ('playlist',)
    search_fields = ('song__title', 'playlist__title')

admin.site.register(Artist, ArtistAdmin)
admin.site.register(Album, AlbumAdmin)
admin.site.register(Song, SongAdmin)
admin.site.register(Playlists, PlaylistAdmin)
admin.site.register(Addition, AdditionAdmin)