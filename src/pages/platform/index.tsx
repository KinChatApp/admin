import { useState } from 'react';
import { ToggleLeft, Settings, Smartphone, Wrench, Database, Network } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { FeatureFlags } from './components/FeatureFlags';
import { AppVersions } from './components/AppVersions';

export default function PlatformPage() {
  // Set Feature Flags as the default tab as requested
  const [activeTab, setActiveTab] = useState<'flags' | 'config' | 'versions' | 'maintenance' | 'storage' | 'integrations'>('flags');

  const tabs = [
    { id: 'flags', label: 'Feature Flags', icon: ToggleLeft },
    { id: 'config', label: 'Configuration', icon: Settings },
    { id: 'versions', label: 'App Versions', icon: Smartphone },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'storage', label: 'Storage', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Network },
  ] as const;

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8">
          <TinyLabel>Infrastructure</TinyLabel>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
            Platform Configuration
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Manage core system settings, toggle features, app versions, and third-party integrations.
          </p>
        </div>

        {/* Sidebar + Content Layout */}
        <div className="flex flex-col gap-6 md:flex-row">
          
          {/* Vertical Tabs (Sidebar for Platform settings) */}
          <div className="w-full shrink-0 md:w-64">
            <div className="sticky top-6 flex flex-row gap-1 overflow-x-auto rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-2 md:flex-col quiet-scrollbar">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? 'bg-[#12243A] text-[#F8FAFC]' : 'text-[#64748B] hover:bg-[#12243A]/50 hover:text-[#94A3B8]'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-[#60A5FA]' : ''} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="min-w-0 flex-1">
            {activeTab === 'flags' && <FeatureFlags />}
            {activeTab === 'versions' && <AppVersions />}
            
            {/* Placeholders for Future Implementation */}
            {['config', 'maintenance', 'storage', 'integrations'].includes(activeTab) && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-[#1E3A5F] border-dashed bg-[#0D1B2A]/50 px-4 text-center">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[#12243A] text-[#64748B]">
                  {activeTab === 'config' && <Settings size={24} />}
                  {activeTab === 'maintenance' && <Wrench size={24} />}
                  {activeTab === 'storage' && <Database size={24} />}
                  {activeTab === 'integrations' && <Network size={24} />}
                </div>
                <h3 className="text-sm font-medium text-[#E2E8F0] capitalize">{tabs.find(t => t.id === activeTab)?.label} Interface</h3>
                <p className="mt-1 max-w-sm text-xs text-[#64748B]">
                  This module is securely mapped. Configuration forms will be enabled in the upcoming dashboard expansion.
                </p>
              </div>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
}
