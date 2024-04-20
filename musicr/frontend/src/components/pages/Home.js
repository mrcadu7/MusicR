import { useState } from 'react';
import SearchArtistForm from "../forms/SearchArtistForm";
import Main from "../content/Main";


function Home () {
    const [artistInfo, setArtistInfo] = useState(null);

    const handleArtistInfo = (info) => {
        setArtistInfo(info);
    };

    return (
        <div>
            <SearchArtistForm onSubmit={handleArtistInfo} />
            {artistInfo && <Main artistInfo={artistInfo} />}
        </div>
    );
}
    
export default Home;