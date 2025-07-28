import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Calculator } from "lucide-react";

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

interface HealthFormProps {
  diseaseType: string;
  onBack: () => void;
  onSubmit: (data: HealthData) => void;
}

export function HealthForm({ diseaseType, onBack, onSubmit }: HealthFormProps) {
  const [formData, setFormData] = useState<HealthData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    cholesterol: '',
    smokingStatus: '',
    physicalActivity: '',
    familyHistory: '',
    diabetes: '',
    heartRate: ''
  });

  const diseaseConfig = {
    diabetes: {
      title: 'Diabetes Risk Assessment',
      description: 'Please provide your health information for diabetes risk prediction',
      fields: ['age', 'gender', 'height', 'weight', 'bloodPressure', 'familyHistory', 'physicalActivity']
    },
    heart: {
      title: 'Heart Disease Risk Assessment',
      description: 'Please provide your health information for cardiovascular risk prediction',
      fields: ['age', 'gender', 'height', 'weight', 'bloodPressure', 'cholesterol', 'smokingStatus', 'physicalActivity', 'familyHistory', 'heartRate']
    },
    stroke: {
      title: 'Stroke Risk Assessment',
      description: 'Please provide your health information for stroke risk prediction',
      fields: ['age', 'gender', 'height', 'weight', 'bloodPressure', 'smokingStatus', 'diabetes', 'familyHistory']
    }
  };

  const config = diseaseConfig[diseaseType as keyof typeof diseaseConfig];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof HealthData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold">{config.title}</h2>
          <p className="text-muted-foreground">{config.description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Health Information
          </CardTitle>
          <CardDescription>
            All information is processed locally and not stored anywhere
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Basic Info */}
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="120"
                  value={formData.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="30"
                  max="300"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  required
                />
              </div>

              {/* Blood Pressure */}
              {config.fields.includes('bloodPressure') && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
                    <Input
                      id="systolic"
                      type="number"
                      min="80"
                      max="200"
                      value={formData.bloodPressureSystolic}
                      onChange={(e) => updateField('bloodPressureSystolic', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
                    <Input
                      id="diastolic"
                      type="number"
                      min="40"
                      max="120"
                      value={formData.bloodPressureDiastolic}
                      onChange={(e) => updateField('bloodPressureDiastolic', e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* Cholesterol */}
              {config.fields.includes('cholesterol') && (
                <div className="space-y-2">
                  <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
                  <Input
                    id="cholesterol"
                    type="number"
                    min="100"
                    max="400"
                    value={formData.cholesterol}
                    onChange={(e) => updateField('cholesterol', e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Heart Rate */}
              {config.fields.includes('heartRate') && (
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Resting Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    min="40"
                    max="120"
                    value={formData.heartRate}
                    onChange={(e) => updateField('heartRate', e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            {/* Lifestyle Factors */}
            <div className="space-y-4">
              {config.fields.includes('smokingStatus') && (
                <div className="space-y-3">
                  <Label>Smoking Status</Label>
                  <RadioGroup
                    value={formData.smokingStatus}
                    onValueChange={(value) => updateField('smokingStatus', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="never" />
                      <Label htmlFor="never">Never smoked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="former" id="former" />
                      <Label htmlFor="former">Former smoker</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="current" id="current" />
                      <Label htmlFor="current">Current smoker</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {config.fields.includes('physicalActivity') && (
                <div className="space-y-3">
                  <Label>Physical Activity Level</Label>
                  <RadioGroup
                    value={formData.physicalActivity}
                    onValueChange={(value) => updateField('physicalActivity', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low (less than 30 min/week)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate (30-150 min/week)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High (more than 150 min/week)</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {config.fields.includes('familyHistory') && (
                <div className="space-y-3">
                  <Label>Family History</Label>
                  <RadioGroup
                    value={formData.familyHistory}
                    onValueChange={(value) => updateField('familyHistory', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No family history</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="some" id="some" />
                      <Label htmlFor="some">Some family history</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="strong" id="strong" />
                      <Label htmlFor="strong">Strong family history</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {config.fields.includes('diabetes') && (
                <div className="space-y-3">
                  <Label>Diabetes Status</Label>
                  <RadioGroup
                    value={formData.diabetes}
                    onValueChange={(value) => updateField('diabetes', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="no-diabetes" />
                      <Label htmlFor="no-diabetes">No diabetes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prediabetes" id="prediabetes" />
                      <Label htmlFor="prediabetes">Prediabetes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="diabetes" id="has-diabetes" />
                      <Label htmlFor="has-diabetes">Type 2 diabetes</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Calculate Risk Assessment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}