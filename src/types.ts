export interface CheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  // Vitals
  weight: number;
  rhr: number;
  bloodGlucose: number;
  // Fluids
  waterIntake: number;
  caffeine: number;
  // Training
  strengthSession: boolean;
  sessionIntensity: number; // 0-10
  cardioPerformed: boolean;
  stepCount: number;
  // Biofeedback
  morningReadiness: number; // 1-10
  energyLevels: number; // 1-10
  hunger: number; // 1-10
  stress: number; // 1-10
  sickness: boolean;
  // Digestion
  digestionNotes: string;
  nutritionAdherence: boolean;
  // Sleep
  bedtime: string;
  wakeUpTime: string;
  sleepDuration: number;
  sleepQuality: number; // 1-10
}
