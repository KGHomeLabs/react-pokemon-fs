

import MyDeckPage from './SpaPages/PokeLibPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonContextProvider } from './SpaPages/Context/IPokemonContext';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isDev } from '../config/env-switch';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PokemonContextProvider>
      <MyDeckPage />
      <ToastContainer
        aria-label="toast notifications"
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </PokemonContextProvider>
    {/*/works best next to query provider as direct child */}
    {isDev() && <ReactQueryDevtools initialIsOpen={true} />}
  </QueryClientProvider>
);

export default App;
