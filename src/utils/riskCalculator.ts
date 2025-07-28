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

interface RiskFactor {
  name: string;
  impact: 'high' | 'medium' | 'low';
  value: string;
  recommendation: string;
}

interface RiskAssessment {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: RiskFactor[];
}

export function calculateBMI(height: number, weight: number): number {
  return weight / ((height / 100) ** 2);
}

export function calculateDiabetesRisk(data: HealthData): RiskAssessment {
  let riskScore = 0;
  const riskFactors: RiskFactor[] = [];
  
  const age = parseInt(data.age);
  const height = parseInt(data.height);
  const weight = parseInt(data.weight);
  const bmi = calculateBMI(height, weight);
  
  // Age factor
  if (age >= 45) {
    riskScore += 15;
    riskFactors.push({
      name: 'Age',
      impact: age >= 65 ? 'high' : 'medium',
      value: `${age} years`,
      recommendation: 'Regular health monitoring becomes more important with age'
    });
  }
  
  // BMI factor
  if (bmi >= 25) {
    const impact = bmi >= 30 ? 'high' : 'medium';
    riskScore += bmi >= 30 ? 20 : 10;
    riskFactors.push({
      name: 'Body Mass Index',
      impact,
      value: `${bmi.toFixed(1)} kg/m²`,
      recommendation: 'Maintain a healthy weight through diet and exercise'
    });
  }
  
  // Blood pressure
  const systolic = parseInt(data.bloodPressureSystolic);
  const diastolic = parseInt(data.bloodPressureDiastolic);
  
  if (systolic >= 140 || diastolic >= 90) {
    riskScore += 15;
    riskFactors.push({
      name: 'Blood Pressure',
      impact: 'high',
      value: `${systolic}/${diastolic} mmHg`,
      recommendation: 'Monitor blood pressure regularly and consider medication if needed'
    });
  } else if (systolic >= 130 || diastolic >= 80) {
    riskScore += 8;
    riskFactors.push({
      name: 'Blood Pressure',
      impact: 'medium',
      value: `${systolic}/${diastolic} mmHg`,
      recommendation: 'Lifestyle changes to reduce blood pressure'
    });
  }
  
  // Physical activity
  if (data.physicalActivity === 'low') {
    riskScore += 12;
    riskFactors.push({
      name: 'Physical Activity',
      impact: 'medium',
      value: 'Low activity level',
      recommendation: 'Increase physical activity to at least 150 minutes per week'
    });
  }
  
  // Family history
  if (data.familyHistory === 'strong') {
    riskScore += 18;
    riskFactors.push({
      name: 'Family History',
      impact: 'high',
      value: 'Strong family history',
      recommendation: 'Regular screening due to genetic predisposition'
    });
  } else if (data.familyHistory === 'some') {
    riskScore += 8;
    riskFactors.push({
      name: 'Family History',
      impact: 'medium',
      value: 'Some family history',
      recommendation: 'Monitor health markers regularly'
    });
  }
  
  // Gender factor (men have slightly higher risk)
  if (data.gender === 'male') {
    riskScore += 5;
  }
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  if (riskScore < 20) {
    riskLevel = 'low';
  } else if (riskScore < 40) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }
  
  // Cap at 100%
  riskScore = Math.min(riskScore, 100);
  
  return { riskScore, riskLevel, riskFactors };
}

export function calculateHeartDiseaseRisk(data: HealthData): RiskAssessment {
  let riskScore = 0;
  const riskFactors: RiskFactor[] = [];
  
  const age = parseInt(data.age);
  const height = parseInt(data.height);
  const weight = parseInt(data.weight);
  const bmi = calculateBMI(height, weight);
  const cholesterol = parseInt(data.cholesterol);
  const heartRate = parseInt(data.heartRate || '70');
  
  // Age factor (higher impact for heart disease)
  if (age >= 55) {
    riskScore += 20;
    riskFactors.push({
      name: 'Age',
      impact: age >= 70 ? 'high' : 'medium',
      value: `${age} years`,
      recommendation: 'Regular cardiovascular monitoring recommended'
    });
  }
  
  // Gender factor (men have higher risk, especially when younger)
  if (data.gender === 'male') {
    riskScore += age < 55 ? 10 : 5;
  }
  
  // Cholesterol
  if (cholesterol >= 240) {
    riskScore += 15;
    riskFactors.push({
      name: 'Total Cholesterol',
      impact: 'high',
      value: `${cholesterol} mg/dL`,
      recommendation: 'Dietary changes and possible medication to lower cholesterol'
    });
  } else if (cholesterol >= 200) {
    riskScore += 8;
    riskFactors.push({
      name: 'Total Cholesterol',
      impact: 'medium',
      value: `${cholesterol} mg/dL`,
      recommendation: 'Monitor cholesterol levels and consider dietary changes'
    });
  }
  
  // Blood pressure
  const systolic = parseInt(data.bloodPressureSystolic);
  const diastolic = parseInt(data.bloodPressureDiastolic);
  
  if (systolic >= 140 || diastolic >= 90) {
    riskScore += 18;
    riskFactors.push({
      name: 'Blood Pressure',
      impact: 'high',
      value: `${systolic}/${diastolic} mmHg`,
      recommendation: 'Blood pressure management is crucial for heart health'
    });
  }
  
  // Smoking
  if (data.smokingStatus === 'current') {
    riskScore += 20;
    riskFactors.push({
      name: 'Smoking Status',
      impact: 'high',
      value: 'Current smoker',
      recommendation: 'Quitting smoking is the single best thing you can do for your heart'
    });
  } else if (data.smokingStatus === 'former') {
    riskScore += 5;
    riskFactors.push({
      name: 'Smoking History',
      impact: 'low',
      value: 'Former smoker',
      recommendation: 'Continue avoiding tobacco products'
    });
  }
  
  // BMI
  if (bmi >= 30) {
    riskScore += 12;
    riskFactors.push({
      name: 'Body Mass Index',
      impact: 'medium',
      value: `${bmi.toFixed(1)} kg/m²`,
      recommendation: 'Weight management can significantly reduce heart disease risk'
    });
  }
  
  // Heart rate
  if (heartRate > 100) {
    riskScore += 8;
    riskFactors.push({
      name: 'Resting Heart Rate',
      impact: 'medium',
      value: `${heartRate} bpm`,
      recommendation: 'High resting heart rate may indicate fitness issues'
    });
  }
  
  // Physical activity
  if (data.physicalActivity === 'low') {
    riskScore += 15;
    riskFactors.push({
      name: 'Physical Activity',
      impact: 'medium',
      value: 'Low activity level',
      recommendation: 'Regular cardio exercise is essential for heart health'
    });
  }
  
  // Family history
  if (data.familyHistory === 'strong') {
    riskScore += 15;
    riskFactors.push({
      name: 'Family History',
      impact: 'high',
      value: 'Strong family history',
      recommendation: 'Genetic factors require more aggressive prevention'
    });
  }
  
  let riskLevel: 'low' | 'medium' | 'high';
  if (riskScore < 25) {
    riskLevel = 'low';
  } else if (riskScore < 50) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }
  
  riskScore = Math.min(riskScore, 100);
  
  return { riskScore, riskLevel, riskFactors };
}

export function calculateStrokeRisk(data: HealthData): RiskAssessment {
  let riskScore = 0;
  const riskFactors: RiskFactor[] = [];
  
  const age = parseInt(data.age);
  const height = parseInt(data.height);
  const weight = parseInt(data.weight);
  const bmi = calculateBMI(height, weight);
  
  // Age factor (very significant for stroke)
  if (age >= 65) {
    riskScore += 25;
    riskFactors.push({
      name: 'Age',
      impact: 'high',
      value: `${age} years`,
      recommendation: 'Age is a major stroke risk factor - regular monitoring essential'
    });
  } else if (age >= 55) {
    riskScore += 15;
    riskFactors.push({
      name: 'Age',
      impact: 'medium',
      value: `${age} years`,
      recommendation: 'Stroke risk increases with age'
    });
  }
  
  // Blood pressure (most important modifiable risk factor)
  const systolic = parseInt(data.bloodPressureSystolic);
  const diastolic = parseInt(data.bloodPressureDiastolic);
  
  if (systolic >= 140 || diastolic >= 90) {
    riskScore += 22;
    riskFactors.push({
      name: 'Blood Pressure',
      impact: 'high',
      value: `${systolic}/${diastolic} mmHg`,
      recommendation: 'High blood pressure is the #1 controllable stroke risk factor'
    });
  }
  
  // Diabetes
  if (data.diabetes === 'diabetes') {
    riskScore += 18;
    riskFactors.push({
      name: 'Diabetes',
      impact: 'high',
      value: 'Type 2 diabetes',
      recommendation: 'Diabetes management is crucial for stroke prevention'
    });
  } else if (data.diabetes === 'prediabetes') {
    riskScore += 8;
    riskFactors.push({
      name: 'Prediabetes',
      impact: 'medium',
      value: 'Prediabetes',
      recommendation: 'Prevent progression to diabetes through lifestyle changes'
    });
  }
  
  // Smoking
  if (data.smokingStatus === 'current') {
    riskScore += 18;
    riskFactors.push({
      name: 'Smoking Status',
      impact: 'high',
      value: 'Current smoker',
      recommendation: 'Smoking doubles stroke risk - quitting has immediate benefits'
    });
  }
  
  // Family history
  if (data.familyHistory === 'strong') {
    riskScore += 12;
    riskFactors.push({
      name: 'Family History',
      impact: 'medium',
      value: 'Strong family history',
      recommendation: 'Genetic predisposition requires preventive measures'
    });
  }
  
  // BMI
  if (bmi >= 30) {
    riskScore += 10;
    riskFactors.push({
      name: 'Body Mass Index',
      impact: 'medium',
      value: `${bmi.toFixed(1)} kg/m²`,
      recommendation: 'Obesity increases stroke risk through multiple mechanisms'
    });
  }
  
  let riskLevel: 'low' | 'medium' | 'high';
  if (riskScore < 20) {
    riskLevel = 'low';
  } else if (riskScore < 45) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }
  
  riskScore = Math.min(riskScore, 100);
  
  return { riskScore, riskLevel, riskFactors };
}

export function calculateRisk(diseaseType: string, data: HealthData): RiskAssessment {
  switch (diseaseType) {
    case 'diabetes':
      return calculateDiabetesRisk(data);
    case 'heart':
      return calculateHeartDiseaseRisk(data);
    case 'stroke':
      return calculateStrokeRisk(data);
    default:
      throw new Error('Unknown disease type');
  }
}