import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

export const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    localStorage.setItem('OPENAI_API_KEY', apiKey);
    setApiKey("");
    toast({
      title: "Success",
      description: "API key has been saved",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-lg font-semibold">Enter your OpenAI API Key</h2>
      <div className="flex gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="flex-1"
        />
        <Button type="submit">Save Key</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Your API key will be stored locally in your browser.
      </p>
    </form>
  );
};