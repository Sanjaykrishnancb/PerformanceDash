import React, { useMemo } from 'react';
import { CheckIn } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Bar
} from 'recharts';
import { AlertCircle, Activity, Moon, Utensils } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface DashboardProps {
  data: CheckIn[];
}

export function Dashboard({ data }: DashboardProps) {
  // Sort data by date ascending for charts
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  // Alert system logic: Read last entry or check for critical thresholds
  const alerts = useMemo(() => {
    const list: { date: string, type: 'warning' | 'critical', message: string }[] = [];
    
    // Check last 3 days for actionable insights (simulated for prototype)
    const recentData = sortedData.slice(-3);
    recentData.forEach(entry => {
      const displayDate = format(parseISO(entry.date), 'MMM d');
      if (entry.stress > 8) {
        list.push({ date: displayDate, type: 'critical', message: `High stress level (${entry.stress}/10)` });
      }
      if (entry.morningReadiness < 4) {
        list.push({ date: displayDate, type: 'warning', message: `Low morning readiness (${entry.morningReadiness}/10)` });
      }
      if (entry.sickness) {
        list.push({ date: displayDate, type: 'critical', message: 'Reported feeling sick' });
      }
      if (entry.sleepQuality < 5) {
         list.push({ date: displayDate, type: 'warning', message: `Poor sleep quality (${entry.sleepQuality}/10)` });
      }
    });
    
    return list.reverse(); // Newest first
  }, [sortedData]);
  
  // Custom tooltips styling
  const customTooltipStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  const formattedChartData = sortedData.map(d => ({
    ...d,
    displayDate: format(parseISO(d.date), 'MMM d'),
    nutritionScore: d.nutritionAdherence ? 1 : 0
  }));

  return (
    <div className="space-y-6">
      {/* ALERTS SECTION */}
      {alerts.length > 0 && (
        <div className="bg-rose-50 border-l-4 border-rose-500 rounded-r-lg rounded-l-none p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-rose-800">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <h3 className="font-semibold text-sm">Coach Alerts & Attention Required</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {alerts.slice(0, 3).map((alert, i) => (
              <div key={i} className="bg-white border text-sm border-rose-100 rounded p-3 shadow-sm flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">{alert.date}</span>
                <span className="text-slate-800 text-xs font-medium">{alert.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DASHBOARD CHARTS */}
      
      {/* Chart 1: Stress vs Sleep Quality (Correlation) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recovery: Stress vs. Sleep</h3>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
              <YAxis yAxisId="left" domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
              <Line yAxisId="left" type="monotone" name="Stress (1-10)" dataKey="stress" stroke="#fbbf24" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line yAxisId="left" type="monotone" name="Sleep Quality (1-10)" dataKey="sleepQuality" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 2: Morning Readiness vs Training Intensity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Readiness & Intensity</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={formattedChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis yAxisId="left" domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Bar yAxisId="left" name="Training Intensity (0-10)" dataKey="sessionIntensity" fill="#93c5fd" radius={[2, 2, 0, 0]} barSize={20} />
                <Line yAxisId="left" type="monotone" name="Morning Readiness (1-10)" dataKey="morningReadiness" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Weekly Adherence (Nutrition & Training) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Utensils className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Nutrition Adherence</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={formattedChartData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis yAxisId="left" domain={[0, 1]} ticks={[0, 1]} tickFormatter={(v) => v === 1 ? 'Yes' : 'No'} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Bar yAxisId="left" name="Followed Nutrition Plan" dataKey="nutritionScore" fill="#4f46e5" radius={[2, 2, 0, 0]} barSize={20} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
