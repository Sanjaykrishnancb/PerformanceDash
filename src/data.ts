import { CheckIn } from './types';
import { subDays, format } from 'date-fns';

const generateMockData = (): CheckIn[] => {
  const data: CheckIn[] = [];
  const today = new Date();
  
  for (let i = 14; i >= 0; i--) {
    const date = subDays(today, i);
    
    data.push({
      id: `mock-${i}`,
      date: format(date, 'yyyy-MM-dd'),
      weight: 80 + (Math.random() * 2 - 1),
      rhr: Math.floor(55 + Math.random() * 10),
      bloodGlucose: Math.floor(90 + Math.random() * 15),
      waterIntake: 2 + Math.random() * 2,
      caffeine: Math.floor(100 + Math.random() * 200),
      strengthSession: Math.random() > 0.4,
      sessionIntensity: Math.floor(5 + Math.random() * 5),
      cardioPerformed: Math.random() > 0.5,
      stepCount: Math.floor(6000 + Math.random() * 6000),
      morningReadiness: Math.floor(4 + Math.random() * 6),
      energyLevels: Math.floor(4 + Math.random() * 6),
      hunger: Math.floor(3 + Math.random() * 6),
      stress: Math.floor(2 + Math.random() * 7),
      sickness: Math.random() > 0.9,
      digestionNotes: Math.random() > 0.8 ? 'Bloating' : 'None',
      nutritionAdherence: Math.random() > 0.3,
      bedtime: '22:30',
      wakeUpTime: '06:30',
      sleepDuration: 7 + Math.random() * 1.5,
      sleepQuality: Math.floor(4 + Math.random() * 6)
    });
  }
  
  // Explicitly add an alert trigger case for the most recent day to show off the UI
  data[data.length - 1].stress = 9;
  data[data.length - 1].morningReadiness = 3;
  data[data.length - 1].sleepQuality = 4;
  
  return data;
};

export const defaultMockData = generateMockData();
