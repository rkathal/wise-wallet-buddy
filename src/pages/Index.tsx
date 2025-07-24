import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { FinancialCoachHeader } from "@/components/FinancialCoachHeader";
import { ChatInterface } from "@/components/ChatInterface";
import { FinancialDashboard } from "@/components/FinancialDashboard";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  TrendingUp, 
  Globe, 
  Shield, 
  Gamepad2, 
  Users,
  Brain,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-financial.jpg";
import growthIcon from "@/assets/growth-icon.jpg";
import aiCoachIcon from "@/assets/ai-coach-icon.jpg";
import achievementIcon from "@/assets/achievement-icon.jpg";

interface UserProfile {
  name: string;
  age: string;
  location: string;
  currency: string;
  language: string;
  income: string;
  goals: string[];
  experience: string;
  accessibility: string[];
  level: number;
  points: number;
  streak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  points: number;
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your profile setup',
      earned: true,
      points: 50
    },
    {
      id: '2',
      title: 'Budget Master',
      description: 'Ask your first budget question',
      earned: false,
      points: 100
    },
    {
      id: '3',
      title: 'Investment Explorer',
      description: 'Learn about investment basics',
      earned: false,
      points: 150
    },
    {
      id: '4',
      title: 'Debt Destroyer',
      description: 'Create a debt payment plan',
      earned: false,
      points: 200
    },
    {
      id: '5',
      title: 'Emergency Fund Hero',
      description: 'Set up your emergency fund goal',
      earned: false,
      points: 175
    }
  ]);

  const { toast } = useToast();

  const handleOnboardingComplete = (data: any) => {
    const profile: UserProfile = {
      ...data,
      level: 1,
      points: 50,
      streak: 1
    };
    setUserProfile(profile);
    
    toast({
      title: "Welcome to FinanceAI Coach! 🎉",
      description: "Your personalized financial journey begins now.",
    });
  };

  const handleAchievement = (message: string) => {
    toast({
      title: "Achievement Unlocked! 🏆",
      description: message,
    });
    
    // Update achievements (simplified logic)
    setAchievements(prev => 
      prev.map(a => 
        a.id === '2' && message.includes('budget') 
          ? { ...a, earned: true }
          : a
      )
    );
    
    // Update user points
    if (userProfile && message.includes('budget')) {
      setUserProfile(prev => prev ? { ...prev, points: prev.points + 100 } : null);
    }
  };

  // Show onboarding if no user profile
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="AI Financial Coach" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-primary/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 py-20 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <Badge variant="outline" className="border-primary text-primary px-4 py-2">
                <Bot className="h-4 w-4 mr-2" />
                AI-Powered Financial Coaching
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Your Personal AI
                <br />
                Financial Coach
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get personalized financial guidance, track your goals, and build wealth with AI-powered coaching 
                designed for your unique situation and cultural background.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <OnboardingFlow onComplete={handleOnboardingComplete} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intelligent Financial Guidance for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI coach adapts to your experience level, goals, and cultural background 
              to provide personalized financial advice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                  <img src={aiCoachIcon} alt="AI Coach" className="w-10 h-10 rounded-lg" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Get personalized recommendations based on your financial behavior and goals
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-4">
                  <img src={growthIcon} alt="Growth Tracking" className="w-10 h-10 rounded-lg" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Goal Tracking
                </CardTitle>
                <CardDescription>
                  Set, track, and achieve your financial goals with intelligent progress monitoring
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                  <img src={achievementIcon} alt="Gamification" className="w-10 h-10 rounded-lg" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Gamified Learning
                </CardTitle>
                <CardDescription>
                  Earn points, unlock achievements, and make financial learning engaging and fun
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Globe className="h-5 w-5 text-secondary" />
                  Multilingual Support
                </CardTitle>
                <CardDescription>
                  Get financial guidance in your preferred language with cultural context
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Your financial data is encrypted and protected with enterprise-grade security
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  Inclusive Design
                </CardTitle>
                <CardDescription>
                  Accessible interface designed for users of all abilities and backgrounds
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-glass">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already building wealth with personalized AI coaching.
            </p>
            <Button 
              variant="financial" 
              size="xl"
              className="animate-glow"
              onClick={() => {
                // Scroll to onboarding section
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </section>
      </div>
    );
  }

  // Show main app if user profile exists
  return (
    <div className="min-h-screen bg-gradient-background">
      <FinancialCoachHeader userProfile={userProfile} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {userProfile.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Let's continue working on your financial goals.
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Coach
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <FinancialDashboard 
              userProfile={userProfile} 
              achievements={achievements}
            />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <ChatInterface 
                userProfile={userProfile}
                onAchievement={handleAchievement}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;