import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptionChange?: (text: string) => void;
  onError?: (error: string) => void;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onerror: (event: any) => void;
  onresult: (event: any) => void;
  onend: () => void;
}

// Type guard to check if browser supports speech recognition
const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

export const useSpeechRecognition = ({
  onTranscriptionChange,
  onError,
}: UseSpeechRecognitionProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      onError?.('Speech recognition is not supported in this browser');
      return;
    }

    // Get the appropriate speech recognition constructor
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const currentTranscription = finalTranscript || interimTranscript;
      setTranscription(currentTranscription);
      onTranscriptionChange?.(currentTranscription);
    };

    recognition.onerror = (event: any) => {
      onError?.(event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    setRecognition(recognition);

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onTranscriptionChange, onError]);

  const startRecording = useCallback(() => {
    if (!recognition) {
      onError?.('Speech recognition is not initialized');
      return;
    }

    try {
      recognition.start();
      setIsRecording(true);
    } catch (error) {
      onError?.('Error starting speech recognition');
      setIsRecording(false);
    }
  }, [recognition, onError]);

  const stopRecording = useCallback(() => {
    if (!recognition) {
      return;
    }

    recognition.stop();
    setIsRecording(false);
  }, [recognition]);

  return {
    isRecording,
    transcription,
    startRecording,
    stopRecording,
    isSupported: isSpeechRecognitionSupported(),
  };
};
