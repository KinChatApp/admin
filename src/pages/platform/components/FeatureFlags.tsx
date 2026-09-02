import { useState } from 'react';
import { ToggleRight, ToggleLeft, FlaskConical, AlertCircle } from 'lucide-react';
import { initialFeatureFlags } from '../hooks/usePlatformData';

export function FeatureFlags() {
  const [flags, setFlags] = useState(initialFeatureFlags);

  const toggleFlag = (id: string, currentStatus: string) => {
    // In a real app, this would trigger an API/Supabase update
    setFlags(flags.map(f => {
      if (f.id === id) {
        if (currentStatus === 'ON') return { ...f, status: 'OFF' };
        if (currentStatus === 'OFF') return { ...f, status: 'ON' };
        // If BETA, toggling turns it OFF
        if (currentStatus === 'BETA') return { ...f, status: 'OFF' };
      }
      return f;
    }));
  };

  return (
    <div className="animate-rise-in space-y-6">
      <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#F8FAFC]">Feature Flags</h3>
            <p className="text-sm text-[#94A3B8] mt-1">Safely toggle platform features without deploying new code.</p>
          </div>
          <div className="flex items-center gap-2 rounded bg-[#12243A] px-3 py-1.5 text-xs text-[#60A5FA]">
            <AlertCircle size={14} /> Changes apply instantly
          </div>
        </div>

        <div className="space-y-4">
          {flags.map((flag) => (
            <div key={flag.id} className="flex items-center justify-between rounded-lg border border-[#1E3A5F] bg-[#07111F] p-4 transition-colors hover:border-[#2B5689]">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-[#F8FAFC]">{flag.name}</h4>
                  <span className={`inline-flex rounded px-1.5 py-0.5 text-[9px] font-mono-data font-semibold uppercase tracking-wider ${
                    flag.status === 'ON' ? 'bg-[#052E1A] text-[#4ADE80]' : 
                    flag.status === 'OFF' ? 'bg-[#450A0A] text-[#F87171]' : 'bg-[#422006] text-[#FBBF24]'
                  }`}>
                    {flag.status === 'BETA' && <FlaskConical size={10} className="mr-1 inline" />}
                    {flag.status}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-1">{flag.description}</p>
                <p className="text-[10px] text-[#475569] font-mono-data mt-2 uppercase">{flag.category}</p>
              </div>
              <button 
                onClick={() => toggleFlag(flag.id, flag.status)}
                className="text-[#64748B] transition-colors hover:text-[#F8FAFC]"
              >
                {flag.status === 'ON' ? (
                  <ToggleRight size={36} className="text-[#4ADE80]" />
                ) : flag.status === 'BETA' ? (
                  <ToggleRight size={36} className="text-[#FBBF24]" />
                ) : (
                  <ToggleLeft size={36} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
