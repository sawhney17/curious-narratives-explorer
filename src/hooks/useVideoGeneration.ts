import { useState, useCallback, useEffect } from 'react';
import { generateVideo, getVideoStatus } from '@/lib/did';

interface VideoState {
  videoUrl: string | null;
  isGenerating: boolean;
  error: string | null;
}

export function useVideoGeneration() {
  const [videoState, setVideoState] = useState<VideoState>({
    videoUrl: null,
    isGenerating: false,
    error: null,
  });

  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  // Poll for video status
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (currentVideoId && videoState.isGenerating) {
      intervalId = setInterval(async () => {
        try {
          const status = await getVideoStatus(currentVideoId);
          
          if (status.status === 'done' && status.result_url) {
            setVideoState({
              videoUrl: status.result_url,
              isGenerating: false,
              error: null,
            });
            setCurrentVideoId(null);
          } else if (status.status === 'failed') {
            setVideoState({
              videoUrl: null,
              isGenerating: false,
              error: 'Video generation failed',
            });
            setCurrentVideoId(null);
          }
        } catch (error) {
          setVideoState({
            videoUrl: null,
            isGenerating: false,
            error: 'Failed to check video status',
          });
          setCurrentVideoId(null);
        }
      }, 2000); // Poll every 2 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentVideoId, videoState.isGenerating]);

  const generateVideoFromText = useCallback(async (text: string) => {
    try {
      setVideoState({
        videoUrl: null,
        isGenerating: true,
        error: null,
      });

      const response = await generateVideo(text);
      setCurrentVideoId(response.id);
    } catch (error) {
      setVideoState({
        videoUrl: null,
        isGenerating: false,
        error: 'Failed to start video generation',
      });
    }
  }, []);

  return {
    ...videoState,
    generateVideoFromText,
  };
}
