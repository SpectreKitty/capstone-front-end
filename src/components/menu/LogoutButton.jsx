import '../../styles/LogoutButton.css'
import { useAuth } from '../../contexts/AuthContext';
import { useGameState } from '../../contexts/GameStateContext';
import { useGameUI } from '../../contexts/GameUIContext';

export default function LogoutButton() {
  const { logout } = useAuth();  // Get logout from AuthContext
  const { resetGameState } = useGameState();  // Proper hook call
  const { showError } = useGameUI();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {  // If logout successful
        resetGameState();  // Reset game state
      } else {
        showError('Logout failed: ' + result.error);
        console.error('Logout failed:', result.error);
      }
    } catch (error) {
      showError('Logout failed: ' + error.message);
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      className='logout-button'
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}