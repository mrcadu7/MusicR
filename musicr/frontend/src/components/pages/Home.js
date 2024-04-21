import { useState } from 'react';
import SearchArtistForm from "../forms/SearchArtistForm";
import Main from "../content/Main";
import styles from "./Home.module.css";


function Home () {
    const [artistInfo, setArtistInfo] = useState(null);

    const handleArtistInfo = (info) => {
        setArtistInfo(info);
    };

    return (
        <div className={styles.container_form}>
            <SearchArtistForm onSubmit={handleArtistInfo} />
            {artistInfo && <Main artistInfo={artistInfo} />}
        </div>
    );
}
    
export default Home;