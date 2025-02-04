import { useAuth } from '../../contexts/AuthContext';
import Login from '../menu/Login';
import SceneRouter from '../utilities/SceneRouter';

export default function GameContent() {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? <Login /> : <SceneRouter />;
}
