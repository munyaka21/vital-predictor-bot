import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Droplets, Brain } from "lucide-react";

interface Disease {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const diseases: Disease[] = [
  {
    id: 'diabetes',
    name: 'Diabetes Risk',
    description: 'Predict Type 2 diabetes risk based on lifestyle and health factors',
    icon: <Droplets className="h-8 w-8" />,
    color: 'text-blue-600'
  },
  {
    id: 'heart',
    name: 'Heart Disease Risk',
    description: 'Assess cardiovascular disease risk using health metrics',
    icon: <Heart className="h-8 w-8" />,
    color: 'text-red-500'
  },
  {
    id: 'stroke',
    name: 'Stroke Risk',
    description: 'Evaluate stroke probability based on medical indicators',
    icon: <Brain className="h-8 w-8" />,
    color: 'text-purple-600'
  }
];

interface DiseaseSelectorProps {
  onSelectDisease: (diseaseId: string) => void;
}

export function DiseaseSelector({ onSelectDisease }: DiseaseSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Choose Disease to Analyze
        </h2>
        <p className="text-muted-foreground mt-2">
          Select a condition to assess your risk factors and get personalized recommendations
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {diseases.map((disease) => (
          <Card 
            key={disease.id} 
            className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/20"
          >
            <CardHeader className="text-center">
              <div className={`mx-auto p-3 rounded-full bg-gradient-to-br from-background to-muted ${disease.color}`}>
                {disease.icon}
              </div>
              <CardTitle className="text-xl">{disease.name}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {disease.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => onSelectDisease(disease.id)}
                className="w-full"
                variant="outline"
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}