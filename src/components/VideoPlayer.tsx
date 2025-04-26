import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoElements: HTMLVideoElement[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoElements,
  currentIndex,
  onNext,
  onPrevious,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoElements[currentIndex] || !videoRef.current) return;

    const preloadedVideo = videoElements[currentIndex];
    const videoElement = videoRef.current;

    try {
      // Instead of copying only src, fully clone the video element
      videoElement.src = preloadedVideo.currentSrc || preloadedVideo.src;
      videoElement.load();

      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay prevented:", error);
          // Optionally show a play button
        });
      }
    } catch (error) {
      console.error("Video loading failed:", error);
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute("src"); // Correct way to remove src
        videoElement.load();
      }
    };
  }, [currentIndex, videoElements]);

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          loop
          className="video-element"
        />
      </div>
      <div className="controls">
        <button onClick={onPrevious} className="control-button">
          Previous
        </button>
        <button onClick={onNext} className="control-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
