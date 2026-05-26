'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PortalHeader from '@/components/portal/PortalHeader';
import {
  getTenant, updateTenant, getTerminals, addTerminal,
  type Tenant, type Terminal,
} from '@/lib/firebase/firestore';

type Tab = 'gegevens' | 'terminals';

export default function KlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('gegevens');
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Terminal form
  const [tNaam, setTNaam] = useState('');
  const [tTafel, setTTafel] = useState('');
  const [tSerie, setTSerie] = useState('');
  const [tBedrag, setTBedrag] = useState('');
  const [tSaving, setTSaving] = useState(false);

  useEffect(() => {
    Promise.all([getTenant(id), getTerminals(id)]).then(([t, terms]) => {
      setTenant(t);
      setTerminals(terms);
      setLoading(false);
    });
  }, [id]);

  async function saveTenant() {
    if (!tenant) return;
    setSaving(true);
    await updateTenant(id, {
      bedrijfsnaam: tenant.bedrijfsnaam,
      adres: tenant.adres,
      kvk: tenant.kvk,
      iban: tenant.iban,
      btwNummer: tenant.btwNummer,
      contactNaam: tenant.contactNaam,
      contactEmail: tenant.contactEmail,
      contactTelefoon: tenant.contactTelefoon,
      status: tenant.status,
      pricing: tenant.pricing,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function addNewTerminal(e: React.FormEvent) {
    e.preventDefault();
    setTSaving(true);
    await addTerminal(id, {
      naam: tNaam, tafelNummer: tTafel, serienummer: tSerie,
      locatieId: '', status: 'active', bedrag: parseFloat(tBedrag) || 0,
    });
    const updated = await getTerminals(id);
    setTerminals(updated);
    setTNaam(''); setTTafel(''); setTSerie(''); setTBedrag('');
    setTSaving(false);
  }

  if (loading) return <div className="text-[#8B949E] text-sm">Laden...</div>;
  if (!tenant) return <div className="text-[#8B949E] text-sm">Klant niet gevonden.</div>;

  return (
    <>
      <PortalHeader title={tenant.bedrijfsnaam} sub={tenant.adres} />

      {/* Tabs */}
      <div className="flex gap-1 bg-[#1E242D] rounded-xl p-1 w-fit mb-8">
        {(['gegevens', 'terminals'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? 'bg-[#C6FF3B] text-[#0D1117]' : 'text-[#8B949E] hover:text-white'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'gegevens' && (
        <div className="max-w-2xl flex flex-col gap-6">
          <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
            <h2 className="text-sm font-bold text-white mb-5">Bedrijfsgegevens</h2>
            <div className="grid grid-cols-2 gap-4">
              <EditField label="Bedrijfsnaam" value={tenant.bedrijfsnaam} onChange={v => setTenant({ ...tenant, bedrijfsnaam: v })} />
              <EditField label="Adres" value={tenant.adres} onChange={v => setTenant({ ...tenant, adres: v })} />
              <EditField label="KVK" value={tenant.kvk} onChange={v => setTenant({ ...tenant, kvk: v })} />
              <EditField label="IBAN" value={tenant.iban} onChange={v => setTenant({ ...tenant, iban: v })} />
              <EditField label="BTW-nummer" value={tenant.btwNummer} onChange={v => setTenant({ ...tenant, btwNummer: v })} />
              <div>
                <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Status</label>
                <select value={tenant.status} onChange={e => setTenant({ ...tenant, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50">
                  <option value="active">Actief</option>
                  <option value="inactive">Inactief</option>
                </select>
              </div>
            </div>
          </section>
          <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
            <h2 className="text-sm font-bold text-white mb-5">Contactpersoon</h2>
            <div className="grid grid-cols-2 gap-4">
              <EditField label="Naam" value={tenant.contactNaam} onChange={v => setTenant({ ...tenant, contactNaam: v })} />
              <EditField label="E-mail" value={tenant.contactEmail} onChange={v => setTenant({ ...tenant, contactEmail: v })} />
              <EditField label="Telefoon" value={tenant.contactTelefoon} onChange={v => setTenant({ ...tenant, contactTelefoon: v })} />
            </div>
          </section>
          <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
            <h2 className="text-sm font-bold text-white mb-5">Tarieven</h2>
            <div className="grid grid-cols-2 gap-4">
              <EditField label="Vast tarief per terminal (€/maand)" type="number" value={String(tenant.pricing.vastPerTerminal)} onChange={v => setTenant({ ...tenant, pricing: { ...tenant.pricing, vastPerTerminal: parseFloat(v) || 0 } })} />
              <EditField label="Transactietarief (%)" type="number" value={String(tenant.pricing.transactieTarief)} onChange={v => setTenant({ ...tenant, pricing: { ...tenant.pricing, transactieTarief: parseFloat(v) || 0 } })} />
            </div>
          </section>
          <div className="flex gap-3 items-center">
            <button onClick={saveTenant} disabled={saving}
              className="bg-[#C6FF3B] text-[#0D1117] font-bold px-6 py-3 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
              {saving ? 'Opslaan...' : 'Opslaan'}
            </button>
            {saved && <span className="text-sm text-[#C6FF3B]">✓ Opgeslagen</span>}
            <Link href="/portal/super" className="bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Terug
            </Link>
          </div>
        </div>
      )}

      {tab === 'terminals' && (
        <div className="max-w-2xl flex flex-col gap-6">
          {/* Nieuw terminal formulier */}
          <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
            <h2 className="text-sm font-bold text-white mb-5">Terminal toevoegen</h2>
            <form onSubmit={addNewTerminal} className="grid grid-cols-2 gap-4">
              <EditField label="Naam (bijv. Tafel 5)" value={tNaam} onChange={setTNaam} required />
              <EditField label="Tafelnummer" value={tTafel} onChange={setTTafel} />
              <EditField label="Serienummer" value={tSerie} onChange={setTSerie} />
              <EditField label="Standaard bedrag (€)" type="number" value={tBedrag} onChange={setTBedrag} />
              <div className="col-span-2">
                <button type="submit" disabled={tSaving}
                  className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
                  {tSaving ? 'Toevoegen...' : '+ Terminal toevoegen'}
                </button>
              </div>
            </form>
          </section>
          {/* Terminalslijst */}
          <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Naam</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Tafel</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Serienummer</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Bedrag</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {terminals.length === 0 ? (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-[#8B949E] text-sm">Nog geen terminals.</td></tr>
                ) : terminals.map(term => (
                  <tr key={term.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3 text-sm text-white">{term.naam}</td>
                    <td className="px-5 py-3 text-sm text-[#8B949E]">{term.tafelNummer || '—'}</td>
                    <td className="px-5 py-3 text-sm text-[#8B949E]">{term.serienummer || '—'}</td>
                    <td className="px-5 py-3 text-sm text-white">€{term.bedrag?.toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${term.status === 'active' ? 'bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/20' : 'bg-white/5 text-[#8B949E] border-white/10'}`}>
                        {term.status === 'active' ? 'Actief' : 'Inactief'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function EditField({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
        className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50 transition-colors" />
    </div>
  );
}
