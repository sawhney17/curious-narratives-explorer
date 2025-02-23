import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleQuestion, Maximize2, Minimize2, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { getChatResponse, ChatMessage } from '@/lib/openai';
import { Resizable } from 're-resizable';
import { createPortal } from 'react-dom';

interface AIHelperProps {
  currentEvent?: {
    title: string;
    description: string;
    longDescription: string;
    funFact?: string;
    thinkAboutIt?: string;
  };
}

const suggestedQuestions = {
  general: [
    "How do I navigate the timeline?",
    "What do the different colors mean?",
    "How do I view event details?",
    "What's the stick figure for?"
  ],
  event: [
    "Can you explain this event in simpler terms?",
    "What are the key points to remember?",
    "How does this connect to other events?",
    "What terms might I not understand?"
  ]
};

export default function AIHelper({ currentEvent }: AIHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Reset messages when switching events
  useEffect(() => {
    setMessages([]);
  }, [currentEvent?.title]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create context-aware system message
      const systemMessage: ChatMessage = {
        role: 'system',
        content: currentEvent
          ? `You are a helpful AI assistant explaining the timeline event: "${currentEvent.title}". 
             Use this context: ${currentEvent.longDescription}`
          : 'You are a helpful AI assistant explaining how to use the timeline interface. Keep responses brief and friendly.'
      };

      // Get AI response
      const response = await getChatResponse(content, [systemMessage, ...messages]);
      
      if (response) {
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Error getting chat response:', error);
      setMessages(prevMessages => [...prevMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    }

    setIsLoading(false);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-[9998]"
          aria-hidden="true"
          data-ai-helper="true"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
      )}
      <motion.div
        key="helper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-[9999]"
        data-ai-helper="true"
      >
        {!isOpen ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg"
          >
            <MessageCircleQuestion className="w-5 h-5 mr-2" />
            Need Help?
          </Button>
        ) : (
          <Resizable
            defaultSize={{ width: 400, height: 500 }}
            minWidth={300}
            minHeight={400}
            maxWidth={800}
            maxHeight={800}
            enable={{ 
              top: true, 
              right: false, 
              bottom: false, 
              left: true, 
              topRight: false, 
              bottomRight: false, 
              bottomLeft: false, 
              topLeft: true 
            }}
            onResize={(e) => {
              e.stopPropagation();
            }}
          >
            <Card 
              className="w-full h-full flex flex-col bg-white/90 backdrop-blur-sm shadow-xl border-amber-200"
              onClick={(e) => e.stopPropagation()}
              data-ai-helper="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-amber-800">
                  {currentEvent ? `Help: ${currentEvent.title}` : 'Timeline Help'}
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMaximized(!isMaximized)}
                  >
                    {isMaximized ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    ×
                  </Button>
                </div>
              </div>

              {/* Chat Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4" ref={chatContainerRef}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Suggested Questions */}
              <Resizable
                defaultSize={{ width: '100%', height: 120 }}
                minHeight={80}
                maxHeight={300}
                enable={{ 
                  top: true,
                  right: false,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false
                }}
                className="border-t border-gray-200"
              >
                <div className="p-4 h-full overflow-y-auto">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Suggested Questions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(currentEvent ? suggestedQuestions.event : suggestedQuestions.general)
                      .map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-amber-600 border-amber-200 hover:bg-amber-50"
                          onClick={() => handleQuestionClick(question)}
                        >
                          {question}
                        </Button>
                      ))}
                  </div>
                </div>
              </Resizable>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1"
                  />
                  <Button 
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </Resizable>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
