from django.urls import path
from .views import *

urlpatterns = [
    # Endpoints para playlists
    path('playlists/create/', PlaylistListCreate.as_view(), name='playlist_list_create'),  # Listar e criar playlists
    path('playlists/view/all/', ListAllPlaylists.as_view(), name='list_all_playlists'),  # Listar todas as playlists
    path('playlists/update/<int:pk>/', PlaylistRetrieveUpdateDestroy.as_view(), name='playlist_retrieve_update_destroy'),  # Recuperar, atualizar e deletar uma playlist específica
    path('playlists/add-song/<int:playlist_id>/', AddSongToPlaylistView.as_view(), name='add_song_to_playlist'),  # Adicionar uma música a uma playlist
    path('playlists/view/<int:playlist_id>/', ViewPlaylist.as_view(), name='view_playlist'),  # Visualizar uma playlist específica

    # Endpoints para artistas
    path('artists/create/', ArtistListCreate.as_view(), name='artist_list_create'),  # Listar e criar artistas
    path('artists/view/all/', ListAllArtists.as_view(), name='list_all_artists'),  # Listar todos os artistas
    path('artists/update/<str:pk>/', ArtistRetrieveUpdateDestroy.as_view(), name='artist_retrieve_update_destroy'),  # Recuperar, atualizar e deletar um artista específico
    path('artists/view/<str:artist_id>/', ViewArtist.as_view(), name='view_artist'),  # Visualizar um artista específico

    # Endpoints para álbuns
    path('albums/create/', AlbumListCreate.as_view(), name='album_list_create'),  # Listar e criar álbuns
    path('albums/view/all/', ListAllAlbums.as_view(), name='list_all_albums'),  # Listar todos os álbuns
    path('albums/update/<str:pk>/', AlbumRetrieveUpdateDestroy.as_view(), name='album_retrieve_update_destroy'),  # Recuperar, atualizar e deletar um álbum específico
    path('albums/view/<str:album_id>/', ViewAlbum.as_view(), name='view_album'),  # Visualizar um álbum específico

    # Endpoints para músicas
    path('songs/create/', SongListCreate.as_view(), name='song_list_create'),  # Listar e criar músicas
    path('songs/view/all/', ListAllSongs.as_view(), name='list_all_songs'),  # Listar todas as músicas
    path('songs/update/<str:pk>/', SongRetrieveUpdateDestroy.as_view(), name='song_retrieve_update_destroy'),  # Recuperar, atualizar e deletar uma música específica
    path('songs/view/<str:song_id>/', ViewSong.as_view(), name='view_song'),  # Visualizar uma música específica
]