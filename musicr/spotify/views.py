from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from decouple import config

SPOTIPY_CLIENT_ID = config('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = config('SPOTIPY_CLIENT_SECRET')

spotify_client_credentials_manager = SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET)


class SearchArtists(APIView):
    def get(self, request, artist_name):
        spotify = spotipy.Spotify(client_credentials_manager=spotify_client_credentials_manager)
        limit = 15
        results = spotify.search(q='artist:' + artist_name, type='artist', limit=limit)
        artists = []
        if results['artists']['items']:
            for artist in results['artists']['items']:
                artist_info = {
                    "name": artist['name'],
                    "id": artist['id']  # GOAT
                }
                artists.append(artist_info)
        return Response(artists)


class GetArtistInfo(APIView):
    def get(self, request, artist_id):
        spotify = spotipy.Spotify(client_credentials_manager=spotify_client_credentials_manager)

        # Fazer a pesquisa pelo artista usando o ID do artista
        artist = spotify.artist(artist_id)

        if artist:
            artist_info = {
                "name": artist['name'],
                "id": artist['id'],
                "image_url": artist['images'][0]['url'] if artist['images'] else None,
                "albums": [],
            }

            albums = spotify.artist_albums(artist_id, album_type='album', limit=50)

            for album in albums['items']:
                album_info = {
                    "name": album['name'],
                    "artist_id": artist['id'],
                    "album_id": album['id'],
                    "release_date": parse_release_date(album['release_date']),
                    "image_url": album['images'][0]['url'] if album['images'] else None,
                    "tracks": [],
                }

                tracks = spotify.album_tracks(album['id'])

                for track in tracks['items']:
                    duration = track['duration_ms']
                    track_info = {
                        "name": track['name'],
                        "artist_id": artist['id'],
                        "album_id": album['id'],
                        "track_id": track['id'],
                        "duration": duration,
                        "release_date": parse_release_date(album['release_date']),
                        "album_name": album['name'],  
                        "artist_name": artist['name'],
                    }
                    album_info["tracks"].append(track_info)

                artist_info["albums"].append(album_info)

            return Response(artist_info)
        
        return Response({"error": "Artista não encontrado"}, status=status.HTTP_404_NOT_FOUND)
  
    
def parse_release_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    
    except ValueError:
        try:
            return datetime.strptime(date_str, "%Y").date()
        
        except ValueError:

            return None
        
