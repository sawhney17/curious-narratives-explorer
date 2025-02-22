import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getChatResponse, ChatMessage } from '@/lib/openai';
import { toast } from 'sonner';

export const useChatState = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mutation for handling chat responses
  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      console.log('Starting chat mutation with message:', userMessage);
      setIsProcessing(true);
      try {
        const response = await getChatResponse(userMessage, messages);
        console.log('Chat mutation received response:', response);
        
        if (response) {
          // Add user message and AI response to chat history
          const userMsg = { role: 'user', content: userMessage } as ChatMessage;
          const aiMsg = { role: 'assistant', content: response.content } as ChatMessage;
          
          setMessages(prev => [...prev, userMsg, aiMsg]);
          return response.content;
        } else {
          throw new Error('No response received from OpenAI');
        }
      } catch (error: any) {
        console.error('Chat mutation error:', {
          error: error.message,
          type: error.type,
          stack: error.stack
        });
        toast.error(`AI response error: ${error.message}`);
        throw error;
      } finally {
        setIsProcessing(false);
      }
    }
  });

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) {
      toast.error('Cannot send empty message');
      return;
    }
    return chatMutation.mutateAsync(message);
  }, [chatMutation]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isProcessing,
    sendMessage,
    clearChat,
    lastMessage: messages[messages.length - 1]?.content || ''
  };
};
