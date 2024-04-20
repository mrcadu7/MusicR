import { useState, useEffect } from 'react';
import styles from './artistheader.module.css'; // Importando os estilos CSS

function ArtistHeader({ artist }) {
    const [scrollOpacity, setScrollOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const opacity = 1 - (scrollPosition / 500); // Ajustando o valor a partir do qual a foto desaparece completamente
            setScrollOpacity(opacity < 0 ? 0 : opacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles["artist-header"]}>
            <div className={styles["artist-info"]}>
                {/* Aplicando o estilo à imagem */}
                <img className={styles["artist-image"]} src={artist.image_url || 'https://via.placeholder.com/150'} alt={artist.name || 'Artist'} style={{ opacity: scrollOpacity }}/>
                <h3>{artist.name || 'Nome artista'}</h3>
                <h5>{artist.genres.map(genre => genre.toUpperCase()).join(', ')}</h5>
            </div>
        </div>
    );
}

export default ArtistHeader;
