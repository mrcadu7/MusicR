from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('api.urls')), # TODO: ACABAR COM ESSE APP API, POIS O PLAYLIST JA FAZ O PAPEL
    path('', include('frontend.urls')),
    path('spotify/', include('spotify.urls')),
    path('playlists/', include('playlists.urls')),
]
