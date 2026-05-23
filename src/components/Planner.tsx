import React from 'react';
import { cn } from '../utils';

// Mock data reflecting the provided spreadsheet structure
const plannerData = [
  { id: '1', month: 'Jan', isMonthStart: true, monthSpan: 4, week: 'Wk1', weight: '', phase: 'Priming Phase', isPhaseStart: true, phaseSpan: 4, phaseColor: 'bg-blue-500', nutrition: '', offPlan: '', cardio: '', cardioColor: '', steps: '', load: '', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
  { id: '2', month: 'Jan', isMonthStart: false, week: 'Wk2', weight: '', phase: 'Priming Phase', isPhaseStart: false, phaseColor: 'bg-blue-500', nutrition: '', offPlan: '', cardio: '', cardioColor: '', steps: '', load: '', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
  { id: '3', month: 'Jan', isMonthStart: false, week: 'Wk3', weight: '', phase: 'Priming Phase', isPhaseStart: false, phaseColor: 'bg-blue-500', nutrition: 'Sheets', offPlan: 'N', cardio: '20 minutes 7 times a week @130 bpm', cardioColor: '', steps: '8,000', load: '300mg Test E', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
  { id: '4', month: 'Jan', isMonthStart: false, week: 'Wk4', weight: '72.3', phase: 'Priming Phase', isPhaseStart: false, phaseColor: 'bg-blue-500', nutrition: 'Sheets', offPlan: 'N', cardio: '20 minutes 7 times a week @130 bpm', cardioColor: '', steps: '8,000', load: '300mg Test E', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
  { id: '5', month: 'Feb', isMonthStart: true, monthSpan: 4, week: 'Wk1', weight: '72.2', phase: 'Fat Loss Phase', isPhaseStart: true, phaseSpan: 4, phaseColor: 'bg-red-600', nutrition: 'Sheets', offPlan: 'N', cardio: '20 minutes 7 times a week @130 bpm', cardioColor: '', steps: '8,000', load: '300mg Test E', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
  { id: '6', month: 'Feb', isMonthStart: false, week: 'Wk2', weight: '71.3', phase: 'Fat Loss Phase', isPhaseStart: false, phaseColor: 'bg-red-600', nutrition: 'Sheets', offPlan: 'N', cardio: '30 minutes 7 times a week @130 bpm', cardioColor: 'bg-orange-500 text-white font-semibold', steps: '8,000', load: '300mg Test E', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
  { id: '7', month: 'Feb', isMonthStart: false, week: 'Wk3', weight: '70.8', phase: 'Fat Loss Phase', isPhaseStart: false, phaseColor: 'bg-red-600', nutrition: 'Sheets', offPlan: 'N', cardio: '30 minutes 7 times a week @130 bpm', cardioColor: '', steps: '8,000', load: '300mg Test E', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
  { id: '8', month: 'Feb', isMonthStart: false, week: 'Wk4', weight: '68.8', phase: 'Fat Loss Phase', isPhaseStart: false, phaseColor: 'bg-red-600', nutrition: 'Sheets', offPlan: 'N', cardio: '30 minutes 7 times a week @130 bpm', cardioColor: '', steps: '8,000', load: '300mg Test E', hgh: '', basal: '', rapid: '', lipo: '', thyroid: '', e2: '', ancillaries: '' },
];

export function Planner() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col w-full h-[600px]">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
        <h2 className="text-lg font-bold text-slate-800">Macrocycle Planner</h2>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-200 px-2 py-1 rounded">Read Only</span>
      </div>
      
      <div className="overflow-x-auto overflow-y-auto flex-1">
        <table className="w-full text-sm text-left border-collapse min-w-[1200px]">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100 sticky top-0 z-10 shadow-sm border-b border-slate-200">
            <tr>
              <th className="px-3 py-3 font-semibold border-r border-slate-200 text-center w-12">Month</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200 w-12">Wk</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Weight</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200 text-center">Phase Goal</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Nutrition</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Off Plan (Y/N)</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200 min-w-[200px]">Cardio</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Steps</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Total Androgen Load</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">HGH</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Basal Insulin</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Rapid Insulin</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Lipolytics</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">Thyroid</th>
              <th className="px-3 py-3 font-semibold border-r border-slate-200">E2 Mgmt</th>
              <th className="px-3 py-3 font-semibold">Ancillaries</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {plannerData.map((row, index) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {row.isMonthStart && (
                  <td 
                    rowSpan={row.monthSpan} 
                    className="border-r border-slate-200 bg-slate-900 text-white font-bold text-center px-2 relative"
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
                      {row.month}
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700 font-medium whitespace-nowrap">{row.week}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-bold">{row.weight}</td>
                {row.isPhaseStart && (
                  <td 
                    rowSpan={row.phaseSpan} 
                    className={cn("border-r border-slate-200 text-white font-bold text-center px-3 tracking-wide", row.phaseColor)}
                  >
                    {row.phase}
                  </td>
                )}
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.nutrition}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700 text-center">{row.offPlan}</td>
                <td className={cn("px-3 py-2 border-r border-slate-200 text-slate-700", row.cardioColor)}>{row.cardio}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.steps}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.load}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.hgh}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.basal}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.rapid}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.lipo}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.thyroid}</td>
                <td className="px-3 py-2 border-r border-slate-200 text-slate-700">{row.e2}</td>
                <td className="px-3 py-2 text-slate-700">{row.ancillaries}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
