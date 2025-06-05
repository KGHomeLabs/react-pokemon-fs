
import { PokemonProvider } from './SpaPages/Context/PokemonContext';
import MyDeckPage from './SpaPages/PokeLibPage';

const App = () => (
  <PokemonProvider useApi={true}>
    <MyDeckPage />
  </PokemonProvider>
);

export default App;
