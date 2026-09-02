import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SectionHeading } from './SectionHeading';
import { useChartData } from '../hooks/useOverviewData';

export function ActivityCharts() {
  const { data, isLoading } = useChartData();
  const [activeTab, setActiveTab] = useState<'messages' | 'calls' | 'users'>('messages');

  const config = {
    messages: { color: '#3B82F6', label: 'Messages' },
    calls: { color: '#10B981', label: 'Calls' },
    users: { color: '#8B5CF6', label: 'New Users' }
  };

  return (
    <section className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Analytics" title="7-Day Platform Activity" />
        <div className="flex gap-2 rounded-md border border-[#1E3A5F] bg-[#07111F] p-1">
          {(Object.keys(config) as Array<keyof typeof config>).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`rounded px-3 py-1.5 text-xs transition-colors ${activeTab === key ? 'bg-[#12243A] font-medium text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
            >
              {config[key].label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[280px] w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-[#64748B]">Loading chart data...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config[activeTab].color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={config[activeTab].color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0D1B2A', borderColor: '#1E3A5F', borderRadius: '8px', fontSize: '12px', color: '#F8FAFC' }}
                itemStyle={{ color: config[activeTab].color }}
              />
              <Area type="monotone" dataKey={activeTab} stroke={config[activeTab].color} strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
