//3rd party imports
import 'reflect-metadata'; //tsyringe (cool name btw): Import reflect-metadata for dependency injection support
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

//local imports
//Import the main App component and set up the dependency injection container
import App from './App.tsx'
import './di/di-container.ts'
import { getHookDIRegistry } from './di/di-container.ts';

// Import the DI registry to set up the dependency injection context
const HookDIRegistry = getHookDIRegistry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HookDIRegistry.Providers>
        <App />
      </HookDIRegistry.Providers>
    </BrowserRouter>
  </StrictMode>,
) 
