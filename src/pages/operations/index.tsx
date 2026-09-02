import { useState } from 'react';
import { Activity, Server, Cpu, Terminal, AlertTriangle, RefreshCw, AlertOctagon, Info } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useSystemLogs, useIncidents } from './hooks/useOperationsData';
import { SystemHealthGrid } from './components/SystemHealthGrid';

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<'health' | 'api' | 'jobs' | 'logs' | 'incidents'>('health');
  const { data: logs, refetch: refetchLogs } = useSystemLogs();
  const { data: incidents } = useIncidents();

  const tabs = [
    { id: 'health', label: 'System Health', icon: Activity },
    { id: 'api', label: 'API & Realtime', icon: Server },
    { id: 'jobs', label: 'Jobs / Workers', icon: Cpu },
    { id: 'logs', label: 'System Logs', icon: Terminal },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
  ] as const;

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <TinyLabel>Infrastructure</TinyLabel>
            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
              Operations Command
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
              Live monitoring of system health, background workers, logs, and incidents.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#4ADE80] rounded-full border border-[#052E1A] bg-[#052E1A]/40 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span>
              </span>
              All Systems Operational
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex overflow-x-auto border-b border-[#1E3A5F] quiet-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'border-[#60A5FA] text-[#F8FAFC]' : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div className="animate-rise-in">
          {activeTab === 'health' && (
            <div className="space-y-6">
              <SystemHealthGrid />
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="rounded-lg border border-[#1E3A5F] bg-[#020914] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#1E3A5F] bg-[#0D1B2A] px-4 py-3">
                <h3 className="text-sm font-mono-data font-semibold text-[#F8FAFC]">Live System Logs</h3>
                <button onClick={() => refetchLogs()} className="text-[#64748B] hover:text-[#F8FAFC]"><RefreshCw size={14} /></button>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono-data whitespace-nowrap">
                  <tbody className="divide-y divide-[#1E3A5F]/30">
                    {logs?.map((log) => (
                      <tr key={log.id} className="hover:bg-[#0D1B2A]/50">
                        <td className="py-2.5 pr-4 text-[#64748B]">{new Date(log.timestamp).toLocaleTimeString()}</td>
                        <td className="py-2.5 pr-4">
                          <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] uppercase ${
                            log.type === 'error' ? 'bg-[#450A0A] text-[#F87171]' :
                            log.type === 'warning' ? 'bg-[#422006] text-[#FBBF24]' : 'bg-[#12243A] text-[#60A5FA]'
                          }`}>
                            {log.type === 'error' ? <AlertOctagon size={10} /> : log.type === 'warning' ? <AlertTriangle size={10} /> : <Info size={10} />}
                            {log.type}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4 text-[#94A3B8]">{log.source}</td>
                        <td className={`py-2.5 w-full ${log.type === 'error' ? 'text-[#FCA5A5]' : 'text-[#E2E8F0]'}`}>{log.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-4">
              {incidents?.map(incident => (
                <div key={incident.id} className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`rounded px-2 py-1 text-[10px] font-mono-data font-semibold uppercase ${
                        incident.status === 'active' ? 'bg-[#450A0A] text-[#F87171]' : 'bg-[#052E1A] text-[#4ADE80]'
                      }`}>
                        {incident.status}
                      </span>
                      <h4 className="font-semibold text-[#F8FAFC]">{incident.title}</h4>
                    </div>
                    <span className="font-mono-data text-xs text-[#64748B]">{incident.id}</span>
                  </div>
                  <div className="mt-4 flex gap-6 text-sm text-[#94A3B8]">
                    <p><strong className="text-[#64748B]">Severity:</strong> <span className="capitalize">{incident.severity}</span></p>
                    <p><strong className="text-[#64748B]">Reported:</strong> {new Date(incident.created_at).toLocaleString()}</p>
                    {incident.resolved_at && (
                      <p><strong className="text-[#64748B]">Resolved:</strong> {new Date(incident.resolved_at).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Placeholders for detailed drill-down tabs */}
          {['api', 'jobs'].includes(activeTab) && (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-[#1E3A5F] border-dashed bg-[#0D1B2A]/50 px-4 text-center">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[#12243A] text-[#64748B]">
                {activeTab === 'api' ? <Server size={24} /> : <Cpu size={24} />}
              </div>
              <h3 className="text-sm font-medium text-[#E2E8F0] capitalize">{tabs.find(t => t.id === activeTab)?.label} Telemetry</h3>
              <p className="mt-1 max-w-sm text-xs text-[#64748B]">
                High-level metrics are available in System Health. Deep-dive telemetry for {activeTab} will require connecting an external APM provider (e.g., Datadog).
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
