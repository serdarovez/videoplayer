import { useState, useRef, useEffect } from 'react';
import { useVideoContext } from '../context/VideoProvider';

const PlayerPage = () => {
  const { videoUrls } = useVideoContext(); // ← These are Blob URLs now
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    video.src = videoUrls[index];
    video.load();
    video.play().catch((error) => {
      console.error('Autoplay error:', error);
    });
  }, [index, videoUrls]);

  const nextVideo = () => setIndex((i) => (i + 1) % videoUrls.length);
  const prevVideo = () => setIndex((i) => (i - 1 + videoUrls.length) % videoUrls.length);

  return (
    <div className="player-page">
      <video
        ref={videoRef}
        playsInline
        muted
        loop
        autoPlay
        className="video-element"
      />
      <div className="controls">
        <button onClick={prevVideo} className="control-button">Previous</button>
        <button onClick={nextVideo} className="control-button">Next</button>
      </div>
    </div>
  );
};

export default PlayerPage;
