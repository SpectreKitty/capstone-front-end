import '../../styles/Choices.css';

const Choices = ({ choices, onChoice }) => {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="choices-container">
      <div className="choices-wrapper">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoice(choice)}
            className="choice-button"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Choices;