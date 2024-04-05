from django.urls import path
from .views import *

urlpatterns = [
    path('search-artists/<str:artist_name>/', SearchArtists.as_view(), name='search_artists'),
    path('get-artist-info/<str:artist_id>/', GetArtistInfo.as_view(), name='get_artist_info'),
]
