
import { useState, useEffect, useCallback } from 'react';

// Define the SpeechRecognition interface that's missing in the global type definitions
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

// Interface for the hook return values
interface UseElevenLabsSTTReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

// For this demo, we're using the browser's built-in SpeechRecognition
// In a production app, you would replace this with the actual ElevenLabs API
export function useElevenLabsSTT(): UseElevenLabsSTTReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Browser SpeechRecognition setup
  const SpeechRecognition = (window as unknown as Window).SpeechRecognition || 
                            (window as unknown as Window).webkitSpeechRecognition;
  let recognition: any = null;
  
  try {
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
    }
  } catch (err) {
    console.error('Speech recognition error:', err);
  }

  // Initialize recognition handlers
  useEffect(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
    
    setError(null);
    setTranscript('');
    
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError('Failed to start speech recognition. Please try again.');
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    try {
      recognition.stop();
      setIsListening(false);
    } catch (err) {
      console.error('Failed to stop speech recognition:', err);
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error
  };
}
