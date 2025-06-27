// src/blox/features/header/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useClerk, UserButton } from '@clerk/clerk-react';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

export function Header() {
    const { isSignedIn, openSignIn } = useClerk();
    const location = useLocation(); // Get the current route

    // Define routes and their corresponding link texts
    const navLinks = [
        { path: '/', text: 'Welcome' },
        { path: '/pokelib', text: 'Pokemon Library' },
        { path: '/mydecks', text: 'Manage Decks' },
        { path: '/admin', text: 'Admin' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.logo}>CardMastr</div>
            {isSignedIn && (
                <ButtonGroup variant="text" color="inherit" aria-label="navigation links" >
                    {navLinks.map((link) => (
                        <Button

                            key={link.path}
                            component={Link}
                            to={link.path}
                            // Highlight the active link
                            variant={location.pathname === link.path ? 'contained' : 'text'}
                            color={location.pathname === link.path ? 'primary' : 'inherit'}
                            className={styles.navButton}
                            style={{ textTransform: 'none' }} // Match Link's default text style
                        >
                            {link.text}
                        </Button>
                    ))}
                </ButtonGroup>
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