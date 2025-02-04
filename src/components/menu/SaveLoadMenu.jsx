import { useState, useEffect } from 'react';
import { useSave } from '../../contexts/SaveContext';
import { useGameUI } from '../../contexts/GameUIContext';
import { useGameState } from '../../contexts/GameStateContext';
import '../../styles/SaveLoadMenu.css';

export default function SaveLoadMenu({ onClose }) {
  const [saves, setSaves] = useState([]);
  const [saveName, setSaveName] = useState('');
  const [message, setMessage] = useState('');
  
  const { saveGame, loadSaves, loadGame, deleteSave } = useSave();
  const { isLoading, showError, startLoading, stopLoading } = useGameUI();
  const { gameState } = useGameState();

  useEffect(() => {
    fetchSaves();
  }, []);

  const fetchSaves = async () => {
    startLoading();
    const result = await loadSaves();
    if (result.success) {
      setSaves(result.saves);
    } else {
      showError(result.error);
    }
    stopLoading();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!saveName.trim()) {
      showError('Please enter a save name');
      return;
    }

    const result = await saveGame(saveName, gameState);
    if (result.success) {
      setSaveName('');
      setMessage('Game saved successfully!');
      await fetchSaves();
    } else {
      showError(result.error);
    }
  };

  const handleLoad = async (saveId) => {
    startLoading();
    const result = await loadGame(saveId);
    if (result.success) {
      setMessage('Game loaded successfully!');
      setTimeout(() => {
        onClose();
      }, 500); //small delay to show success message
    } else {
      showError(result.error);
    }
    stopLoading();
  };

  const handleDelete = async (saveId) => {
    if (window.confirm('Are you sure you want to delete this save?')) {
      const result = await deleteSave(saveId);
      if (result.success) {
        await fetchSaves();
        setMessage('Save deleted successfully');
      } else {
        showError(result.error);
      }
    }
  };

  return (
    <div className="save-load-overlay">
      <div className="save-load-container">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="save-section">
          <h3>Save Game</h3>
          <form onSubmit={handleSave} className="save-input">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter save name"
              autoFocus
            />
            <button type="submit">Save</button>
          </form>
        </div>

        <div className="load-section">
          <h3>Load Game</h3>
          {isLoading ? (
            <div>Loading saves...</div>
          ) : saves.length > 0 ? (
            <div className="saves-list">
              {saves.map(save => (
                <div key={save.id} className="save-item">
                  <div>
                    <div className="save-name">{save.saveName}</div>
                    <div className="save-timestamp">{new Date(save.timestamp).toLocaleString()}</div>
                  </div>
                  <button onClick={() => handleLoad(save.id)}>Load</button>
                  <button onClick={() => handleDelete(save.id)} className='delete-button'>Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <div>No saves found</div>
          )}
        </div>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}