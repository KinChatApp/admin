import { Smartphone, Download, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAppVersions } from '../hooks/usePlatformData';

export function AppVersions() {
  const { data: versions, isLoading } = useAppVersions();

  return (
    <div className="animate-rise-in space-y-6">
      <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#F8FAFC]">App Versions & Updates</h3>
            <p className="text-sm text-[#94A3B8] mt-1">Manage Android releases, minimum supported versions, and force updates.</p>
          </div>
          <button className="flex items-center gap-2 rounded bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors">
            Publish Release
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#07111F]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#1E3A5F] bg-[#0D1B2A] text-xs uppercase text-[#64748B]">
                <tr>
                  <th className="px-5 py-4 font-mono-data font-medium">Platform</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Version Name</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Code</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Update Rules</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Release Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3A5F]">
                {isLoading ? (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">Loading release data...</td></tr>
                ) : versions?.length === 0 ? (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">No app versions found in database.</td></tr>
                ) : (
                  versions?.map((version) => (
                    <tr key={version.id} className="transition-colors hover:bg-[#12243A]/50">
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-2 text-[#E2E8F0] capitalize">
                          <Smartphone size={16} className="text-[#60A5FA]" /> {version.platform}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium text-[#F8FAFC]">
                        v{version.version_name}
                      </td>
                      <td className="px-5 py-3 font-mono-data text-[#94A3B8]">
                        {version.version_code}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-col gap-1">
                          {version.is_mandatory ? (
                            <span className="flex items-center gap-1 text-[10px] text-[#F87171] uppercase font-mono-data"><AlertTriangle size={12} /> Force Update</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] text-[#4ADE80] uppercase font-mono-data"><Download size={12} /> Optional Update</span>
                          )}
                          {version.min_supported_version_code && (
                            <span className="flex items-center gap-1 text-[10px] text-[#60A5FA] uppercase font-mono-data"><ShieldCheck size={12} /> Min Code: {version.min_supported_version_code}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[#94A3B8]">
                        {new Date(version.released_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
