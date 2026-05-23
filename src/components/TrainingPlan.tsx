import React from 'react';
import { Dumbbell, Info } from 'lucide-react';

const generalNotes = [
  "ALL SETS LISTED ARE WORKING SETS - USE warm up sets with progressive loads when required",
  "TAKE AS MUCH REST AS YOU NEED TO RECOVER",
  "Maintain a log book and aim to beat numbers EVERY SESSION",
  "ABS & PRACTICE CORE CONTROL AND VACUUM FASTED DAILY",
  "RUN THIS SPLIT 2 DAYS ON / 1 DAY OFF / 2 DAYS ON / 2 DAYS OFF"
];

const workouts = [
  {
    name: "UPPER A",
    exercises: [
      { bodyPart: "CHEST", exercise: "MACHINE", sets: 2, reps: "5-8", notes: "" },
      { bodyPart: "CHEST", exercise: "PEC DECK", sets: 1, reps: "6-10", notes: "" },
      { bodyPart: "BACK", exercise: "LAT PULLDOWN", sets: 2, reps: "6-10", notes: "PROBABLY HOLD AT THE VERY EDGE" },
      { bodyPart: "BACK", exercise: "CHEST SUPPORTED UPPER BACK ROW", sets: 2, reps: "6-10", notes: "PRONATED GRIP" },
      { bodyPart: "SHOULDERS", exercise: "CABLE LATERAL RAISE", sets: 2, reps: "8-10", notes: "" },
      { bodyPart: "BICEPS", exercise: "BAYESIAN CURLS", sets: 2, reps: "8-10", notes: "" },
      { bodyPart: "TRICEPS", exercise: "SINGLE ARM TRICEP EXTENSION", sets: 2, reps: "8-10", notes: "" },
    ]
  },
  {
    name: "LOWER A",
    exercises: [
      { bodyPart: "GLUTES/HAMS", exercise: "ADDUCTOR", sets: 2, reps: "8-10", notes: "" },
      { bodyPart: "GLUTES/HAMS", exercise: "HAMSTRING CURL OF CHOICE", sets: 2, reps: "6-10", notes: "" },
      { bodyPart: "QUADS", exercise: "HACK SQUAT", sets: 2, reps: "6-8", notes: "" },
      { bodyPart: "QUADS", exercise: "LEG EXTENSIONS", sets: 3, reps: "8-10", notes: "" },
      { bodyPart: "CALVES", exercise: "STANDING CALF RAISE", sets: 3, reps: "6-10", notes: "DONT FOCUS ON CONTRACTION, SPEND A SECOND ON THE STRETCH AND DO REPS ONLY TILL 3/4TH OF PEAK CONTRACTION" },
    ]
  },
  {
    name: "UPPER B",
    exercises: [
      { bodyPart: "CHEST", exercise: "INCLINE BENCH PRESS SMITH MACHINE", sets: 3, reps: "5-6", notes: "" },
      { bodyPart: "BACK", exercise: "T-BAR ROW", sets: 2, reps: "6-10", notes: "PRONATED GRIP" },
      { bodyPart: "BACK", exercise: "CABLE PULLOVER WITH V HANDLE", sets: 3, reps: "8-10", notes: "" },
      { bodyPart: "SHOULDERS", exercise: "SEATED LATERAL RAISE", sets: 2, reps: "8-10", notes: "" },
      { bodyPart: "BICEPS", exercise: "PREACHER CURL", sets: 2, reps: "8-10", notes: "" },
      { bodyPart: "TRICEPS", exercise: "DIPS", sets: 2, reps: "6-8", notes: "" },
    ]
  },
  {
    name: "LOWER B",
    exercises: [
      { bodyPart: "GLUTES/HAMS", exercise: "HAMSTRING CURL OF CHOICE", sets: 2, reps: "8-10", notes: "" },
      { bodyPart: "GLUTES/HAMS/ERECTORS", exercise: "DEADLIFT", sets: 2, reps: "6-8", notes: "SLDL PREFERABLY" },
      { bodyPart: "QUADS", exercise: "LEG PRESS MACHINE", sets: 3, reps: "6-10", notes: "" },
      { bodyPart: "GLUTES/HAMS", exercise: "45 DEGREE HYPEREXTENSION", sets: 2, reps: "8-10", notes: "USE A BAND TO ACCOMMODATE RESISTANCE" },
      { bodyPart: "CALVES", exercise: "STANDING CALF RAISE", sets: 3, reps: "6-10", notes: "DONT FOCUS ON CONTRACTION, SPEND A SECOND ON THE STRETCH AND DO REPS ONLY TILL 3/4TH OF PEAK CONTRACTION" },
    ]
  }
];

export function TrainingPlan() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-slate-200 bg-slate-50">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Training Plan</h2>
            <p className="text-sm text-slate-500">Current Phase Split: 2 On / 1 Off / 2 On / 2 Off</p>
          </div>
        </div>

        <div className="p-6 bg-yellow-50 border-b border-slate-200">
          <div className="flex gap-3 mb-3">
            <Info className="w-5 h-5 text-yellow-600 shrink-0" />
            <h3 className="font-bold text-yellow-800">General Rules</h3>
          </div>
          <ul className="space-y-2 pl-8">
            {generalNotes.map((note, idx) => (
              <li key={idx} className="text-sm text-yellow-800 font-medium list-disc">
                {note}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 space-y-8">
          {workouts.map((workout, index) => (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 py-3 px-4">
                <h3 className="text-center font-black tracking-wider text-white">
                  {workout.name}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-r border-slate-200 w-1/6">Body Part</th>
                      <th className="px-4 py-3 font-semibold border-r border-slate-200 w-1/3">Exercise</th>
                      <th className="px-4 py-3 font-semibold border-r border-slate-200 text-center w-16">Sets</th>
                      <th className="px-4 py-3 font-semibold border-r border-slate-200 text-center w-24">Rep Range</th>
                      <th className="px-4 py-3 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {workout.exercises.map((ex, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-700 border-r border-slate-100 text-xs">
                          {ex.bodyPart}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-100">
                          {ex.exercise}
                        </td>
                        <td className="px-4 py-3 font-black text-center text-indigo-600 border-r border-slate-100">
                          {ex.sets}
                        </td>
                        <td className="px-4 py-3 font-bold text-center text-slate-700 border-r border-slate-100">
                          {ex.reps}
                        </td>
                        <td className="px-4 py-3 text-xs font-medium text-slate-500 uppercase">
                          {ex.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
