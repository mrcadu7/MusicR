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
    path('artists/exists/<str:artist_id>/', ArtistExists.as_view(), name='artist_exists'), # Verificar se um artista existe no BD

    # Endpoints para álbuns
    path('albums/create/', AlbumListCreate.as_view(), name='album_list_create'),  # Listar e criar álbuns
    path('albums/view/all/', ListAllAlbums.as_view(), name='list_all_albums'),  # Listar todos os álbuns
    path('albums/update/<str:pk>/', AlbumRetrieveUpdateDestroy.as_view(), name='album_retrieve_update_destroy'),  # Recuperar, atualizar e deletar um álbum específico
    path('albums/view/<str:album_id>/', ViewAlbum.as_view(), name='view_album'),  # Visualizar um álbum específico
    path('albums/exists/<str:album_id>/', AlbumExists.as_view(), name='album_exists'), # Verificar se um album existe no BD

    # Endpoints para músicas
    path('songs/create/', SongListCreate.as_view(), name='song_list_create'),  # Listar e criar músicas
    path('songs/view/all/', ListAllSongs.as_view(), name='list_all_songs'),  # Listar todas as músicas
    path('songs/update/<str:pk>/', SongRetrieveUpdateDestroy.as_view(), name='song_retrieve_update_destroy'),  # Recuperar, atualizar e deletar uma música específica
    path('songs/view/<str:song_id>/', ViewSong.as_view(), name='view_song'),  # Visualizar uma música específica
    path('songs/exists/<str:song_id>/', SongExists.as_view(), name='song_exists'), # Verificar se uma música existe no BD
    
    # Endpoints para song reviews
    path('song-reviews/', SongReviewListCreate.as_view(), name='song_review_list_create'),  # Listar e criar avaliações de músicas
    path('song-reviews/update/<int:pk>/', SongReviewRetrieveUpdateDestroy.as_view(), name='song_review_retrieve_update_destroy'),  # Recuperar, atualizar e deletar uma avaliação de música específica
    path('song-reviews/by-song/<str:song_id>/', ListSongReviewsBySong.as_view(), name='list_song_reviews_by_song'),  # Listar avaliações de músicas por música específica
    path('song-reviews/by-user/<int:user_id>/', ListSongReviewsByUser.as_view(), name='list_song_reviews_by_user'),  # Listar avaliações de músicas por usuário específico
]
