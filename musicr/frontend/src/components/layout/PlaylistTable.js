import { useState } from 'react';
import styles from './PlaylistTable.module.css';

function formatAddedAt(addedAt) {
    const date = new Date(addedAt);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} de ${month}. de ${year}`;
}

function PlaylistTable({ playlist, formatDuration }) {
    const [sortByTitle, setSortByTitle] = useState(null);
    const [sortByArtist, setSortByArtist] = useState(null);
    const [sortByAlbum, setSortByAlbum] = useState(null);
    const [sortByAddedAt, setSortByAddedAt] = useState('asc');
    const [sortByDuration, setSortByDuration] = useState(null);

    const handleSortByTitle = () => {
        setSortByTitle(sortByTitle === 'asc' ? 'desc' : 'asc');
        setSortByArtist(null);
        setSortByAlbum(null);
        setSortByAddedAt(null);
        setSortByDuration(null);
    };

    const handleSortByArtist = () => {
        setSortByArtist(sortByArtist === 'asc' ? 'desc' : 'asc');
        setSortByTitle(null);
        setSortByAlbum(null);
        setSortByAddedAt(null);
        setSortByDuration(null);
    };

    const handleSortByAlbum = () => {
        setSortByAlbum(sortByAlbum === 'asc' ? 'desc' : 'asc');
        setSortByTitle(null);
        setSortByArtist(null);
        setSortByAddedAt(null);
        setSortByDuration(null);
    };

    const handleSortByAddedAt = () => {
        setSortByAddedAt(sortByAddedAt === 'asc' ? 'desc' : 'asc');
        setSortByTitle(null);
        setSortByArtist(null);
        setSortByAlbum(null);
        setSortByDuration(null);
    };

    const handleSortByDuration = () => {
        setSortByDuration(sortByDuration === 'asc' ? 'desc' : 'asc');
        setSortByTitle(null);
        setSortByArtist(null);
        setSortByAlbum(null);
        setSortByAddedAt(null);
    };

    const renderSortArrow = (sortType) => {
        if (sortType === 'asc') {
            return '↑';
        } else if (sortType === 'desc') {
            return '↓';
        } else {
            return '';
        }
    };

    const parseDuration = (durationString) => {
        const [hours, minutes, seconds] = durationString.split(':');
        const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds);
        return totalSeconds;
    };


    const sortedPlaylist = [...playlist.song_details].sort((a, b) => {
        const durationA = parseDuration(a.song.duration);
        const durationB = parseDuration(b.song.duration);


        if (sortByTitle === 'asc') {
            return a.song.title.localeCompare(b.song.title);
        } else if (sortByTitle === 'desc') {
            return b.song.title.localeCompare(a.song.title);
        } else if (sortByArtist === 'asc') {
            return a.artist.localeCompare(b.artist);
        } else if (sortByArtist === 'desc') {
            return b.artist.localeCompare(a.artist);
        } else if (sortByAlbum === 'asc') {
            return a.album.localeCompare(b.album);
        } else if (sortByAlbum === 'desc') {
            return b.album.localeCompare(a.album);
        } else if (sortByAddedAt === 'asc') {
            return new Date(a.added_at) - new Date(b.added_at);
        } else if (sortByAddedAt === 'desc') {
            return new Date(b.added_at) - new Date(a.added_at);
        } else if (sortByDuration === 'asc') {
            return durationA - durationB;
        } else if (sortByDuration === 'desc') {
            return durationB - durationA;
        }
        // Aqui você pode adicionar mais condições para outras colunas, se necessário
        return 0; // Se nenhum critério de ordenação for aplicado, mantenha a ordem original
    });


    return (
        <table className={styles['playlist-table']}>
            <thead>
                <tr>
                    <th>#</th>
                    <th onClick={handleSortByTitle}>Title {renderSortArrow(sortByTitle)}</th>
                    <th onClick={handleSortByArtist}>Artist {renderSortArrow(sortByArtist)}</th>
                    <th onClick={handleSortByAlbum}>Album {renderSortArrow(sortByAlbum)}</th>
                    <th onClick={handleSortByAddedAt}>Added at {renderSortArrow(sortByAddedAt)}</th>
                    <th onClick={handleSortByDuration}>Duration {renderSortArrow(sortByDuration)}</th>
                </tr>
            </thead>
            <tbody>
                {sortedPlaylist.map((songDetail, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{songDetail.song.title}</td>
                        <td>{songDetail.artist}</td>
                        <td>{songDetail.album}</td>
                        <td>{formatAddedAt(songDetail.added_at)}</td>
                        <td>{formatDuration(songDetail.song.duration)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PlaylistTable;