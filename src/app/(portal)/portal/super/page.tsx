'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PortalHeader from '@/components/portal/PortalHeader';
import { getTenants, type Tenant } from '@/lib/firebase/firestore';

export default function SuperDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTenants().then(data => { setTenants(data); setLoading(false); });
  }, []);

  return (
    <>
      <PortalHeader title="Klanten" sub="Overzicht van alle Tappy-klanten" />

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <div className="bg-[#1E242D] border border-white/5 rounded-xl px-4 py-2 text-sm text-white">
            <span className="text-[#C6FF3B] font-bold">{tenants.length}</span>
            <span className="text-[#8B949E] ml-1">klanten totaal</span>
          </div>
          <div className="bg-[#1E242D] border border-white/5 rounded-xl px-4 py-2 text-sm text-white">
            <span className="text-[#C6FF3B] font-bold">{tenants.filter(t => t.status === 'active').length}</span>
            <span className="text-[#8B949E] ml-1">actief</span>
          </div>
        </div>
        <Link
          href="/portal/super/klanten/nieuw"
          className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm"
        >
          + Klant aanmaken
        </Link>
      </div>

      <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Bedrijf</th>
              <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Contact</th>
              <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">KVK</th>
              <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Status</th>
              <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Aangemaakt</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8B949E] text-sm">Laden...</td></tr>
            ) : tenants.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8B949E] text-sm">Nog geen klanten aangemaakt.</td></tr>
            ) : tenants.map((tenant) => (
              <tr key={tenant.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="font-medium text-white text-sm">{tenant.bedrijfsnaam}</div>
                  <div className="text-xs text-[#8B949E]">{tenant.adres}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm text-white">{tenant.contactNaam}</div>
                  <div className="text-xs text-[#8B949E]">{tenant.contactEmail}</div>
                </td>
                <td className="px-5 py-4 text-sm text-[#8B949E]">{tenant.kvk}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    tenant.status === 'active'
                      ? 'bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/20'
                      : 'bg-white/5 text-[#8B949E] border-white/10'
                  }`}>
                    {tenant.status === 'active' ? 'Actief' : 'Inactief'}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#8B949E]">
                  {tenant.aangemaaktOp?.toDate().toLocaleDateString('nl-NL')}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/portal/super/klanten/${tenant.id}`} className="text-xs text-[#C6FF3B] hover:underline">
                    Beheren →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
