
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  animate?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, animate = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(!animate);

  useEffect(() => {
    if (!animate) {
      setDisplayedText(message);
      setIsComplete(true);
      return;
    }

    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const typingInterval = setInterval(() => {
      setDisplayedText((current) => current + message.charAt(index));
      index++;

      if (index >= message.length) {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, 30); // Speed of typing animation

    return () => clearInterval(typingInterval);
  }, [message, animate]);

  return (
    <div 
      className={cn(
        "max-w-[80%] px-5 py-3 mb-3 animate-fade-in glass-card",
        isUser ? "ml-auto" : "mr-auto",
        !isComplete && "typing-indicator"
      )}
    >
      <p className="text-base leading-relaxed tracking-wide font-light">
        {displayedText}
      </p>
    </div>
  );
};

export default ChatMessage;
