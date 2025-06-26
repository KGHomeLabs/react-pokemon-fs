import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import MyDeckPage from './Pages/PokeLibPage';
import 'react-toastify/dist/ReactToastify.css';
import { isDev } from '../config/env-switch';
import { PokemonContextProvider } from './blox/Context/IPokemonContext';

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
