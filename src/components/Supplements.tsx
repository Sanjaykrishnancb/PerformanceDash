import React from 'react';
import { Pill, ExternalLink } from 'lucide-react';

const supplementData = [
  {
    name: 'Vitamin D3',
    category: 'HORMONAL SUPPORT',
    direction: '20000iu with first meal',
    link: 'https://crossbordersupps.com/products/combat-fuel-high-strength-vitamin-d3-k2-3-month-supply'
  },
  {
    name: 'Multivitamin',
    category: 'GENERAL SUPPORT',
    direction: '1 serving with Meal 1',
    link: 'https://crossbordersupps.com/products/strom-sports-multimax-90-servings-iron-free'
  },
  {
    name: 'ZMA',
    category: 'HORMONAL SUPPORT',
    direction: '1 serving with last meal',
    link: 'https://amzn.in/d/ilNtZXX'
  },
  {
    name: 'Omega 3 Fish Oils',
    category: 'LIPID',
    direction: '3000mg with Meal 1 (2 Tabs)',
    link: 'https://crossbordersupps.com/products/apollon-nutrition-alpha-of-omegas-60servings-1300-epa-and-945-dha'
  },
  {
    name: 'DIM',
    category: 'ESTROGEN METABOLISM',
    direction: '1 pill with first and last meal',
    link: 'https://amzn.in/d/aN6Z6x1'
  },
  {
    name: 'Saw palmetto',
    category: 'DHT regulation',
    direction: '800 mg with last meal',
    link: ''
  },
  {
    name: 'Red Yeast Rice',
    category: 'Lipid',
    direction: '2 pills with meal 1, 2 and last meal',
    link: 'https://amzn.in/d/4wr4jLV'
  }
];

export function Supplements() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-slate-200 bg-slate-50">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Supplement Protocol</h2>
            <p className="text-sm text-slate-500">Daily recommended supplements and directions</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Supplement</th>
                <th className="px-6 py-4 font-semibold text-center">Category</th>
                <th className="px-6 py-4 font-semibold">Direction for Use</th>
                <th className="px-6 py-4 font-semibold text-center">Order Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {supplementData.map((supp, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{supp.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                      {supp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{supp.direction}</td>
                  <td className="px-6 py-4 text-center">
                    {supp.link ? (
                      <a 
                        href={supp.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-indigo-600 hover:bg-slate-50 hover:border-indigo-200 transition-colors font-medium text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Buy
                      </a>
                    ) : (
                      <span className="text-slate-400 text-xs italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
