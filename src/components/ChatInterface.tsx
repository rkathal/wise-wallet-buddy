import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Mic, MicOff, MessageSquare, TrendingUp, Target, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'achievement';
  metadata?: {
    category?: string;
    confidence?: number;
    actions?: string[];
  };
}

interface ChatInterfaceProps {
  userProfile: {
    name: string;
    goals: string[];
    experience: string;
    language: string;
  };
  onAchievement?: (achievement: string) => void;
}

export const ChatInterface = ({ userProfile, onAchievement }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${userProfile.name}! 👋 I'm your AI Financial Coach. I'm here to help you achieve your financial goals. Based on your profile, I see you're interested in: ${userProfile.goals.slice(0, 2).join(', ')}${userProfile.goals.length > 2 ? ' and more' : ''}. What would you like to discuss today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      metadata: { category: 'greeting', confidence: 1.0 }
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    // Simulate AI response based on keywords and user profile
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let category = "general";
    let actions: string[] = [];

    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      response = `Great question about budgeting! For someone at your ${userProfile.experience} level, I recommend starting with the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Would you like me to help you create a personalized budget based on your income?`;
      category = "budgeting";
      actions = ["Create Budget", "Track Expenses", "Set Alerts"];
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('stock')) {
      response = `Investing is one of your goals! Given your experience level, I'd suggest starting with low-cost index funds or ETFs. They're diversified and less risky for beginners. The key is to start early and be consistent. Would you like to learn about different investment types?`;
      category = "investing";
      actions = ["Learn Investment Types", "Risk Assessment", "Portfolio Builder"];
    } else if (lowerMessage.includes('debt') || lowerMessage.includes('loan')) {
      response = `Debt management is crucial for financial health. I recommend the debt avalanche method: pay minimums on all debts, then put extra money toward the highest interest rate debt first. This saves you the most money long-term. What types of debt are you dealing with?`;
      category = "debt";
      actions = ["Debt Calculator", "Payment Plan", "Debt Consolidation"];
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('savings')) {
      response = `Building an emergency fund is excellent! Aim for 3-6 months of expenses. Start small - even $500 can help with minor emergencies. Set up automatic transfers to make saving easier. Based on your goals, this seems like a priority. Should we calculate your target amount?`;
      category = "savings";
      actions = ["Calculate Target", "Auto-Save Setup", "High-Yield Accounts"];
    } else if (lowerMessage.includes('credit') || lowerMessage.includes('score')) {
      response = `Credit scores are important for financial opportunities! Pay bills on time, keep credit utilization below 30%, and don't close old accounts. Check your credit report annually for errors. Improving credit takes time but is worth it. Want to know your current credit factors?`;
      category = "credit";
      actions = ["Credit Report", "Score Tracker", "Improvement Plan"];
    } else {
      response = `I understand you're asking about "${userMessage}". As your financial coach, I'm here to help with budgeting, saving, investing, debt management, and credit improvement. Could you be more specific about which area you'd like to focus on?`;
      category = "clarification";
      actions = ["Budget Help", "Investment Guide", "Debt Planning"];
    }

    // Add personalization based on user profile
    if (userProfile.experience === 'beginner') {
      response += " Since you're new to this, I'll keep my explanations simple and provide step-by-step guidance.";
    } else if (userProfile.experience === 'advanced') {
      response += " I can see you have experience, so I can dive deeper into advanced strategies if you'd like.";
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      metadata: { 
        category, 
        confidence: 0.85,
        actions
      }
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Check for achievements
      if (inputMessage.toLowerCase().includes('budget') && userProfile.goals.includes('Create a Budget')) {
        onAchievement?.("Asked about budgeting - First step to financial control! 🎯");
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Voice Input",
        description: "Voice recording would start here. This is a demo version.",
      });
      setTimeout(() => setIsRecording(false), 3000);
    } else {
      setIsRecording(false);
    }
  };

  const quickActions = [
    { label: "Create Budget", icon: Target },
    { label: "Investment Tips", icon: TrendingUp },
    { label: "Emergency Fund", icon: AlertCircle },
    { label: "Debt Plan", icon: MessageSquare }
  ];

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-gradient-background rounded-lg shadow-elegant">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/20 bg-gradient-glass backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Avatar className="bg-gradient-primary p-1">
            <AvatarFallback>
              <Bot className="h-5 w-5 text-white" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">AI Financial Coach</h3>
            <p className="text-xs text-muted-foreground">Online • Ready to help</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {userProfile.language.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <Avatar className="bg-gradient-primary p-1">
                <AvatarFallback>
                  <Bot className="h-4 w-4 text-white" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
              <Card className={`${
                message.sender === 'user' 
                  ? 'bg-gradient-primary text-white shadow-glow' 
                  : 'bg-card shadow-elegant'
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                  {message.metadata?.actions && message.metadata.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.metadata.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => toast({
                            title: action,
                            description: "Feature coming soon! This would open the relevant tool.",
                          })}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              <p className="text-xs text-muted-foreground mt-1 px-3">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.sender === 'user' && (
              <Avatar className="bg-muted">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="bg-gradient-primary p-1">
              <AvatarFallback>
                <Bot className="h-4 w-4 text-white" />
              </AvatarFallback>
            </Avatar>
            <Card className="bg-card shadow-elegant">
              <CardContent className="p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-white/20">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setInputMessage(`Tell me about ${action.label.toLowerCase()}`)}
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/20 bg-gradient-glass backdrop-blur-xl">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about budgeting, investing, debt management..."
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${
                isRecording ? 'text-destructive animate-pulse' : 'text-muted-foreground'
              }`}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            variant="financial"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};