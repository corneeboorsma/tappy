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

type Tab = 'gegevens' | 'terminals' | 'omzet' | 'login';

export default function KlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('gegevens');
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [allTerminals, setAllTerminals] = useState<GlobalTerminal[]>([]);
  const [portalUser, setPortalUser] = useState<PortalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Assign modal
  const [showAssignModal, setShowAssignModal] = useState(false);
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
  const [userDisabled, setUserDisabled] = useState<boolean | null>(null);
  const [toggleSaving, setToggleSaving] = useState(false);

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
    if (pu) {
      fetch(`/api/portal/user-status?uid=${pu.uid}`)
        .then(r => r.json())
        .then(d => setUserDisabled(d.disabled ?? false))
        .catch(() => setUserDisabled(false));
    } else {
      setUserDisabled(null);
    }
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

  const [assignFilter, setAssignFilter] = useState('');

  async function handleBulkAssign() {
    if (selectedIds.size === 0) return;
    setAssigning(true);
    await Promise.all([...selectedIds].map(tid => assignTerminal(tid, id)));
    setSelectedIds(new Set());
    setAssigning(false);
    setShowAssignModal(false);
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

  async function handleToggleDisabled() {
    if (!portalUser || userDisabled === null) return;
    setToggleSaving(true);
    const newDisabled = !userDisabled;
    const res = await fetch('/api/portal/toggle-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: portalUser.uid, disabled: newDisabled }),
    });
    if (res.ok) setUserDisabled(newDisabled);
    setToggleSaving(false);
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
        {(['gegevens', 'terminals', 'omzet', 'login'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? 'bg-[#C6FF3B] text-[#0D1117]' : 'text-[#8B949E] hover:text-white'}`}>
            {t === 'gegevens' ? 'Gegevens' : t === 'terminals' ? (
              <>Terminals <span className="ml-2 bg-white/10 text-[#8B949E] text-xs px-1.5 py-0.5 rounded-full">{assignedTerminals.length}</span></>
            ) : t === 'omzet' ? 'Omzet' : 'Login'}
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
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              onClick={() => { setSelectedIds(new Set()); setAssignFilter(''); setShowAssignModal(true); }}
              className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm"
            >
              + Terminals toewijzen
            </button>
          </div>

          <DataTable
            id={`klant-terminals-${id}`}
            exportFilename={`terminals-${tenant.bedrijfsnaam.toLowerCase().replace(/\s+/g, '-')}`}
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
      )}

      {tab === 'omzet' && tenant && (
        <OmzetTab tenant={tenant} terminals={assignedTerminals} />
      )}

      {tab === 'login' && (
        <div className="max-w-lg flex flex-col gap-6">
          {portalUser ? (
            <>
              <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
                <h2 className="text-sm font-bold text-white mb-4">Huidig account</h2>
                <div className="flex items-center gap-3 mb-1">
                  <button
                    onClick={handleToggleDisabled}
                    disabled={toggleSaving || userDisabled === null}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors disabled:opacity-50 ${
                      userDisabled
                        ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-[#C6FF3B]/10 hover:text-[#C6FF3B] hover:border-[#C6FF3B]/20'
                        : 'bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                    }`}>
                    {toggleSaving ? '...' : userDisabled ? 'Geblokkeerd' : 'Actief'}
                  </button>
                  <span className="text-sm text-white">{portalUser.email}</span>
                </div>
                <p className="text-xs text-[#8B949E] mt-2">UID: <span className="font-mono">{portalUser.uid}</span></p>
                <p className="text-xs text-[#8B949E] mt-1">Klik op de status om de portaltoegang te blokkeren of deblokkeren — onafhankelijk van de klant-status.</p>
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

      {/* Assign terminals modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1E242D] rounded-2xl border border-white/10 w-full max-w-lg flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div>
                <h2 className="text-white font-bold">Terminals toewijzen</h2>
                <p className="text-xs text-[#8B949E] mt-0.5">{availableTerminals.length} beschikbaar</p>
              </div>
              <button onClick={() => setShowAssignModal(false)} className="text-[#8B949E] hover:text-white text-lg leading-none">✕</button>
            </div>

            {availableTerminals.length > 0 && (
              <div className="px-4 py-3 border-b border-white/5">
                <input
                  type="text"
                  value={assignFilter}
                  onChange={e => setAssignFilter(e.target.value)}
                  placeholder="Zoek op naam, serienummer of model..."
                  autoFocus
                  className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C6FF3B]/50 transition-colors"
                />
              </div>
            )}

            {availableTerminals.length === 0 ? (
              <div className="px-6 py-10 text-center text-[#8B949E] text-sm">
                Alle terminals zijn al toegewezen.{' '}
                <Link href="/portal/super/terminals" className="text-[#C6FF3B] hover:underline">
                  Nieuwe terminal aanmaken →
                </Link>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1">
                <table className="w-full">
                  <thead className="sticky top-0 bg-[#1E242D]">
                    <tr className="border-b border-white/5">
                      <th className="w-10 px-4 py-3" />
                      <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Naam</th>
                      <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Serienummer</th>
                      <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableTerminals
                      .filter(t => {
                        if (!assignFilter) return true;
                        const q = assignFilter.toLowerCase();
                        return t.naam.toLowerCase().includes(q) || (t.serienummer ?? '').toLowerCase().includes(q) || (t.model ?? '').toLowerCase().includes(q);
                      })
                      .map(term => (
                      <tr key={term.id} onClick={() => toggleSelect(term.id)}
                        className={`border-b border-white/5 last:border-0 cursor-pointer transition-colors ${
                          selectedIds.has(term.id) ? 'bg-[#C6FF3B]/5' : 'hover:bg-white/[0.02]'
                        }`}>
                        <td className="px-4 py-3">
                          <input type="checkbox" checked={selectedIds.has(term.id)}
                            onChange={() => toggleSelect(term.id)}
                            onClick={e => e.stopPropagation()}
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

            <div className="px-6 py-4 border-t border-white/5 flex gap-3 items-center">
              <button onClick={handleBulkAssign} disabled={assigning || selectedIds.size === 0}
                className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
                {assigning ? 'Toewijzen...' : selectedIds.size > 0 ? `${selectedIds.size} terminal${selectedIds.size > 1 ? 's' : ''} toewijzen` : 'Selecteer terminals'}
              </button>
              <button onClick={() => setShowAssignModal(false)}
                className="bg-white/5 text-white px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const ASSUMED_TRANSACTIONS_PER_MONTH = 1000;
const ASSUMED_AVG_TRANSACTION = 20;

function OmzetTab({ tenant, terminals }: { tenant: Tenant; terminals: GlobalTerminal[] }) {
  const totalCount = terminals.length;

  const vastPerMaand = terminals.reduce((sum, t) => sum + (t.bedrag ?? 0), 0);
  const transactiesOmzet = ASSUMED_TRANSACTIONS_PER_MONTH * ASSUMED_AVG_TRANSACTION;
  const transactieKosten = transactiesOmzet * (tenant.pricing.transactieTarief / 100);
  const totaalPerMaand = vastPerMaand + transactieKosten;

  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return {
      label: d.toLocaleDateString('nl-NL', { month: 'short', year: '2-digit' }),
      vast: vastPerMaand,
      transactie: transactieKosten,
      totaal: totaalPerMaand,
    };
  });

  function fmt(n: number) {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  }

  const maxBar = Math.max(...months.map(m => m.totaal), 1);

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1E242D] rounded-2xl p-5 border border-white/5">
          <p className="text-xs text-[#8B949E] uppercase tracking-wide mb-2">Vast (maandelijks)</p>
          <p className="text-2xl font-bold text-white">{fmt(vastPerMaand)}</p>
          <p className="text-xs text-[#8B949E] mt-1">{totalCount} terminal{totalCount !== 1 ? 's' : ''} · som van vaste bedragen</p>
        </div>
        <div className="bg-[#1E242D] rounded-2xl p-5 border border-white/5">
          <p className="text-xs text-[#8B949E] uppercase tracking-wide mb-2">Transactiekosten</p>
          <p className="text-2xl font-bold text-white">{fmt(transactieKosten)}</p>
          <p className="text-xs text-[#8B949E] mt-1">{ASSUMED_TRANSACTIONS_PER_MONTH.toLocaleString('nl-NL')} tx × {fmt(ASSUMED_AVG_TRANSACTION)} × {tenant.pricing.transactieTarief}%</p>
        </div>
        <div className="bg-[#1E242D] rounded-2xl p-5 border border-[#C6FF3B]/20">
          <p className="text-xs text-[#C6FF3B] uppercase tracking-wide mb-2">Totaal per maand</p>
          <p className="text-2xl font-bold text-[#C6FF3B]">{fmt(totaalPerMaand)}</p>
          <p className="text-xs text-[#8B949E] mt-1">Vast + transactiekosten</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
        <h2 className="text-sm font-bold text-white mb-6">Maandoverzicht (aanname)</h2>
        <div className="flex items-end gap-3 h-40">
          {months.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-[#8B949E]">{fmt(m.totaal)}</span>
              <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: `${(m.totaal / maxBar) * 100}px` }}>
                <div className="w-full rounded-b-lg bg-[#C6FF3B]/80" style={{ flex: m.vast }} />
                <div className="w-full rounded-t-lg bg-[#C6FF3B]/30" style={{ flex: m.transactie }} />
              </div>
              <span className="text-xs text-[#8B949E]">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#C6FF3B]/80" />
            <span className="text-xs text-[#8B949E]">Vast tarief</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#C6FF3B]/30" />
            <span className="text-xs text-[#8B949E]">Transactiekosten</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#8B949E]">
        * Transacties gebaseerd op aanname: {ASSUMED_TRANSACTIONS_PER_MONTH.toLocaleString('nl-NL')} transacties/maand bij gemiddeld {fmt(ASSUMED_AVG_TRANSACTION)}.
        Zodra echte transactiedata beschikbaar is wordt dit automatisch bijgewerkt.
      </p>
    </div>
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
