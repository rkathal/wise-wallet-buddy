import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target, 
  PiggyBank, 
  CreditCard, 
  Star,
  Trophy,
  Zap,
  CheckCircle,
  Plus
} from "lucide-react";

interface FinancialGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  category: string;
  deadline?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  points: number;
}

interface FinancialDashboardProps {
  userProfile: {
    name: string;
    level: number;
    points: number;
    streak: number;
    goals: string[];
  };
  achievements: Achievement[];
}

export const FinancialDashboard = ({ userProfile, achievements }: FinancialDashboardProps) => {
  const [goals] = useState<FinancialGoal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      current: 2500,
      target: 10000,
      category: 'savings',
      deadline: '2024-12-31'
    },
    {
      id: '2',
      title: 'Credit Card Debt',
      current: 3500,
      target: 0,
      category: 'debt',
      deadline: '2024-08-15'
    },
    {
      id: '3',
      title: 'Investment Portfolio',
      current: 1200,
      target: 5000,
      category: 'investing',
      deadline: '2025-06-30'
    }
  ]);

  const getGoalProgress = (goal: FinancialGoal) => {
    if (goal.category === 'debt') {
      return ((goal.target - goal.current) / goal.target) * 100;
    }
    return (goal.current / goal.target) * 100;
  };

  const getGoalColor = (category: string) => {
    switch (category) {
      case 'savings': return 'text-secondary';
      case 'debt': return 'text-warning';
      case 'investing': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'savings': return PiggyBank;
      case 'debt': return CreditCard;
      case 'investing': return TrendingUp;
      default: return Target;
    }
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const nextAchievements = achievements.filter(a => !a.earned).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-white shadow-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Current Level</p>
                <p className="text-3xl font-bold">{userProfile.level}</p>
              </div>
              <Star className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-white shadow-success-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-3xl font-bold">{userProfile.points}</p>
              </div>
              <Trophy className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Streak</p>
                <p className="text-3xl font-bold text-warning">{userProfile.streak}</p>
              </div>
              <Zap className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-3xl font-bold text-primary">{earnedAchievements.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Goals */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Financial Goals
              </CardTitle>
              <CardDescription>Track your progress toward financial success</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {goals.map((goal) => {
            const progress = getGoalProgress(goal);
            const GoalIcon = getGoalIcon(goal.category);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-muted ${getGoalColor(goal.category)}`}>
                      <GoalIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{goal.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {goal.category === 'debt' 
                          ? `$${goal.current.toLocaleString()} remaining`
                          : `$${goal.current.toLocaleString()} of $${goal.target.toLocaleString()}`
                        }
                      </p>
                    </div>
                  </div>
                  <Badge variant={progress >= 100 ? "secondary" : "outline"}>
                    {Math.round(progress)}%
                  </Badge>
                </div>
                <Progress value={Math.min(progress, 100)} className="h-2" />
                {goal.deadline && (
                  <p className="text-xs text-muted-foreground">
                    Target: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-secondary" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Celebrate your financial wins!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {earnedAchievements.slice(0, 3).map((achievement) => (
              <div 
                key={achievement.id} 
                className="flex items-center gap-3 p-3 bg-gradient-glass rounded-lg border border-white/20"
              >
                <div className="p-2 bg-gradient-success rounded-full">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">{achievement.title}</h5>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <Badge variant="secondary" className="bg-gradient-success text-white">
                  +{achievement.points}
                </Badge>
              </div>
            ))}
            {earnedAchievements.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Complete financial actions to earn your first achievement!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Next Achievements */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Next Goals
            </CardTitle>
            <CardDescription>Achievements to unlock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextAchievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 bg-muted rounded-full">
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-muted-foreground">{achievement.title}</h5>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <Badge variant="outline">
                  {achievement.points} pts
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};