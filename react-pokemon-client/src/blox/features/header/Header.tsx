// src/blox/features/header/Header.tsx
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useClerk, UserButton } from '@clerk/clerk-react';
import Button from '@mui/material/Button';


export function Header() {
    const { isSignedIn, openSignIn } = useClerk();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>CardMastr</div>
            <Link to="/">Welcome</Link>
            {isSignedIn && (
                <nav className={styles.links}>
                    <Link to="/pokelib">Pokemon Library</Link>
                    <Link to="/mydecks">Manage Decks</Link>
                    <Link to="/admin">Admin</Link>
                </nav>
            )}
            <div className={styles.userButton}>
                {!isSignedIn ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => openSignIn()}
                    >
                        Sign In
                    </Button>
                ) : (
                    <UserButton />
                )}
            </div>
        </header>
    );
}