import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isSignedIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (!isSignedIn && location.pathname !== '/') {
        // Store the intended route and trigger sign-in
        navigate('/?redirect=' + encodeURIComponent(location.pathname));
        return null; // Prevent rendering until redirected
    }

    // Handle redirect after sign-in
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get('redirect');
    if (isSignedIn && redirectPath) {
        navigate(decodeURIComponent(redirectPath), { replace: true });
        return null; // Prevent rendering until navigation completes
    }

    return <>{children}</>;
}