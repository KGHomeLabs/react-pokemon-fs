//3rd party imports
import 'reflect-metadata'; //tsyringe (cool name btw): Import reflect-metadata for dependency injection support
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';

//local imports
//Import the main App component and set up the dependency injection container
import App from './App.tsx'
import './di/di-container.ts'
import { getHookDIRegistry } from './di/di-container.ts';

// Import the DI registry to set up the dependency injection context
const HookDIRegistry = getHookDIRegistry();
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log('Publishable Key in main.tsx:', publishableKey);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/" signInFallbackRedirectUrl="/pokelib">
        <HookDIRegistry.Providers>
          <App />
        </HookDIRegistry.Providers>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
) 
