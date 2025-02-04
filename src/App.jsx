import { GameProviders } from './components/providers/GameProviders';
import GameLayout from "./components/utilities/GameLayout";
import GameContent from './components/common/GameContent';

function App() {
  return (
    <GameProviders>
      <GameLayout>
        <GameContent />
      </GameLayout>
    </GameProviders>
  );
}

export default App;