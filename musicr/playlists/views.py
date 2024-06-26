from django.forms import ValidationError
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 1000  # resolver isso em algum momento
    page_size_query_param = 'page_size'
    max_page_size = 1000


class PlaylistListCreate(generics.ListCreateAPIView):
    queryset = Playlists.objects.all()
    serializer_class = PlaylistSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)    

    def get(self, request, *args, **kwargs):
        return Response()

class PlaylistRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Playlists.objects.all()
    serializer_class = PlaylistSerializer

class AddSongToPlaylistView(APIView):
    def post(self, request, playlist_id):
        playlist = get_object_or_404(Playlists, pk=playlist_id)
        
        if request.data:
            serializer = AdditionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(playlist=playlist)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Nenhum dado fornecido na solicitação"}, status=status.HTTP_400_BAD_REQUEST)


class ViewPlaylist(APIView):
    def get(self, request, playlist_id):
        playlist = get_object_or_404(Playlists, pk=playlist_id)
        serializer = PlaylistSerializer(playlist)
        return Response(serializer.data)


class ListAllPlaylists(APIView):
    pagination_class = CustomPagination  # Adicionando paginação à visualização

    def get(self, request):
        playlists = Playlists.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(playlists, request)
        serializer = PlaylistSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    
#artistas
class ArtistListCreate(generics.ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)    

    def get(self, request, *args, **kwargs):
        return Response()


class ArtistRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ViewArtist(APIView):
    def get(self, request, artist_id):
        artist = get_object_or_404(Artist, artist_id=artist_id)
        serializer = ArtistSerializer(artist)
        return Response(serializer.data)
    

class ListAllArtists(APIView):
    pagination_class = CustomPagination  # Adicionando paginação à visualização

    def get(self, request):
        artists = Artist.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(artists, request)
        serializer = ArtistSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ArtistExists(APIView):
    def get(self, request, artist_id):
        exists = Artist.objects.filter(artist_id=artist_id).exists()
        return Response({'exists': exists})

  
#albums
class AlbumListCreate(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)    

    def get(self, request, *args, **kwargs):
        return Response()


class AlbumRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    

class ViewAlbum(APIView):
    def get(self, request, album_id):
        album = get_object_or_404(Album, album_id=album_id)
        serializer = AlbumSerializer(album)
        return Response(serializer.data)


class ListAllAlbums(APIView):
    pagination_class = CustomPagination

    def get(self, request):
        albums = Album.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(albums, request)
        serializer = AlbumSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class AlbumExists(APIView):
    def get(self, request, album_id):
        exists = Album.objects.filter(album_id=album_id).exists()
        return Response({'exists': exists})

    
#musicas
class SongListCreate(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)    

    def get(self, request, *args, **kwargs):
        return Response()


class SongRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class ViewSong(APIView):
    def get(self, request, song_id):
        song = get_object_or_404(Song, song_id=song_id)
        serializer = SongSerializer(song)
        return Response(serializer.data)
  
    
class ListAllSongs(APIView):
    pagination_class = CustomPagination

    def get(self, request):
        songs = Song.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(songs, request)
        serializer = SongSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    

class SongExists(APIView):
    def get(self, request, song_id):
        exists = Song.objects.filter(song_id=song_id).exists()
        return Response({'exists': exists})
    

# reviews de songs
class SongReviewListCreate(generics.ListCreateAPIView):
    queryset = SongReview.objects.all()
    serializer_class = SongReviewSerializer

    def perform_create(self, serializer):
        user = self.request.user
        song = serializer.validated_data['song']

        existing_review = SongReview.objects.filter(user=user, song=song).exists()
        if existing_review:
            raise ValidationError("O usuário já deixou uma revisão para esta música.")

        serializer.save(user=user)

class SongReviewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SongReviewSerializer

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        song_id = self.kwargs.get('song_id')
        
        try:
            review = SongReview.objects.get(user_id=user_id, song_id=song_id)
            return review
        except SongReview.DoesNotExist:
            raise NotFound("A revisão de música não foi encontrada para este usuário")
        

class ListAllSongReviews(APIView):
    pagination_class = CustomPagination  # Adicionando paginação à visualização

    def get(self, request):
        songs = SongReview.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(songs, request)
        serializer = SongReviewSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

       
class ListAllSongReviewsBySong(APIView):
    def get(self, request, song_id):
        song_reviews = SongReview.objects.filter(song_id=song_id)
        serializer = SongReviewSerializer(song_reviews, many=True)
        return Response(serializer.data)

class ListAllSongReviewsByUser(APIView):
    def get(self, request, user_id):
        song_reviews = SongReview.objects.filter(user_id=user_id)
        serializer = SongReviewSerializer(song_reviews, many=True)
        return Response(serializer.data)

    
class SongReviewExists(APIView):
    def get(self, request, user_id, song_id):
        # Verifica se existe uma revisão para a música pelo usuário
        song_review_exists = SongReview.objects.filter(user_id=user_id, song_id=song_id).exists()
        
        # Retorna um JSON indicando se a revisão existe ou não
        return Response({'exists': song_review_exists}, status=status.HTTP_200_OK)
    
    
# reviews de albuns
class AlbumReviewListCreate(generics.ListCreateAPIView):
    queryset = AlbumReview.objects.all()
    serializer_class = AlbumReviewSerializer

    def perform_create(self, serializer):
        user = self.request.user
        album = serializer.validated_data['album']
        existing_review = AlbumReview.objects.filter(user=user, album=album).exists()
        if existing_review:
            raise ValidationError("O usuário já deixou uma revisão para esta album.")

        serializer.save(user=user)

class AlbumReviewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AlbumReviewSerializer

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        album_id = self.kwargs.get('album_id')
        
        try:
            review = AlbumReview.objects.get(user_id=user_id, album_id=album_id)
            return review
        except AlbumReview.DoesNotExist:
            raise NotFound("A revisão de música não foi encontrada para este usuário")
        

class ListAllAlbumReviews(APIView):
    pagination_class = CustomPagination  # Adicionando paginação à visualização

    def get(self, request):
        albums = AlbumReview.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(albums, request)
        serializer = AlbumReviewSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

        
class ListAllAlbumReviewsByAlbum(APIView):
    def get(self, request, album_id):
        album_reviews = AlbumReview.objects.filter(album_id=album_id)
        serializer = AlbumReviewSerializer(album_reviews, many=True)
        return Response(serializer.data)


class ListAllAlbumReviewsByUser(APIView):
    def get(self, request, user_id):
        album_reviews = AlbumReview.objects.filter(user_id=user_id)
        serializer = AlbumReviewSerializer(album_reviews, many=True)
        return Response(serializer.data)

    
class AlbumReviewExists(APIView):
    def get(self, request, user_id, album_id):
        album_review_exists = AlbumReview.objects.filter(user_id=user_id, album_id=album_id).exists()

        return Response({'exists': album_review_exists}, status=status.HTTP_200_OK)