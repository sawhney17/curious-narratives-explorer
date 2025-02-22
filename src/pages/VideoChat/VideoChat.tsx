import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useChatState } from '@/hooks/useChatState';
import { useVideoGeneration } from '@/hooks/useVideoGeneration';

const VideoChat = () => {
  const { isRecording, startRecording, stopRecording, currentTranscription } = useSpeechRecognition();
  const { sendMessage, isProcessing } = useChatState();
  const { videoUrl, isGenerating, error: videoError, generateVideoFromText } = useVideoGeneration();
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleToggleRecording = useCallback(async () => {
    try {
      if (!isRecording) {
        // Request microphone permissions
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setAiResponse('');
        startRecording();
        toast.success('Recording started');
      } else {
        stopRecording();
        // Send the final transcription to OpenAI
        if (currentTranscription.trim()) {
          try {
            console.log('Sending transcription to OpenAI:', currentTranscription);
            const response = await sendMessage(currentTranscription);
            if (response) {
              setAiResponse(response);
              // Generate video from AI response
              await generateVideoFromText(response);
              toast.success('Generating video response');
            } else {
              toast.error('No response received from AI');
            }
          } catch (error: any) {
            console.error('Error in handleToggleRecording:', error);
            toast.error(`Failed to get AI response: ${error.message}`);
          }
        } else {
          toast.warning('No speech detected');
        }
        toast.info('Recording stopped');
      }
    } catch (error: any) {
      console.error('Error accessing microphone:', error);
      toast.error(`Could not access microphone: ${error.message}`);
    }
  }, [isRecording, currentTranscription, startRecording, stopRecording, sendMessage, generateVideoFromText]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Video Chat</h1>
          <p className="text-gray-600">Speak with an AI and watch it respond with a video message.</p>
        </div>

        {/* Main Content */}
        <Card className="p-6 shadow-lg">
          {/* Video Display Area */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">AI Video Response</h3>
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <p className="text-gray-500">Generating video response...</p>
                </div>
              ) : videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              ) : videoError ? (
                <div className="text-red-500 text-center p-4">
                  <p>Error generating video: {videoError}</p>
                </div>
              ) : (
                <p className="text-gray-500">AI video response will appear here</p>
              )}
            </div>
          </div>

          {/* AI Text Response */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">AI Text Response</h3>
            <div className="bg-gray-100 rounded-lg p-6 min-h-[100px] flex items-center justify-center">
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <p className="text-gray-500">Processing response...</p>
                </div>
              ) : aiResponse ? (
                <div className="w-full">
                  <p className="text-gray-700 text-lg leading-relaxed">{aiResponse}</p>
                </div>
              ) : (
                <p className="text-gray-500">AI response will appear here</p>
              )}
            </div>
          </div>

          {/* Transcription Display */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Your Speech</h3>
            <div className="min-h-[100px] bg-gray-50 rounded-lg p-4">
              {currentTranscription ? (
                <p className="text-gray-700">{currentTranscription}</p>
              ) : (
                <p className="text-gray-400 italic">Your speech will appear here...</p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center">
            <Button
              onClick={handleToggleRecording}
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              className="w-48"
              disabled={isProcessing || isGenerating}
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
      </div>
    </div>
  );
};

export default VideoChat;
