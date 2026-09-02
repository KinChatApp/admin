import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
  data: any[];
  type: 'area' | 'bar';
  primaryKey: string;
  secondaryKey?: string;
  colors: { primary: string; secondary: string };
}

export function AnalyticsCharts({ data, type, primaryKey, secondaryKey, colors }: ChartProps) {
  if (!data || data.length === 0) return <div className="flex h-full items-center justify-center text-sm text-[#64748B]">No data available</div>;

  const commonProps = {
    data,
    margin: { top: 10, right: 10, left: -20, bottom: 0 },
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === 'bar' ? (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
          <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#020914', borderColor: '#1E3A5F', borderRadius: '8px', color: '#F8FAFC' }} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
          <Bar dataKey={primaryKey} stackId="a" fill={colors.primary} radius={[0, 0, 4, 4]} />
          {secondaryKey && <Bar dataKey={secondaryKey} stackId="a" fill={colors.secondary} radius={[4, 4, 0, 0]} />}
        </BarChart>
      ) : (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="colorPrim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSec" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
          <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#020914', borderColor: '#1E3A5F', borderRadius: '8px', color: '#F8FAFC' }} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
          <Area type="monotone" dataKey={primaryKey} stroke={colors.primary} fillOpacity={1} fill="url(#colorPrim)" />
          {secondaryKey && <Area type="monotone" dataKey={secondaryKey} stroke={colors.secondary} fillOpacity={1} fill="url(#colorSec)" />}
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}
