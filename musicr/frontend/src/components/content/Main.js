import ParentComponent from "./ParentComponent";
import ArtistHeader from "./ArtistHeader";

function Main ({ artistInfo }) {
        return (
            <div>
                <ArtistHeader artist={artistInfo}/>
                <ParentComponent albums={artistInfo.albums}/>
            </div>
        );
    }
    
export default Main