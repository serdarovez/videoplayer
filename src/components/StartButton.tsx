import React from "react";

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <div className="start-button-container">
      <button
        className="start-button"
        onClick={onClick}
        aria-label="Start video player"
      >
        START
      </button>
    </div>
  );
};

export default StartButton;
