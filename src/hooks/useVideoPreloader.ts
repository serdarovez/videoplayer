import { useState, useEffect } from 'react';

export const useVideoPreloader = (videoUrls: string[], start: boolean) => {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [blobUrls, setBlobUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!start) return;

    const preload = async () => {
      const loadedBlobUrls: string[] = [];

      for (let i = 0; i < videoUrls.length; i++) {
        try {
          const response = await fetch(videoUrls[i]);
          if (!response.ok) throw new Error('Failed to fetch ' + videoUrls[i]);

          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          loadedBlobUrls.push(blobUrl);

          setProgress(Math.round(((i + 1) / videoUrls.length) * 100));
        } catch (error) {
          console.error(error);
        }
      }

      setBlobUrls(loadedBlobUrls);
      setComplete(true);
    };

    preload();

    // Cleanup blob URLs on unmount
    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [start, videoUrls]);

  return { progress, complete, blobUrls };
};
