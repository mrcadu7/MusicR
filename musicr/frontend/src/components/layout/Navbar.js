import { Link } from 'react-router-dom';
import Container from './Container';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <Container>
                <div className="d-flex align-items-center">
                    <a className={`navbar-brand ${styles.name}`} href="#">MusicR</a>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className={`navbar-nav ${styles.list}`}>
                        <li className={`nav-item ${styles.item}`}>
                            <Link className="nav-link" to="/">Opt1</Link>
                        </li>
                        <li className={`nav-item ${styles.item}`}>
                            <Link className="nav-link" to="/">Opt2</Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    );
}

export default Navbar;
