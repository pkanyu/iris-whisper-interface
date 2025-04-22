
import React from 'react';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import SpinningBlob from '@/components/SpinningBlob';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col iris-gradient">
      <div className="fixed top-6 right-6 z-10 flex space-x-4">
        <ThemeToggle />
      </div>
      
      <header className="pt-8 pb-4 px-6">
        <div className="max-w-2xl mx-auto">
          <Logo />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-8 text-center max-w-md mx-auto w-full">
            <h2 className="text-xl font-light mb-4 tracking-wide">
              ElevenLabs Conversational AI
            </h2>
            
            <SpinningBlob />
            
            <p className="mb-6 font-light">
              Interact with IRIS using ElevenLabs Conversational AI.
            </p>
            
            {/* ElevenLabs widget injected here */}
            <div id="elevenlabs-convai-widget" className="mb-6">
              {/* @ts-ignore - The custom element is declared in elevenlabs.d.ts but TypeScript might still show warnings */}
              <elevenlabs-convai agent-id="z5ol57Y37jMdg2ac6RQg"></elevenlabs-convai>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center">
        <p className="text-xs font-light text-foreground/70 tracking-wide">
          IRIS — Integrated Recognition & Interface Service
        </p>
      </footer>
    </div>
  );
};

export default Index;
