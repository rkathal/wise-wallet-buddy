import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Menu, X, Star, TrendingUp, Globe } from "lucide-react";

interface FinancialCoachHeaderProps {
  userProfile?: {
    name: string;
    level: number;
    points: number;
    streak: number;
  };
}

export const FinancialCoachHeader = ({ userProfile }: FinancialCoachHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-glass backdrop-blur-xl border-b border-white/20 shadow-elegant">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-glow animate-glow">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FinanceAI Coach
            </h1>
            <p className="text-xs text-muted-foreground">Your Personal Financial Guide</p>
          </div>
        </div>

        {/* User Profile Stats (Desktop) */}
        {userProfile && (
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-gradient-success text-white">
                <Star className="h-3 w-3 mr-1" />
                Level {userProfile.level}
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                {userProfile.points} pts
              </Badge>
              <Badge variant="outline" className="border-secondary text-secondary">
                🔥 {userProfile.streak} days
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{userProfile.name}</span>
            </div>
          </div>
        )}

        {/* Language Selector & Menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Globe className="h-4 w-4" />
            EN
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && userProfile && (
        <div className="md:hidden border-t border-white/20 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{userProfile.name}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-gradient-success text-white">
                <Star className="h-3 w-3 mr-1" />
                Level {userProfile.level}
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                {userProfile.points} pts
              </Badge>
              <Badge variant="outline" className="border-secondary text-secondary">
                🔥 {userProfile.streak} days
              </Badge>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};