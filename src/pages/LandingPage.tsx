import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { videoUrls } from '../utils/videoUrls';
import { useVideoContext } from '../context/VideoProvider';
import { useVideoPreloader } from '../hooks/useVideoPreloader';

const LandingPage = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const { progress, complete } = useVideoPreloader(videoUrls, start);
  const { setVideoUrls } = useVideoContext();

  useEffect(() => {
    if (complete) {
      setVideoUrls(videoUrls);
      navigate('/player');
    }
  }, [complete, navigate, setVideoUrls]);

  return (
    <div className="landing-page">
      {!start ? (
        <button onClick={() => setStart(true)} className="start-button">
          Start
        </button>
      ) : (
        <div className="progress-container">
          <p className="progress-text">Loading Videos... {progress}%</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
