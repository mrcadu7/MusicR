from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('playlist/', index),
    path('playlist/<int:playlist_id>/', index),
    path('playlist/create/', index),
]
