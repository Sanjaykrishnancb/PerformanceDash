import React from 'react';
import { Utensils, Info } from 'lucide-react';

const mealPlan = [
  {
    name: 'Meal 1 (Breakfast)',
    items: ['3 whole eggs', 'Oats 80 g', 'Whey 1 scoop']
  },
  {
    name: 'Meal 2',
    items: ['Chicken breast 150 g', 'Cooked basmati rice 150 g', 'Veggies 100 g']
  },
  {
    name: 'Meal 3 (Pre Workout)',
    items: ['Cream of rice 50 g', 'Whey 1 scoop']
  },
  {
    name: 'Meal 4 (Post Workout)',
    items: ['Chicken breast 150 g', 'Cooked basmati rice 200 g', 'Veggies 100 g']
  },
  {
    name: 'Meal 5',
    items: ['4 slices bread', 'Honey 15 g']
  }
];

const macros = [
  { label: 'Protein', value: '145 g' },
  { label: 'Carbohydrates', value: '250 g' },
  { label: 'Fats', value: '50 g' },
  { label: 'Calories Tracker', value: '2160 kcal' },
  { label: 'Base Calories', value: '1800 kcal' }
];

export function Nutrition() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Daily Meal Plan</h2>
            <p className="text-sm text-slate-500">Current Phase Nutrition Guidelines</p>
          </div>
        </div>

        <div className="space-y-6">
          {mealPlan.map((meal, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2">{meal.name}</h3>
              <ul className="space-y-1.5">
                {meal.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-500" />
          Final Daily Macros
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-blue-600 mb-1">Protein</span>
            <span className="text-lg font-black text-slate-800">{macros[0].value}</span>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-amber-600 mb-1">Carbs</span>
            <span className="text-lg font-black text-slate-800">{macros[1].value}</span>
          </div>
          <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-rose-600 mb-1">Fats</span>
            <span className="text-lg font-black text-slate-800">{macros[2].value}</span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-600 mb-1">Calories</span>
            <span className="text-lg font-black text-slate-800">2160</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="font-semibold text-slate-600">Base BMR / Deficit</span>
          <span className="text-slate-800 font-bold">1800 kcal</span>
        </div>
      </div>
    </div>
  );
}
