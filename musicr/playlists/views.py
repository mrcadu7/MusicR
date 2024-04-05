from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Playlists, Addition
from .serializers import PlaylistSerializer, AdditionSerializer

class PlaylistListCreate(generics.ListCreateAPIView):
    queryset = Playlists.objects.all()
    serializer_class = PlaylistSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PlaylistRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Playlists.objects.all()
    serializer_class = PlaylistSerializer

class AddSongToPlaylistView(APIView):
    def post(self, request, playlist_id):
        playlist = get_object_or_404(Playlists, pk=playlist_id)
        
        # Verifica se a solicitação POST contém dados
        if request.data:
            # Se houver dados na solicitação, tenta serializá-los e adicioná-los à playlist
            serializer = AdditionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(playlist=playlist)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Se não houver dados na solicitação, retorna uma resposta indicando que nenhum dado foi fornecido
            return Response({"error": "Nenhum dado fornecido na solicitação"}, status=status.HTTP_400_BAD_REQUEST)


class ViewPlaylist(APIView):
    def get(self, request, playlist_id):
        playlist = get_object_or_404(Playlists, pk=playlist_id)
        serializer = PlaylistSerializer(playlist)
        return Response(serializer.data)


class ListAllPlaylists(APIView):
    def get(self, request):
        # Obtém todas as playlists do banco de dados
        playlists = Playlists.objects.all()
        
        # Serializa as playlists
        serializer = PlaylistSerializer(playlists, many=True)
        
        # Retorna a resposta com a lista de playlists
        return Response(serializer.data)