import { useEffect, useState } from "react";

const useVideoPreloader = (videoUrls: string[]) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [videoElements, setVideoElements] = useState<HTMLVideoElement[]>([]);

  useEffect(() => {
    let isCancelled = false; // To cancel if component unmounts
    const loadedVideos: HTMLVideoElement[] = [];

    const preloadVideos = async () => {
      for (let i = 0; i < videoUrls.length; i++) {
        if (isCancelled) break;

        const video = document.createElement("video");
        video.crossOrigin = "anonymous"; // << important
        video.src = videoUrls[i];
        video.preload = "auto";

        try {
          await new Promise<void>((resolve, reject) => {
            video.addEventListener("loadeddata", () => resolve(), {
              once: true,
            });
            video.addEventListener(
              "error",
              () => reject(new Error(`Failed to load video: ${video.src}`)),
              { once: true }
            );
          });
        } catch (error) {
          console.error(error);
        }

        loadedVideos.push(video);

        if (!isCancelled) {
          setLoadingProgress(Math.round(((i + 1) / videoUrls.length) * 100));
        }
      }

      if (!isCancelled) {
        setVideoElements(loadedVideos);
        setIsComplete(true);
      }
    };

    preloadVideos();

    return () => {
      isCancelled = true;
      loadedVideos.forEach((video) => {
        video.src = "";
        video.remove();
      });
    };
  }, [videoUrls]);

  return { loadingProgress, isComplete, videoElements };
};

export default useVideoPreloader;
