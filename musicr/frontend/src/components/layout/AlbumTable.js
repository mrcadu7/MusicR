import React from 'react';
import styles from './AlbumTable.module.css';
import SubmitButtonMusic from '../forms/SubmitButtonMusic';
import StarRateReading from './StarRateReading';



function AlbumTable({ album, playlists, handlePlaylistSelect }) {

    const formatDuration = (durationInSeconds) => {
        // Arredondar para o inteiro mais próximo
        const totalSeconds = Math.round(durationInSeconds);

        // Calcular minutos e segundos
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Formatar os minutos e segundos com dois dígitos
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // Retornar a duração formatada
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <table className={styles['album-table']}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Rate</th>
                    <th>Duration</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {album.tracks.map((track, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{track.name}</td>
                            <td><StarRateReading value={track.average_rating} /></td>
                            <td>{formatDuration(track.duration)}</td>
                            <td>
                                <SubmitButtonMusic track={track} playlists={playlists} onSelect={handlePlaylistSelect} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AlbumTable;
