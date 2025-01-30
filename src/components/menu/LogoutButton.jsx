import { useGameState } from '../../contexts/GameStateContext';
import '../../styles/LogoutButton.css'

export default function LogoutButton() {
  const { logout } = useGameState();

  const handleLogout = async () => {
    const result = await logout();
    if (!result.success) {
      console.error('Logout failed:', result.error);
    }
  };

  return (
    <button
      className='logout-button'
      onClick={handleLogout}>
        Logout
      </button>
  );
}