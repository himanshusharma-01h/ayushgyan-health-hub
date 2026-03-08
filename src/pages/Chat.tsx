import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { 
  Leaf, Send, Mic, MicOff, Plus, Menu, X, User, Sparkles, ArrowLeft
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-vaidya-chat`;

const Chat = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { language, t } = useLanguage();
  
  const getWelcomeMessage = (): Message => ({
    id: "welcome",
    role: "assistant",
    content: t('chat.welcome'),
    timestamp: new Date(),
  });

  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasProcessedSymptoms, setHasProcessedSymptoms] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => prev.map(m => m.id === "welcome" ? getWelcomeMessage() : m));
  }, [language]);

  // Handle symptom context from SymptomsChecker
  useEffect(() => {
    const symptomContext = location.state?.symptomContext;
    if (symptomContext && !hasProcessedSymptoms) {
      setHasProcessedSymptoms(true);
      const { symptoms, dominantDosha, herbs, lifestyle, diet } = symptomContext;
      const contextMessage = `Based on my symptom analysis, I have the following symptoms: ${symptoms.join(', ')}. My analysis shows a ${dominantDosha} dosha imbalance. The recommended herbs are: ${herbs.join(', ')}. Recommended lifestyle changes: ${lifestyle.slice(0, 3).join('; ')}. Recommended diet tips: ${diet.slice(0, 3).join('; ')}. Please provide me with personalized Ayurvedic advice based on these symptoms and my ${dominantDosha} imbalance.`;

      const userMessage: Message = {
        id: Date.now().toString(), role: "user", content: contextMessage, timestamp: new Date(),
      };
      setMessages([getWelcomeMessage(), userMessage]);
      
      setTimeout(async () => {
        setIsLoading(true);
        try {
          await streamChatWithMessages([{ role: "user", content: contextMessage }]);
        } catch (error) {
          console.error("Chat error:", error);
          toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to get response", variant: "destructive" });
        } finally {
          setIsLoading(false);
        }
      }, 500);
    }
  }, [location.state, hasProcessedSymptoms]);

  const streamChatWithMessages = async (userMessages: { role: string; content: string }[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages, language }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) throw new Error("Rate limit exceeded. Please wait a moment and try again.");
      if (resp.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
      throw new Error(errorData.error || "Failed to get AI response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: assistantContent } : m));
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: assistantContent } : m));
          }
        } catch { /* ignore */ }
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: inputValue, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));
      await streamChatWithMessages(historyMessages);
    } catch (error) {
      console.error("Chat error:", error);
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to get response", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const toggleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast({ title: "Not Supported", description: t('chat.voiceNotSupported'), variant: "destructive" });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      // Set language based on current selection
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        if (finalTranscript) {
          setInputValue((prev) => prev + finalTranscript);
        }
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        toast({ title: "Voice Error", description: t('chat.voiceError'), variant: "destructive" });
      };
      
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  const startNewChat = () => {
    setMessages([getWelcomeMessage()]);
    toast({ title: t('chat.newConsultation'), description: t('chat.newStarted') });
  };

  const mockChatHistory = [
    { id: "1", title: language === 'hi' ? "पाचन स्वास्थ्य" : "Digestive Health", preview: language === 'hi' ? "सबसे अच्छी जड़ी-बूटियाँ..." : "Best herbs for...", date: language === 'hi' ? "आज" : "Today" },
    { id: "2", title: language === 'hi' ? "तनाव प्रबंधन" : "Stress Management", preview: language === 'hi' ? "तनाव महसूस कर रहा..." : "Feeling stressed...", date: language === 'hi' ? "कल" : "Yesterday" },
  ];

  return (
    <div className="h-[100svh] flex bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-card border-r border-border transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-3 sm:p-4 border-b border-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground text-sm">{t('chat.title')}</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-3 sm:p-4">
            <Button className="w-full gap-2 rounded-xl text-sm" onClick={startNewChat}>
              <Plus className="w-4 h-4" />
              {t('chat.newConsultation')}
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 sm:px-4">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground font-medium mb-2">{t('chat.recentChats')}</p>
              {mockChatHistory.map((chat) => (
                <button key={chat.id} className="w-full p-2.5 text-left rounded-xl hover:bg-secondary transition-colors">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">{chat.title}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{chat.preview}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{chat.date}</p>
                </button>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 sm:p-4 border-t border-border">
            <Button variant="outline" className="w-full rounded-xl text-xs sm:text-sm" asChild>
              <Link to="/dashboard/patient">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('chat.backToDashboard')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 sm:h-16 border-b border-border flex items-center justify-between px-3 sm:px-4 bg-card">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link to="/dashboard/patient">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-display font-semibold text-foreground">{t('chat.title')}</h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{t('chat.subtitle')}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <LanguageToggle />
          </div>
        </header>

        <ScrollArea className="flex-1 p-3 sm:p-4">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${message.role === "user" ? "bg-primary" : "bg-primary/10"}`}>
                  {message.role === "user" ? <User className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary-foreground" /> : <Leaf className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />}
                </div>
                <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${message.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card border border-border rounded-bl-md"}`}>
                  <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2 sm:gap-3">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-3 sm:p-4 bg-card">
          <div className="max-w-3xl mx-auto">
            {/* Listening indicator */}
            {isListening && (
              <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-destructive/10 rounded-full w-fit">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <span className="text-xs text-destructive font-medium">{t('chat.listening')}</span>
              </div>
            )}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  placeholder={t('chat.placeholder')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12 rounded-xl h-10 sm:h-11 text-sm"
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${isListening ? "text-destructive bg-destructive/10" : "text-muted-foreground"}`}
                  onClick={toggleVoiceInput}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button onClick={handleSend} disabled={!inputValue.trim() || isLoading} className="rounded-xl h-10 sm:h-11 px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-2">
              {t('chat.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;