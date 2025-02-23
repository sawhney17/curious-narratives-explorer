import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Loader2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useChatState } from '@/hooks/useChatState';
import { useVideoGeneration } from '@/hooks/useVideoGeneration';
import { useNavigate } from 'react-router-dom';

const VideoChat = () => {
  const navigate = useNavigate();
  const { isRecording, startRecording, stopRecording, currentTranscription } = useSpeechRecognition();
  const { sendMessage, isProcessing } = useChatState();
  const { videoUrl, isGenerating, error: videoError, generateVideoFromText } = useVideoGeneration();
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleToggleRecording = useCallback(async () => {
    try {
      if (!isRecording) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setAiResponse('');
        startRecording();
        toast.success('Recording started');
      } else {
        stopRecording();
        if (currentTranscription.trim()) {
          try {
            console.log('Sending transcription to OpenAI:', currentTranscription);
            const response = await sendMessage(currentTranscription);
            if (response) {
              setAiResponse(response);
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-emerald-800 mb-3">AI Video Chat</h1>
            <p className="text-emerald-600 text-lg">Speak with an AI and watch it respond with a video message.</p>
          </div>

          {/* Main Content */}
          <Card className="p-8 shadow-lg border-emerald-100">
            {/* Video Display Area */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">AI Video Response</h3>
              <div className="bg-emerald-50 rounded-lg aspect-video flex items-center justify-center overflow-hidden border border-emerald-100">
                {isGenerating ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                    <p className="text-emerald-600">Generating video response...</p>
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
                  <p className="text-emerald-500">AI video response will appear here</p>
                )}
              </div>
            </div>

            {/* AI Text Response */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">AI Text Response</h3>
              <div className="bg-emerald-50 rounded-lg p-6 min-h-[100px] flex items-center justify-center border border-emerald-100">
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                    <p className="text-emerald-600">Processing response...</p>
                  </div>
                ) : aiResponse ? (
                  <p className="text-emerald-700">{aiResponse}</p>
                ) : (
                  <p className="text-emerald-500">AI response will appear here</p>
                )}
              </div>
            </div>

            {/* Transcription Display */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">Your Message</h3>
              <div className="bg-emerald-50 rounded-lg p-6 min-h-[60px] border border-emerald-100">
                <p className="text-emerald-700">
                  {currentTranscription || 'Your spoken message will appear here...'}
                </p>
              </div>
            </div>

            {/* Recording Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleToggleRecording}
                className={`${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-emerald-500 hover:bg-emerald-600'
                } text-white font-semibold py-6 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-3`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-6 h-6" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
