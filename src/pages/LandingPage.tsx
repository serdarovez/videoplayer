import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVideoPreloader from "../hooks/useVideoPreloader";
import { videoUrls } from "../utils/videoUrls";
import StartButton from "../components/StartButton";
import { useVideoContext } from "../context/VideoProvider";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [startClicked, setStartClicked] = useState(false);
  const { loadingProgress, isComplete, videoElements } =
    useVideoPreloader(videoUrls);
  const { setVideoElements: saveVideos } = useVideoContext();

  useEffect(() => {
    if (isComplete && startClicked) {
      saveVideos(videoElements); // Save preloaded videos globally
      navigate("/player");
    }
  }, [isComplete, startClicked, navigate, videoElements, saveVideos]);

  const handleStart = () => {
    setStartClicked(true);
  };

  return (
    <div className="landing-page">
      <h1>Video Player</h1>
      {!startClicked ? (
        <StartButton onClick={handleStart} />
      ) : (
        <div className="loading-container">
          <p>Loading videos... {Math.round(loadingProgress)}%</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
