import { IoMdStarOutline, IoMdStar } from "react-icons/io";
import { GiUnlitBomb, GiStarsStack, GiStarFormation   } from "react-icons/gi";
import { RiVolumeMuteFill } from "react-icons/ri";
import Box from '@mui/material/Box';

import styles from './StarChange.module.css';

function StarChange ( { value } ) {
    let icon;

    if (value === null) {
        icon = <IoMdStarOutline className={styles.star_outline_icon} />; // Estrela oca
    } else if (value >= 4.5) {
        icon = <GiStarFormation className={styles.star_icon} />; // Excelente
    } else if (value >= 3.5) {
        icon = <GiStarsStack className={styles.star_icon} />; // Bom
    } else if (value >= 2.5) {
        icon = <IoMdStar className={styles.star_icon} />; // Regular
    } else if (value >= 1.5) {
        icon = <GiUnlitBomb className={styles.bomb_icon} />; // Ruim
    } else {
        icon = <RiVolumeMuteFill className={styles.music_off_icon} />; // Péssimo
    }

    return (
        <div className={styles.container}>
            <span>{icon} {value}</span>
            <br />
        </div>
    )
}


export default StarChange