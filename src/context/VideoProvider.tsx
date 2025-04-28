import { createContext, useContext, useState } from 'react';

interface VideoContextType {
  videoUrls: string[];
  setVideoUrls: (urls: string[]) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  return (
    <VideoContext.Provider value={{ videoUrls, setVideoUrls }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) throw new Error('useVideoContext must be used inside a VideoProvider');
  return context;
};
