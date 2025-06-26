//import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>CardMastr</div>
            <nav className={styles.links}>
                <Link to="/">Welcome</Link>
                <Link to="/pokelib">Pokemon Library</Link>
                <Link to="/mydecks">Manage Decks</Link>
                <Link to="/admin">Admin</Link>
            </nav>

        </header>
    );
}