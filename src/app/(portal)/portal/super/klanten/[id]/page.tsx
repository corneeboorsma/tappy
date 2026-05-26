'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PortalHeader from '@/components/portal/PortalHeader';
import DataTable from '@/components/portal/DataTable';
import {
  getTenant, updateTenant,
  getGlobalTerminals, assignTerminal, updateGlobalTerminal,
  getPortalUserByTenantId,
  type Tenant, type GlobalTerminal, type PortalUser,
} from '@/lib/firebase/firestore';

type Tab = 'gegevens' | 'terminals' | 'login';

export default function KlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('gegevens');
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [allTerminals, setAllTerminals] = useState<GlobalTerminal[]>([]);
  const [portalUser, setPortalUser] = useState<PortalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Bulk assign
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [assigning, setAssigning] = useState(false);

  // Login tab
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginSaving, setLoginSaving] = useState(false);
  const [loginMsg, setLoginMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetSaving, setResetSaving] = useState(false);
  const [resetMsg, setResetMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  async function load() {
    const [t, terms, pu] = await Promise.all([
      getTenant(id),
      getGlobalTerminals(),
      getPortalUserByTenantId(id),
    ]);
    setTenant(t);
    setAllTerminals(terms);
    setPortalUser(pu);
    if (t) setLoginEmail(t.contactEmail ?? '');
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [id]);

  const assignedTerminals = allTerminals.filter(t => t.tenantId === id);
  const availableTerminals = allTerminals.filter(t => !t.tenantId);

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

  async function handleUnassign(terminalId: string) {
    await assignTerminal(terminalId, null);
    await load();
  }

  async function handleBulkAssign() {
    if (selectedIds.size === 0) return;
    setAssigning(true);
    await Promise.all([...selectedIds].map(tid => assignTerminal(tid, id)));
    setSelectedIds(new Set());
    setAssigning(false);
    await load();
  }

  async function handleToggleStatus(term: GlobalTerminal) {
    await updateGlobalTerminal(term.id, {
      status: term.status === 'active' ? 'inactive' : 'active',
    });
    await load();
  }

  function toggleSelect(termId: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(termId)) { next.delete(termId); } else { next.add(termId); }
      return next;
    });
  }

  async function handleCreateLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginSaving(true);
    setLoginMsg(null);
    const res = await fetch('/api/portal/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword, tenantId: id }),
    });
    const data = await res.json();
    if (res.ok) {
      setLoginMsg({ type: 'ok', text: `Account aangemaakt voor ${loginEmail}` });
      setLoginPassword('');
      await load();
    } else {
      setLoginMsg({ type: 'err', text: data.error ?? 'Fout bij aanmaken account' });
    }
    setLoginSaving(false);
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!portalUser) return;
    setResetSaving(true);
    setResetMsg(null);
    const res = await fetch('/api/portal/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: portalUser.uid, password: newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setResetMsg({ type: 'ok', text: 'Wachtwoord bijgewerkt' });
      setNewPassword('');
    } else {
      setResetMsg({ type: 'err', text: data.error ?? 'Fout bij resetten wachtwoord' });
    }
    setResetSaving(false);
  }

  if (loading) return <div className="text-[#8B949E] text-sm">Laden...</div>;
  if (!tenant) return <div className="text-[#8B949E] text-sm">Klant niet gevonden.</div>;

  return (
    <>
      <PortalHeader title={tenant.bedrijfsnaam} sub={tenant.adres} />

      {/* Tabs */}
      <div className="flex gap-1 bg-[#1E242D] rounded-xl p-1 w-fit mb-8">
        {(['gegevens', 'terminals', 'login'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? 'bg-[#C6FF3B] text-[#0D1117]' : 'text-[#8B949E] hover:text-white'}`}>
            {t === 'gegevens' ? 'Gegevens' : t === 'terminals' ? (
              <>Terminals <span className="ml-2 bg-white/10 text-[#8B949E] text-xs px-1.5 py-0.5 rounded-full">{assignedTerminals.length}</span></>
            ) : 'Login'}
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
              <EditField label="Vast tarief per terminal (€/maand)" type="number"
                value={String(tenant.pricing.vastPerTerminal)}
                onChange={v => setTenant({ ...tenant, pricing: { ...tenant.pricing, vastPerTerminal: parseFloat(v) || 0 } })} />
              <EditField label="Transactietarief (%)" type="number"
                value={String(tenant.pricing.transactieTarief)}
                onChange={v => setTenant({ ...tenant, pricing: { ...tenant.pricing, transactieTarief: parseFloat(v) || 0 } })} />
            </div>
          </section>

          <div className="flex gap-3 items-center">
            <button onClick={saveTenant} disabled={saving}
              className="bg-[#C6FF3B] text-[#0D1117] font-bold px-6 py-3 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
              {saving ? 'Opslaan...' : 'Opslaan'}
            </button>
            {saved && <span className="text-sm text-[#C6FF3B]">&#10003; Opgeslagen</span>}
            <Link href="/portal/super" className="bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Terug
            </Link>
          </div>
        </div>
      )}

      {tab === 'terminals' && (
        <div className="flex flex-col gap-8">

          {/* Toegewezen terminals */}
          <div>
            <h2 className="text-sm font-bold text-white mb-4">
              Toegewezen terminals
              <span className="ml-2 text-[#8B949E] font-normal">({assignedTerminals.length})</span>
            </h2>
            <DataTable
              id={`klant-terminals-${id}`}
              columns={[
                { key: 'naam', label: 'Naam', defaultVisible: true },
                { key: 'serienummer', label: 'Serienummer', defaultVisible: true },
                { key: 'model', label: 'Model', defaultVisible: true },
                { key: 'tafelNummer', label: 'Tafel', defaultVisible: true },
                { key: 'status', label: 'Status', defaultVisible: true },
              ]}
              rows={assignedTerminals as unknown as Record<string, unknown>[]}
              renderCell={(row, key) => {
                const term = row as unknown as GlobalTerminal;
                if (key === 'naam') return <span className="font-medium text-white">{term.naam}</span>;
                if (key === 'serienummer') return <span className="text-[#8B949E] font-mono text-xs">{term.serienummer || '—'}</span>;
                if (key === 'model') return <span className="text-[#8B949E]">{term.model || '—'}</span>;
                if (key === 'tafelNummer') return <span className="text-[#8B949E]">{term.tafelNummer || '—'}</span>;
                if (key === 'status') return (
                  <button onClick={() => handleToggleStatus(term)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                      term.status === 'active'
                        ? 'bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                        : 'bg-white/5 text-[#8B949E] border-white/10 hover:bg-[#C6FF3B]/10 hover:text-[#C6FF3B] hover:border-[#C6FF3B]/20'
                    }`}>
                    {term.status === 'active' ? 'Actief' : 'Inactief'}
                  </button>
                );
                return null;
              }}
              actions={(row) => {
                const term = row as unknown as GlobalTerminal;
                return (
                  <button onClick={() => handleUnassign(term.id)}
                    className="text-xs text-red-400 hover:underline">
                    Verwijderen
                  </button>
                );
              }}
            />
          </div>

          {/* Beschikbare terminals toewijzen */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">
                Terminals toewijzen
                <span className="ml-2 text-[#8B949E] font-normal">({availableTerminals.length} beschikbaar)</span>
              </h2>
              {selectedIds.size > 0 && (
                <button onClick={handleBulkAssign} disabled={assigning}
                  className="bg-[#C6FF3B] text-[#0D1117] font-bold px-4 py-2 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
                  {assigning ? 'Toewijzen...' : `${selectedIds.size} terminal${selectedIds.size > 1 ? 's' : ''} toewijzen`}
                </button>
              )}
            </div>
            {availableTerminals.length === 0 ? (
              <div className="bg-[#1E242D] rounded-2xl border border-white/5 px-5 py-8 text-center text-[#8B949E] text-sm">
                Alle terminals zijn al toegewezen.{' '}
                <Link href="/portal/super/terminals" className="text-[#C6FF3B] hover:underline">
                  Nieuwe terminal aanmaken →
                </Link>
              </div>
            ) : (
              <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="w-10 px-4 py-3" />
                      <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Naam</th>
                      <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Serienummer</th>
                      <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableTerminals.map(term => (
                      <tr key={term.id} onClick={() => toggleSelect(term.id)}
                        className={`border-b border-white/5 last:border-0 cursor-pointer transition-colors ${
                          selectedIds.has(term.id) ? 'bg-[#C6FF3B]/5' : 'hover:bg-white/[0.02]'
                        }`}>
                        <td className="px-4 py-3">
                          <input type="checkbox" checked={selectedIds.has(term.id)} onChange={() => toggleSelect(term.id)}
                            className="accent-[#C6FF3B] w-4 h-4 cursor-pointer" />
                        </td>
                        <td className="px-5 py-3 text-sm font-medium text-white">{term.naam}</td>
                        <td className="px-5 py-3 text-sm text-[#8B949E] font-mono">{term.serienummer || '—'}</td>
                        <td className="px-5 py-3 text-sm text-[#8B949E]">{term.model || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'login' && (
        <div className="max-w-lg flex flex-col gap-6">
          {portalUser ? (
            <>
              <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
                <h2 className="text-sm font-bold text-white mb-4">Huidig account</h2>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs bg-[#C6FF3B]/10 text-[#C6FF3B] border border-[#C6FF3B]/20 px-2.5 py-1 rounded-full font-semibold">Actief</span>
                  <span className="text-sm text-white">{portalUser.email}</span>
                </div>
                <p className="text-xs text-[#8B949E] mt-2">UID: <span className="font-mono">{portalUser.uid}</span></p>
              </div>

              <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
                <h2 className="text-sm font-bold text-white mb-5">Wachtwoord resetten</h2>
                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Nieuw wachtwoord</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="Minimaal 6 tekens"
                      className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50 transition-colors"
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <button type="submit" disabled={resetSaving}
                      className="bg-[#C6FF3B] text-[#0D1117] font-bold px-6 py-3 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
                      {resetSaving ? 'Opslaan...' : 'Wachtwoord bijwerken'}
                    </button>
                    {resetMsg && (
                      <span className={`text-sm ${resetMsg.type === 'ok' ? 'text-[#C6FF3B]' : 'text-red-400'}`}>
                        {resetMsg.text}
                      </span>
                    )}
                  </div>
                </form>
              </section>
            </>
          ) : (
            <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
              <h2 className="text-sm font-bold text-white mb-2">Login aanmaken</h2>
              <p className="text-xs text-[#8B949E] mb-5">Er is nog geen portaltoegang voor deze klant.</p>
              <form onSubmit={handleCreateLogin} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">E-mailadres</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    required
                    placeholder="klant@bedrijf.nl"
                    className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Wachtwoord</label>
                  <input
                    type="text"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Tijdelijk wachtwoord"
                    className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50 transition-colors"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <button type="submit" disabled={loginSaving}
                    className="bg-[#C6FF3B] text-[#0D1117] font-bold px-6 py-3 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
                    {loginSaving ? 'Aanmaken...' : 'Account aanmaken'}
                  </button>
                  {loginMsg && (
                    <span className={`text-sm ${loginMsg.type === 'ok' ? 'text-[#C6FF3B]' : 'text-red-400'}`}>
                      {loginMsg.text}
                    </span>
                  )}
                </div>
              </form>
            </section>
          )}
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
