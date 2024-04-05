from django.urls import path
from .views import *

urlpatterns = [
    path('create/', PlaylistListCreate.as_view(), name='playlist_list_create'),  # Endpoint para listar e criar playlists
    path('<int:pk>/', PlaylistRetrieveUpdateDestroy.as_view(), name='playlist_retrieve_update_destroy'),  # Endpoint para recuperar, atualizar e deletar uma playlist específica
    path('add-song/<int:playlist_id>/', AddSongToPlaylistView.as_view(), name='add_song_to_playlist'),  # Endpoint para adicionar uma música a uma playlist
    path('view/<int:playlist_id>/', ViewPlaylist.as_view(), name='view_playlist'),  # Endpoint para visualizar uma playlist específica
    path('view/all/', ListAllPlaylists.as_view(), name='list_all_playlists'),  # Endpoint para listar todas as playlists
]
