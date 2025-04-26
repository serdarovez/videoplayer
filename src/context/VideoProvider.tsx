import React, { createContext, useContext, useState } from "react";

interface VideoContextType {
  videoElements: HTMLVideoElement[];
  setVideoElements: (videos: HTMLVideoElement[]) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [videoElements, setVideoElements] = useState<HTMLVideoElement[]>([]);

  return (
    <VideoContext.Provider value={{ videoElements, setVideoElements }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used inside a VideoProvider");
  }
  return context;
};
