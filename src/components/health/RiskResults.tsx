import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, CheckCircle, Info, TrendingUp } from "lucide-react";

interface RiskFactor {
  name: string;
  impact: 'high' | 'medium' | 'low';
  value: string;
  recommendation: string;
}

interface RiskResultsProps {
  diseaseType: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: RiskFactor[];
  onBack: () => void;
  onRestart: () => void;
}

export function RiskResults({ diseaseType, riskScore, riskLevel, riskFactors, onBack, onRestart }: RiskResultsProps) {
  const diseaseNames = {
    diabetes: 'Diabetes',
    heart: 'Heart Disease',
    stroke: 'Stroke'
  };

  const riskConfig = {
    low: {
      color: 'text-success',
      bgColor: 'bg-gradient-to-r from-success/10 to-success/5',
      icon: <CheckCircle className="h-6 w-6 text-success" />,
      message: 'Your risk is relatively low. Keep up the healthy lifestyle!',
      badgeVariant: 'default' as const
    },
    medium: {
      color: 'text-warning',
      bgColor: 'bg-gradient-to-r from-warning/10 to-warning/5',
      icon: <Info className="h-6 w-6 text-warning" />,
      message: 'You have moderate risk. Consider lifestyle improvements.',
      badgeVariant: 'secondary' as const
    },
    high: {
      color: 'text-destructive',
      bgColor: 'bg-gradient-to-r from-destructive/10 to-destructive/5',
      icon: <AlertTriangle className="h-6 w-6 text-destructive" />,
      message: 'Higher risk detected. Consult with a healthcare provider.',
      badgeVariant: 'destructive' as const
    }
  };

  const config = riskConfig[riskLevel];
  const diseaseName = diseaseNames[diseaseType as keyof typeof diseaseNames];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendations = () => {
    const general = [
      "Maintain a balanced diet rich in fruits and vegetables",
      "Exercise regularly (at least 150 minutes per week)",
      "Get adequate sleep (7-9 hours per night)",
      "Manage stress through relaxation techniques",
      "Regular health check-ups with your healthcare provider"
    ];

    const specific = {
      diabetes: [
        "Monitor blood sugar levels regularly",
        "Limit refined carbohydrates and sugary foods",
        "Maintain a healthy weight",
        "Stay hydrated"
      ],
      heart: [
        "Monitor blood pressure regularly",
        "Limit sodium intake",
        "Include omega-3 rich foods in your diet",
        "Quit smoking if applicable"
      ],
      stroke: [
        "Control blood pressure",
        "Manage cholesterol levels",
        "Limit alcohol consumption",
        "Take prescribed medications as directed"
      ]
    };

    return [...general, ...specific[diseaseType as keyof typeof specific]];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold">{diseaseName} Risk Assessment</h2>
          <p className="text-muted-foreground">Your personalized risk analysis and recommendations</p>
        </div>
      </div>

      {/* Main Risk Score */}
      <Card className={`${config.bgColor} border-2`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {config.icon}
              <div>
                <CardTitle className="text-2xl">Risk Score: {riskScore}%</CardTitle>
                <CardDescription className={config.color + " font-medium"}>
                  {config.message}
                </CardDescription>
              </div>
            </div>
            <Badge variant={config.badgeVariant} className="text-lg px-4 py-2">
              {riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={riskScore} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>0% (Low Risk)</span>
            <span>100% (High Risk)</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Risk Factors Analysis
            </CardTitle>
            <CardDescription>
              Key factors contributing to your risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{factor.name}</span>
                  <Badge 
                    variant={factor.impact === 'high' ? 'destructive' : factor.impact === 'medium' ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {factor.impact} impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Current value: <span className={getImpactColor(factor.impact)}>{factor.value}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {factor.recommendation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recommendations
            </CardTitle>
            <CardDescription>
              Lifestyle changes to reduce your risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {getRecommendations().map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Important Disclaimer</p>
              <p>
                This risk assessment is for educational purposes only and should not replace professional medical advice. 
                Please consult with a qualified healthcare provider for proper diagnosis and treatment recommendations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={onRestart} className="flex-1">
          Try Another Assessment
        </Button>
        <Button variant="outline" onClick={() => window.print()} className="flex-1">
          Save Results
        </Button>
      </div>
    </div>
  );
}