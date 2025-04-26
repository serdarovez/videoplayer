import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useVideoContext } from "../context/VideoProvider";
import { videoUrls } from "../utils/videoUrls";

const PlayerPage: React.FC = () => {
  const { videoElements } = useVideoContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videoUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length);
  };

  if (videoElements.length === 0) {
    return <div>Loading videos...</div>; // fallback if somehow empty
  }

  return (
    <div className="player-page">
      <VideoPlayer
        videoElements={videoElements}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default PlayerPage;
