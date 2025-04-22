
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import MicButton from './MicButton';
import { useToast } from '@/components/ui/use-toast';
import { useElevenLabsSTT } from '@/hooks/use-elevenlabs-stt';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatContainerProps {
  webhookUrl: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ webhookUrl }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello, I'm IRIS. How can I help you today?", isUser: false }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    error 
  } = useElevenLabsSTT();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle transcript submission when speech recognition stops
  useEffect(() => {
    if (!isListening && transcript) {
      const userMessage = transcript.trim();
      if (userMessage) {
        handleUserMessage(userMessage);
      }
    }
  }, [isListening, transcript]);

  const toggleListening = () => {
    if (isProcessing) return;
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleUserMessage = async (text: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { text, isUser: true }]);
    setIsProcessing(true);

    try {
      // Send message to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from IRIS');
      }

      const data = await response.json();
      
      // Add IRIS response to chat
      setMessages(prev => [...prev, { 
        text: data.response || "I'm sorry, I couldn't process that request.",
        isUser: false 
      }]);
    } catch (err) {
      console.error('Error processing message:', err);
      toast({
        title: "Connection Error",
        description: "Failed to connect to IRIS. Please try again.",
        variant: "destructive",
      });
      
      // Add fallback response
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto py-4 px-4 md:px-0">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message.text} 
              isUser={message.isUser} 
              animate={!message.isUser && index === messages.length - 1}
            />
          ))}
          {isListening && transcript && (
            <ChatMessage 
              message={transcript} 
              isUser={true} 
              animate={false}
            />
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      
      <div className="sticky bottom-0 py-6 flex justify-center">
        <MicButton 
          isListening={isListening} 
          onClick={toggleListening}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
