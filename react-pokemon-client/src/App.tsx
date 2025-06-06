

import MyDeckPage from './SpaPages/PokeLibPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MyDeckPage />
  </QueryClientProvider>
);

export default App;
