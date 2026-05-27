'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PortalHeader from '@/components/portal/PortalHeader';
import DataTable from '@/components/portal/DataTable';
import { getTenants, type Tenant } from '@/lib/firebase/firestore';
import { useAuth } from '@/lib/portal/AuthContext';

function getCity(adres: string) {
  const parts = adres.split(',');
  if (parts.length >= 2) {
    // "Opbroekweg 40, 7461 PH Rijssen" → "Rijssen"
    const last = parts[parts.length - 1].trim();
    const words = last.split(' ');
    return words[words.length - 1] ?? last;
  }
  return adres;
}

export default function SuperDashboard() {
  const { role, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && role !== 'super_admin') {
      router.replace('/portal/dashboard');
    }
  }, [role, authLoading, router]);

  useEffect(() => {
    if (role === 'super_admin') {
      getTenants().then(data => { setTenants(data); setLoading(false); });
    }
  }, [role]);

  if (authLoading || role !== 'super_admin') return null;

  return (
    <>
      <PortalHeader title="Klanten" sub="Overzicht van alle Tappy-klanten" />

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <div className="bg-[#1E242D] border border-white/5 rounded-xl px-4 py-2 text-sm">
            <span className="text-[#C6FF3B] font-bold">{tenants.length}</span>
            <span className="text-[#8B949E] ml-1">klanten totaal</span>
          </div>
          <div className="bg-[#1E242D] border border-white/5 rounded-xl px-4 py-2 text-sm">
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

      {loading ? (
        <div className="text-[#8B949E] text-sm">Laden...</div>
      ) : (
        <DataTable
          id="klanten"
          exportFilename="tappy-klanten"
          columns={[
            { key: 'bedrijfsnaam', label: 'Bedrijf', defaultVisible: true },
            { key: 'plaats', label: 'Plaats', defaultVisible: true },
            { key: 'contactNaam', label: 'Contact', defaultVisible: true },
            { key: 'contactEmail', label: 'E-mail', defaultVisible: true },
            { key: 'kvk', label: 'KVK', defaultVisible: false },
            { key: 'iban', label: 'IBAN', defaultVisible: false },
            { key: 'status', label: 'Status', defaultVisible: true },
            { key: 'aangemaaktOp', label: 'Aangemaakt', defaultVisible: true },
          ]}
          rows={tenants as unknown as Record<string, unknown>[]}
          renderCell={(row, key) => {
            const tenant = row as unknown as Tenant;
            if (key === 'bedrijfsnaam') return <span className="font-medium text-white">{tenant.bedrijfsnaam}</span>;
            if (key === 'plaats') return <span className="text-[#8B949E]">{getCity(tenant.adres)}</span>;
            if (key === 'contactNaam') return <span className="text-white">{tenant.contactNaam}</span>;
            if (key === 'contactEmail') return <span className="text-[#8B949E]">{tenant.contactEmail}</span>;
            if (key === 'kvk') return <span className="text-[#8B949E]">{tenant.kvk}</span>;
            if (key === 'iban') return <span className="text-[#8B949E]">{tenant.iban}</span>;
            if (key === 'status') return (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                tenant.status === 'active'
                  ? 'bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/20'
                  : 'bg-white/5 text-[#8B949E] border-white/10'
              }`}>
                {tenant.status === 'active' ? 'Actief' : 'Inactief'}
              </span>
            );
            if (key === 'aangemaaktOp') return <span className="text-[#8B949E]">{tenant.aangemaaktOp?.toDate().toLocaleDateString('nl-NL')}</span>;
            return null;
          }}
          actions={(row) => {
            const tenant = row as unknown as Tenant;
            return <Link href={`/portal/super/klanten/${tenant.id}`} className="text-xs text-[#C6FF3B] hover:underline">Beheren →</Link>;
          }}
        />
      )}
    </>
  );
}
