//3rd party imports
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//local imports
import { isDev } from '../config/env-switch';
import { PokemonContextProvider } from './blox/Context/IPokemonContext';

//Pages
import TopLayout from './Pages/TopLayount';
import WelcomeLanding from './Pages/WelcomeLanding';
import PokeLibPage from './Pages/PokeLibPage';
import ManageDecks from './Pages/ManageDecks';
import Admin from './Pages/Admin';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PokemonContextProvider>
      <Routes>
        <Route path="/" element={<TopLayout />}>
          <Route index element={<WelcomeLanding />} /> {/* Default landing page */}
          <Route path="pokelib" element={<PokeLibPage />} />
          <Route path="mydecks" element={<ManageDecks />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
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
