
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import ChatContainer from '@/components/ChatContainer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [showSetup, setShowSetup] = useState<boolean>(true);
  const [useConversationalAI, setUseConversationalAI] = useState<boolean>(false);

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate the URL here
    setShowSetup(false);
  };

  const toggleConversationalAI = () => {
    setUseConversationalAI(!useConversationalAI);
  };

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
        {!showSetup && webhookUrl ? (
          <>
            {useConversationalAI ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="glass-card p-8 text-center max-w-md mx-auto">
                  <h2 className="text-xl font-light mb-4 tracking-wide">
                    ElevenLabs Conversational AI
                  </h2>
                  <p className="mb-6 font-light">
                    Interact with IRIS using ElevenLabs Conversational AI.
                  </p>
                  {/* This is where the ElevenLabs widget will be rendered */}
                  <div id="elevenlabs-convai-widget" className="mb-6">
                    {/* Widget will be injected here */}
                  </div>
                  <Button 
                    onClick={toggleConversationalAI}
                    className="w-full bg-white/30 hover:bg-white/40 backdrop-blur-md text-foreground border border-white/30"
                  >
                    Switch to Standard Chat
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <ChatContainer webhookUrl={webhookUrl} />
                <div className="py-4 px-6 text-center">
                  <Button 
                    onClick={toggleConversationalAI}
                    className="bg-white/30 hover:bg-white/40 backdrop-blur-md text-foreground border border-white/30"
                  >
                    Try ElevenLabs Conversational AI
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="glass-card p-8 w-full max-w-md mx-auto">
              <h1 className="text-2xl font-light mb-4 tracking-wide">
                Welcome to IRIS
              </h1>
              <p className="text-base font-light mb-6 tracking-wide leading-relaxed">
                Your voice-activated AI companion, designed for natural conversation with a warm, minimal interface.
              </p>
              <Button 
                onClick={() => setShowSetup(true)}
                className="w-full bg-white/30 hover:bg-white/40 backdrop-blur-md text-foreground border border-white/30"
              >
                Set Up IRIS
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Dialog open={showSetup} onOpenChange={setShowSetup}>
        <DialogContent className="glass-card border-white/30 bg-white/20 backdrop-blur-md sm:max-w-md">
          <form onSubmit={handleSetupSubmit}>
            <DialogHeader>
              <DialogTitle className="text-xl font-light tracking-wide">Set up your IRIS connection</DialogTitle>
              <DialogDescription className="text-foreground/80 font-light tracking-wide">
                Enter the webhook URL where IRIS will process your messages.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url" className="text-foreground/90">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-webhook-url.com/api"
                  className="bg-white/30 border-white/30 placeholder:text-foreground/50"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-foreground/70">
                This is where your user messages will be sent for processing.
              </p>
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                className="bg-white/30 hover:bg-white/40 backdrop-blur-md text-foreground border border-white/30"
              >
                Connect IRIS
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <footer className="py-4 px-6 text-center">
        <p className="text-xs font-light text-foreground/70 tracking-wide">
          IRIS — Integrated Recognition & Interface Service
        </p>
      </footer>
    </div>
  );
};

export default Index;
