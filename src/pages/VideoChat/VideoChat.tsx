import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

const VideoChat = () => {
  const {
    isRecording,
    transcription,
    startRecording,
    stopRecording,
    isSupported
  } = useSpeechRecognition({
    onTranscriptionChange: (text) => {
      console.log('Transcription:', text);
    },
    onError: (error) => {
      toast.error(`Speech recognition error: ${error}`);
    }
  });

  useEffect(() => {
    if (!isSupported) {
      toast.error('Speech recognition is not supported in your browser');
    }
  }, [isSupported]);

  const handleToggleRecording = async () => {
    try {
      if (!isRecording) {
        // Request microphone permissions
        await navigator.mediaDevices.getUserMedia({ audio: true });
        startRecording();
        toast.success('Recording started');
      } else {
        stopRecording();
        toast.info('Recording stopped');
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Video Chat</h1>
            <p className="text-gray-600">Have a conversation with an AI assistant</p>
          </div>

          {/* Main Content */}
          <Card className="p-6 shadow-lg">
            {/* Video Display Area (placeholder for now) */}
            <div className="bg-gray-100 rounded-lg aspect-video mb-6 flex items-center justify-center">
              <p className="text-gray-500">AI Video will appear here</p>
            </div>

            {/* Transcription Display */}
            <div className="min-h-[100px] bg-gray-50 rounded-lg p-4 mb-6">
              {transcription ? (
                <p className="text-gray-700">{transcription}</p>
              ) : (
                <p className="text-gray-400 italic">Your speech will appear here...</p>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center">
              <Button
                onClick={handleToggleRecording}
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                className="w-48"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoChat;
