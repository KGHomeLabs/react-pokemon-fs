
import { PokemonProvider } from './MyDeck/PokemonContext';
import MyDeckPage from './MyDeck/PokeLibPage';

const App = () => (
  <PokemonProvider useApi={true}>
    <MyDeckPage />
  </PokemonProvider>
);

export default App;
