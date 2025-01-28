import { useState, useEffect } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem('OPENAI_API_KEY');
    setHasApiKey(!!apiKey);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">AI Chat Assistant</h1>
          <p className="text-primary-foreground/80">
            Chat with an AI powered by OpenAI's GPT-4
          </p>
        </div>
      </header>

      <main className="container py-8">
        {!hasApiKey ? (
          <ApiKeyInput />
        ) : (
          <ChatInterface />
        )}
      </main>
    </div>
  );
};

export default Index;