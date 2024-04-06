import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={`footer ${styles.footer}`}>
            <div className="container">
                <ul className={`social_list ${styles.social_list}`}>
                    <li>
                        <a href="https://github.com/mrcadu7"><FaGithub /></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/mrcadu7/"><FaLinkedin /></a>
                    </li>
                </ul>
                <p className={`copy_right ${styles.copy_right}`}>
                    <span>MusicR</span> &copy; 2024
                </p>
            </div>
        </footer>
    );
}

export default Footer;