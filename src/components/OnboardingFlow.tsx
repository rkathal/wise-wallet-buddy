import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, User, Target, Globe, Accessibility } from "lucide-react";

interface OnboardingData {
  name: string;
  age: string;
  location: string;
  currency: string;
  language: string;
  income: string;
  goals: string[];
  experience: string;
  accessibility: string[];
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    location: "",
    currency: "USD",
    language: "en",
    income: "",
    goals: [],
    experience: "",
    accessibility: []
  });

  // Country to currency mapping
  const countryCurrencyMap: Record<string, string> = {
    "us": "USD",
    "canada": "CAD", 
    "uk": "GBP",
    "germany": "EUR",
    "france": "EUR",
    "australia": "AUD",
    "japan": "JPY",
    "singapore": "SGD",
    "india": "INR",
    "brazil": "BRL",
    "mexico": "MXN",
    "south-africa": "ZAR",
    "netherlands": "EUR",
    "sweden": "SEK",
    "switzerland": "CHF",
    "other": "USD"
  };

  // Currency symbol mapping
  const currencySymbolMap: Record<string, string> = {
    "USD": "$",
    "CAD": "C$",
    "GBP": "£",
    "EUR": "€",
    "AUD": "A$",
    "JPY": "¥",
    "SGD": "S$",
    "INR": "₹",
    "BRL": "R$",
    "MXN": "MX$",
    "ZAR": "R",
    "SEK": "kr",
    "CHF": "CHF"
  };

  const getIncomeRanges = (currency: string) => {
    const symbol = currencySymbolMap[currency] || "$";
    
    // PPP-adjusted annual income ranges by currency
    const ranges: Record<string, { value: string; label: string }[]> = {
      "USD": [
        { value: "under-25000", label: `Under ${symbol}25,000` },
        { value: "25000-50000", label: `${symbol}25,000 - ${symbol}50,000` },
        { value: "50000-75000", label: `${symbol}50,000 - ${symbol}75,000` },
        { value: "75000-100000", label: `${symbol}75,000 - ${symbol}100,000` },
        { value: "100000-150000", label: `${symbol}100,000 - ${symbol}150,000` },
        { value: "over-150000", label: `Over ${symbol}150,000` }
      ],
      "CAD": [
        { value: "under-30000", label: `Under ${symbol}30,000` },
        { value: "30000-60000", label: `${symbol}30,000 - ${symbol}60,000` },
        { value: "60000-90000", label: `${symbol}60,000 - ${symbol}90,000` },
        { value: "90000-120000", label: `${symbol}90,000 - ${symbol}120,000` },
        { value: "120000-180000", label: `${symbol}120,000 - ${symbol}180,000` },
        { value: "over-180000", label: `Over ${symbol}180,000` }
      ],
      "GBP": [
        { value: "under-20000", label: `Under ${symbol}20,000` },
        { value: "20000-35000", label: `${symbol}20,000 - ${symbol}35,000` },
        { value: "35000-50000", label: `${symbol}35,000 - ${symbol}50,000` },
        { value: "50000-75000", label: `${symbol}50,000 - ${symbol}75,000` },
        { value: "75000-100000", label: `${symbol}75,000 - ${symbol}100,000` },
        { value: "over-100000", label: `Over ${symbol}100,000` }
      ],
      "EUR": [
        { value: "under-22000", label: `Under ${symbol}22,000` },
        { value: "22000-40000", label: `${symbol}22,000 - ${symbol}40,000` },
        { value: "40000-60000", label: `${symbol}40,000 - ${symbol}60,000` },
        { value: "60000-80000", label: `${symbol}60,000 - ${symbol}80,000` },
        { value: "80000-120000", label: `${symbol}80,000 - ${symbol}120,000` },
        { value: "over-120000", label: `Over ${symbol}120,000` }
      ],
      "AUD": [
        { value: "under-35000", label: `Under ${symbol}35,000` },
        { value: "35000-65000", label: `${symbol}35,000 - ${symbol}65,000` },
        { value: "65000-90000", label: `${symbol}65,000 - ${symbol}90,000` },
        { value: "90000-120000", label: `${symbol}90,000 - ${symbol}120,000` },
        { value: "120000-180000", label: `${symbol}120,000 - ${symbol}180,000` },
        { value: "over-180000", label: `Over ${symbol}180,000` }
      ],
      "JPY": [
        { value: "under-3000000", label: `Under ${symbol}3,000,000` },
        { value: "3000000-6000000", label: `${symbol}3,000,000 - ${symbol}6,000,000` },
        { value: "6000000-9000000", label: `${symbol}6,000,000 - ${symbol}9,000,000` },
        { value: "9000000-12000000", label: `${symbol}9,000,000 - ${symbol}12,000,000` },
        { value: "12000000-18000000", label: `${symbol}12,000,000 - ${symbol}18,000,000` },
        { value: "over-18000000", label: `Over ${symbol}18,000,000` }
      ],
      "SGD": [
        { value: "under-30000", label: `Under ${symbol}30,000` },
        { value: "30000-60000", label: `${symbol}30,000 - ${symbol}60,000` },
        { value: "60000-90000", label: `${symbol}60,000 - ${symbol}90,000` },
        { value: "90000-120000", label: `${symbol}90,000 - ${symbol}120,000` },
        { value: "120000-180000", label: `${symbol}120,000 - ${symbol}180,000` },
        { value: "over-180000", label: `Over ${symbol}180,000` }
      ],
      "INR": [
        { value: "under-500000", label: `Under ${symbol}5,00,000` },
        { value: "500000-1000000", label: `${symbol}5,00,000 - ${symbol}10,00,000` },
        { value: "1000000-2000000", label: `${symbol}10,00,000 - ${symbol}20,00,000` },
        { value: "2000000-3000000", label: `${symbol}20,00,000 - ${symbol}30,00,000` },
        { value: "3000000-5000000", label: `${symbol}30,00,000 - ${symbol}50,00,000` },
        { value: "over-5000000", label: `Over ${symbol}50,00,000` }
      ]
    };
    
    return ranges[currency] || ranges["USD"];
  };

  const handleCountryChange = (country: string) => {
    updateData('location', country);
    updateData('currency', countryCurrencyMap[country] || 'USD');
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    const currentGoals = data.goals;
    if (currentGoals.includes(goal)) {
      updateData('goals', currentGoals.filter(g => g !== goal));
    } else {
      updateData('goals', [...currentGoals, goal]);
    }
  };

  const toggleAccessibility = (feature: string) => {
    const current = data.accessibility;
    if (current.includes(feature)) {
      updateData('accessibility', current.filter(f => f !== feature));
    } else {
      updateData('accessibility', [...current, feature]);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else onComplete(data);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Let's Get to Know You</h2>
              <p className="text-muted-foreground">Help us personalize your financial coaching experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={(e) => updateData('name', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age Group</Label>
                  <Select value={data.age} onValueChange={(value) => updateData('age', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="26-35">26-35</SelectItem>
                      <SelectItem value="36-45">36-45</SelectItem>
                      <SelectItem value="46-55">46-55</SelectItem>
                      <SelectItem value="56-65">56-65</SelectItem>
                      <SelectItem value="65+">65+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="location">Country</Label>
                  <Select value={data.location} onValueChange={handleCountryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="japan">Japan</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                      <SelectItem value="south-africa">South Africa</SelectItem>
                      <SelectItem value="netherlands">Netherlands</SelectItem>
                      <SelectItem value="sweden">Sweden</SelectItem>
                      <SelectItem value="switzerland">Switzerland</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {data.location && (
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Selected Currency:</span>
                    <span className="font-semibold text-primary">{data.currency}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">What Are Your Financial Goals?</h2>
              <p className="text-muted-foreground">Select all that apply to you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Build Emergency Fund",
                "Pay Off Debt",
                "Save for Retirement",
                "Buy a Home",
                "Start Investing",
                "Improve Credit Score",
                "Create a Budget",
                "Start a Business"
              ].map((goal) => (
                <Card 
                  key={goal} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    data.goals.includes(goal) ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => toggleGoal(goal)}
                >
                  <CardContent className="p-4 flex items-center space-x-2">
                    <Checkbox checked={data.goals.includes(goal)} />
                    <span className="text-sm font-medium">{goal}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div>
              <Label>Annual Income Range</Label>
              <Select value={data.income} onValueChange={(value) => updateData('income', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your annual income range" />
                </SelectTrigger>
                <SelectContent>
                  {getIncomeRanges(data.currency).map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Language & Experience</h2>
              <p className="text-muted-foreground">Help us communicate effectively with you</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Preferred Language</Label>
                <Select value={data.language} onValueChange={(value) => updateData('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Financial Experience Level</Label>
                <RadioGroup value={data.experience} onValueChange={(value) => updateData('experience', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - I'm just starting out</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - I have some knowledge</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced - I'm quite knowledgeable</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Accessibility className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accessibility Preferences</h2>
              <p className="text-muted-foreground">Help us make the app more accessible for you</p>
            </div>
            
            <div className="space-y-3">
              {[
                "Large text support",
                "High contrast mode",
                "Screen reader support",
                "Simplified navigation",
                "Audio descriptions",
                "Keyboard navigation"
              ].map((feature) => (
                <Card 
                  key={feature} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    data.accessibility.includes(feature) ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => toggleAccessibility(feature)}
                >
                  <CardContent className="p-4 flex items-center space-x-2">
                    <Checkbox checked={data.accessibility.includes(feature)} />
                    <span className="text-sm font-medium">{feature}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="p-4 bg-gradient-glass rounded-lg border border-white/20">
              <p className="text-sm text-muted-foreground">
                🔒 Your privacy is important to us. All personal information is encrypted and used only to personalize your experience.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={
                (step === 1 && (!data.name || !data.age || !data.location)) ||
                (step === 2 && (data.goals.length === 0 || !data.income)) ||
                (step === 3 && !data.experience)
              }
              className="flex items-center gap-2"
              variant="financial"
            >
              {step === totalSteps ? 'Start Coaching' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};