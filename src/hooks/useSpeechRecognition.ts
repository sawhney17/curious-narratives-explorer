
import { useState, useCallback, useRef } from 'react';

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onerror: (event: any) => void;
  onresult: (event: any) => void;
  onend: () => void;
}

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    try {
      if (!recognitionRef.current) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        // @ts-expect-error - lang property exists at runtime but not in type definition
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join(' ');
          console.log('Transcription update:', transcript);
          setCurrentTranscription(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current.onend = () => {
          if (isRecording) {
            console.log('Restarting recognition...');
            recognitionRef.current?.start();
          }
        };
      }

      recognitionRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
    currentTranscription
  };
}
