import { useState, useEffect } from 'react';
import { useGameState } from '../../contexts/GameStateContext';
import '../../styles/SaveLoadMenu.css';

export default function SaveLoadMenu({ onClose }) {
  const { saveGame, loadSaves, loadGame } = useGameState();
  const [saveName, setSaveName] = useState('');
  const [saves, setSaves] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSaves();
  }, []);

  const fetchSaves = async () => {
    setIsLoading(true);
    const result = await loadSaves();
    if (result.success) {
      setSaves(result.saves);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!saveName.trim()) {
      setMessage('Please enter a save name');
      return;
    }

    const result = await saveGame(saveName);
    setMessage(result.message || result.error);
    if (result.success) {
      setSaveName('');
      fetchSaves();
    }
  };

  const handleLoad = async (saveId) => {
    const result = await loadGame(saveId);
    if (!result.success) {
      setMessage(result.error);
    } else {
      onClose();
    }
  };

  return (
    <div className="save-load-overlay">
      <div className="save-load-container">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="save-section">
          <h3>Save Game</h3>
          <div className="save-input">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter save name"
            />
            <button onClick={handleSave}>Save</button>
          </div>
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
                    <div className="save-date">
                      {new Date(save.timestamp.seconds * 1000).toLocaleString()}
                    </div>
                  </div>
                  <button onClick={() => handleLoad(save.id)}>Load</button>
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