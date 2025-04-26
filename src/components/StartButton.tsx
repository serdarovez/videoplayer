import React from 'react';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="start-button"
      onClick={onClick}
      aria-label="Start video player"
    >
      START
    </button>
  );
};

export default StartButton;