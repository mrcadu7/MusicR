# Generated by Django 4.2.11 on 2024-04-05 18:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Addition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'adição',
                'verbose_name_plural': 'adições',
            },
        ),
        migrations.CreateModel(
            name='Album',
            fields=[
                ('title', models.CharField(max_length=100)),
                ('release_date', models.DateField()),
                ('album_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('artist_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('title', models.CharField(max_length=100)),
                ('duration', models.DurationField()),
                ('song_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlists.album')),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlists.artist')),
            ],
        ),
        migrations.CreateModel(
            name='Playlists',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('description', models.CharField(blank=True, max_length=512)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('image_url', models.URLField(blank=True, null=True)),
                ('songs', models.ManyToManyField(through='playlists.Addition', to='playlists.song')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='artist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlists.artist'),
        ),
        migrations.AddField(
            model_name='addition',
            name='playlist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlists.playlists'),
        ),
        migrations.AddField(
            model_name='addition',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlists.song'),
        ),
    ]
