
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
  isProcessing: boolean;
}

const MicButton: React.FC<MicButtonProps> = ({ isListening, onClick, isProcessing }) => {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing}
      className={cn(
        "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
        "border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isListening 
          ? "bg-primary/20 border-primary animate-pulse-glow" 
          : "bg-white/20 border-white/50 hover:bg-white/30",
        "dark:bg-black/30 dark:hover:bg-black/40",
        isProcessing && "opacity-50 cursor-not-allowed"
      )}
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      {isListening ? (
        <Mic className="h-6 w-6 text-primary-foreground" />
      ) : (
        <MicOff className="h-6 w-6 text-foreground/70" />
      )}
      <span className={cn(
        "absolute -bottom-8 text-xs font-medium tracking-wider",
        isListening ? "text-primary-foreground" : "text-foreground/70"
      )}>
        {isListening ? "Listening..." : "Tap to speak"}
      </span>
    </button>
  );
};

export default MicButton;
