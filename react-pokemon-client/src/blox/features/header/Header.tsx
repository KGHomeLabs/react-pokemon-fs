import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useClerk, UserButton } from '@clerk/clerk-react';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

export function Header() {
    const { isSignedIn, openSignIn } = useClerk();
    const location = useLocation();

    // Define navigation links
    const alwaysVisibleLinks = [{ path: '/', text: 'Welcome' }];
    const signedInLinks = [
        { path: '/pokelib', text: 'Pokemon Library' },
        { path: '/mydecks', text: 'Manage Decks' },
        { path: '/admin', text: 'Admin' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.logo}>CardMastr</div>
            <ButtonGroup variant="text" color="inherit" aria-label="navigation links" sx={{ gap: '10rem' }}>
                {alwaysVisibleLinks.map((link) => (
                    <Button
                        key={link.path}
                        component={Link}
                        to={link.path}
                        variant={location.pathname === link.path ? 'contained' : 'text'}
                        color={location.pathname === link.path ? 'primary' : 'inherit'}
                        sx={{ textTransform: 'none' }}
                    >
                        {link.text}
                    </Button>
                ))}
                {isSignedIn && signedInLinks.map((link) => (
                    <Button
                        key={link.path}
                        component={Link}
                        to={link.path}
                        variant={location.pathname === link.path ? 'contained' : 'text'}
                        color={location.pathname === link.path ? 'primary' : 'inherit'}
                        sx={{ textTransform: 'none' }}
                    >
                        {link.text}
                    </Button>
                ))}
            </ButtonGroup>
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