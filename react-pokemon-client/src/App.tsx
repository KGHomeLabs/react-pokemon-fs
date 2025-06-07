

import MyDeckPage from './SpaPages/PokeLibPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonContextProvider } from './SpaPages/Context/IPokemonContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PokemonContextProvider>
      <MyDeckPage />
    </PokemonContextProvider>
  </QueryClientProvider>
);

export default App;
