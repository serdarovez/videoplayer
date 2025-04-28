import { useState, useEffect } from 'react';

export const useVideoPreloader = (videoUrls: string[], start: boolean) => {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!start) return;

    const preload = async () => {
      for (let i = 0; i < videoUrls.length; i++) {
        try {
          const response = await fetch(videoUrls[i], { mode: 'cors' });
          if (!response.ok) throw new Error('Failed to preload: ' + videoUrls[i]);
          // Just fetch to warm browser HTTP cache
          setProgress(Math.round(((i + 1) / videoUrls.length) * 100));
        } catch (error) {
          console.error(error);
        }
      }
      setComplete(true);
    };

    preload();
  }, [start, videoUrls]);

  return { progress, complete };
};
