import { useState } from "react";
import { DiseaseSelector } from "@/components/health/DiseaseSelector";
import { HealthForm } from "@/components/health/HealthForm";
import { RiskResults } from "@/components/health/RiskResults";
import { calculateRisk } from "@/utils/riskCalculator";
import { Activity, Shield, TrendingUp } from "lucide-react";
import heroImage from "@/assets/health-hero.jpg";

interface HealthData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  cholesterol: string;
  smokingStatus: string;
  physicalActivity: string;
  familyHistory: string;
  diabetes?: string;
  heartRate?: string;
}

type Step = 'selection' | 'form' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [selectedDisease, setSelectedDisease] = useState<string>('');
  const [riskAssessment, setRiskAssessment] = useState<any>(null);

  const handleDiseaseSelect = (diseaseId: string) => {
    setSelectedDisease(diseaseId);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: HealthData) => {
    const assessment = calculateRisk(selectedDisease, data);
    setRiskAssessment(assessment);
    setCurrentStep('results');
  };

  const handleBack = () => {
    if (currentStep === 'form') {
      setCurrentStep('selection');
    } else if (currentStep === 'results') {
      setCurrentStep('form');
    }
  };

  const handleRestart = () => {
    setCurrentStep('selection');
    setSelectedDisease('');
    setRiskAssessment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  HealthPredict AI
                </h1>
                <p className="text-sm text-muted-foreground">Disease Risk Analytics Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>AI-Powered Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Only show on selection step */}
      {currentStep === 'selection' && (
        <section 
          className="relative py-20 px-4 text-center bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})`,
          }}
        >
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-white">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Predict Your Health Risks with 
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"> AI Analytics</span>
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                Advanced machine learning algorithms analyze your health data to provide personalized risk assessments
                for diabetes, heart disease, and stroke prevention.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Evidence-Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span>Actionable Insights</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'selection' && (
          <DiseaseSelector onSelectDisease={handleDiseaseSelect} />
        )}
        
        {currentStep === 'form' && (
          <HealthForm
            diseaseType={selectedDisease}
            onBack={handleBack}
            onSubmit={handleFormSubmit}
          />
        )}
        
        {currentStep === 'results' && riskAssessment && (
          <RiskResults
            diseaseType={selectedDisease}
            riskScore={riskAssessment.riskScore}
            riskLevel={riskAssessment.riskLevel}
            riskFactors={riskAssessment.riskFactors}
            onBack={handleBack}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-4">
            This health risk assessment tool is for educational purposes only. 
            Always consult with qualified healthcare professionals for medical advice.
          </p>
          <p className="text-sm">
            © 2024 HealthPredict AI. Built with advanced machine learning for better health insights.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
