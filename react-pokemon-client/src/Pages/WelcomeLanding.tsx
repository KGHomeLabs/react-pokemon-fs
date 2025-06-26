import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';

export default function WelcomeLanding() {
    return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h1>Welcome to CardMaster!</h1>
            <p>Your Pokémon card collection dashboard.</p>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <p>You're already signed in!</p>
            </SignedIn>
        </div>
    );
};