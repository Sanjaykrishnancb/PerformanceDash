import React, { useState } from 'react';
import { CheckIn } from '../types';
import { format } from 'date-fns';
import { Save, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils';

interface CheckInFormProps {
  onSubmit: (data: Omit<CheckIn, 'id'>) => void;
  initialData?: CheckIn;
  selectedDate: string;
}

export function CheckInForm({ onSubmit, initialData, selectedDate }: CheckInFormProps) {
  const [submitted, setSubmitted] = useState(false);
  
  // States for all fields
  const [weight, setWeight] = useState(initialData?.weight.toString() ?? '80.0');
  const [rhr, setRhr] = useState(initialData?.rhr.toString() ?? '60');
  const [bloodGlucose, setBloodGlucose] = useState(initialData?.bloodGlucose.toString() ?? '95');
  const [waterIntake, setWaterIntake] = useState(initialData?.waterIntake.toString() ?? '2.5');
  const [caffeine, setCaffeine] = useState(initialData?.caffeine.toString() ?? '150');
  const [strengthSession, setStrengthSession] = useState(initialData?.strengthSession ?? false);
  const [sessionIntensity, setSessionIntensity] = useState(initialData?.sessionIntensity.toString() ?? '5');
  const [cardioPerformed, setCardioPerformed] = useState(initialData?.cardioPerformed ?? false);
  const [stepCount, setStepCount] = useState(initialData?.stepCount.toString() ?? '8000');
  const [morningReadiness, setMorningReadiness] = useState(initialData?.morningReadiness.toString() ?? '7');
  const [energyLevels, setEnergyLevels] = useState(initialData?.energyLevels.toString() ?? '7');
  const [hunger, setHunger] = useState(initialData?.hunger.toString() ?? '5');
  const [stress, setStress] = useState(initialData?.stress.toString() ?? '4');
  const [sickness, setSickness] = useState(initialData?.sickness ?? false);
  const [digestionNotes, setDigestionNotes] = useState(initialData?.digestionNotes ?? 'None');
  const [nutritionAdherence, setNutritionAdherence] = useState(initialData?.nutritionAdherence ?? true);
  const [bedtime, setBedtime] = useState(initialData?.bedtime ?? '22:00');
  const [wakeUpTime, setWakeUpTime] = useState(initialData?.wakeUpTime ?? '06:00');
  const [sleepDuration, setSleepDuration] = useState(initialData?.sleepDuration.toString() ?? '8');
  const [sleepQuality, setSleepQuality] = useState(initialData?.sleepQuality.toString() ?? '7');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: selectedDate,
      weight: parseFloat(weight),
      rhr: parseInt(rhr, 10),
      bloodGlucose: parseInt(bloodGlucose, 10),
      waterIntake: parseFloat(waterIntake),
      caffeine: parseInt(caffeine, 10),
      strengthSession,
      sessionIntensity: parseInt(sessionIntensity, 10),
      cardioPerformed,
      stepCount: parseInt(stepCount, 10),
      morningReadiness: parseInt(morningReadiness, 10),
      energyLevels: parseInt(energyLevels, 10),
      hunger: parseInt(hunger, 10),
      stress: parseInt(stress, 10),
      sickness,
      digestionNotes,
      nutritionAdherence,
      bedtime,
      wakeUpTime,
      sleepDuration: parseFloat(sleepDuration),
      sleepQuality: parseInt(sleepQuality, 10),
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-bold text-slate-800 mb-4 mt-8 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
      {children}
    </h3>
  );

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-medium text-slate-500 mb-1">{children}</label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className={cn(
        "w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-800",
        "focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      )}
    />
  );

  const Range = ({
    label, value, setValue, min = "1", max = "10"
  }: {
    label: string, value: string, setValue: (s: string) => void, min?: string, max?: string
  }) => (
    <div className="mb-4 space-y-1">
      <div className="flex justify-between items-end">
        <label className="text-xs font-medium text-slate-500">{label}</label>
        <span className="text-xs font-bold text-indigo-600">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );

  const Toggle = ({ label, checked, setChecked }: { label: string, checked: boolean, setChecked: (b: boolean) => void }) => (
    <div className="flex items-center justify-between mb-4 p-2 bg-indigo-50 rounded border border-indigo-100">
      <span className="font-medium text-indigo-900 text-xs">{label}</span>
      <button
        type="button"
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-indigo-500",
          checked ? "bg-indigo-600" : "bg-slate-300"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-slate-100 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Check-in Complete</h2>
        <p className="text-slate-600">Your daily metrics have been recorded successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Daily Check-in</h2>
          <p className="text-slate-500 text-xs">How are you feeling?</p>
        </div>
        <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{selectedDate}</div>
      </div>

      <SectionTitle>Vitals & Fluids</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><Label>AM Weight (kg)</Label><Input type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} required /></div>
        <div><Label>Resting Heart Rate</Label><Input type="number" value={rhr} onChange={e => setRhr(e.target.value)} required /></div>
        <div><Label>Blood Glucose</Label><Input type="number" value={bloodGlucose} onChange={e => setBloodGlucose(e.target.value)} required /></div>
        <div><Label>Water Intake (L)</Label><Input type="number" step="0.1" value={waterIntake} onChange={e => setWaterIntake(e.target.value)} required /></div>
        <div className="md:col-span-2"><Label>Caffeine Intake (mg)</Label><Input type="number" value={caffeine} onChange={e => setCaffeine(e.target.value)} required /></div>
      </div>

      <SectionTitle>Training</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <Toggle label="Strength Session Done?" checked={strengthSession} setChecked={setStrengthSession} />
        <Toggle label="Cardio Performed?" checked={cardioPerformed} setChecked={setCardioPerformed} />
      </div>
      {(strengthSession || cardioPerformed) && (
        <div className="mt-4">
          <Range label="Session Intensity" value={sessionIntensity} setValue={setSessionIntensity} />
        </div>
      )}
      <div className="mt-2"><Label>Daily Step Count</Label><Input type="number" value={stepCount} onChange={e => setStepCount(e.target.value)} required /></div>

      <SectionTitle>Biofeedback</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Range label="Morning Readiness" value={morningReadiness} setValue={setMorningReadiness} />
        <Range label="Energy Levels" value={energyLevels} setValue={setEnergyLevels} />
        <Range label="Hunger" value={hunger} setValue={setHunger} />
        <Range label="Stress" value={stress} setValue={setStress} />
      </div>
      <div className="mt-2 text-red-600">
        <Toggle label="Feeling Sick?" checked={sickness} setChecked={setSickness} />
      </div>

      <SectionTitle>Digestion</SectionTitle>
      <Toggle label="Nutrition Adherence" checked={nutritionAdherence} setChecked={setNutritionAdherence} />
      <div className="mt-2 text-xs space-y-1">
        <Label>Digestion Notes (e.g. Gas, Bloating)</Label>
        <textarea
          rows={2}
          value={digestionNotes}
          onChange={e => setDigestionNotes(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>

      <SectionTitle>Sleep</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div><Label>Bedtime</Label><Input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)} required /></div>
        <div><Label>Wake-up Time</Label><Input type="time" value={wakeUpTime} onChange={e => setWakeUpTime(e.target.value)} required /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div><Label>Sleep Duration (Hrs)</Label><Input type="number" step="0.5" value={sleepDuration} onChange={e => setSleepDuration(e.target.value)} required /></div>
        <div className="mt-6 md:mt-0"><Range label="Sleep Quality" value={sleepQuality} setValue={setSleepQuality} /></div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg text-sm shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Submit Daily Check-In
        </button>
      </div>
    </form>
  );
}
