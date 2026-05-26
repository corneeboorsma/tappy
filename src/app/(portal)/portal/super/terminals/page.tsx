'use client';
import { useEffect, useState } from 'react';
import PortalHeader from '@/components/portal/PortalHeader';
import DataTable from '@/components/portal/DataTable';
import {
  getGlobalTerminals, getTenants, createGlobalTerminal, updateGlobalTerminal, assignTerminal,
  type GlobalTerminal, type Tenant,
} from '@/lib/firebase/firestore';

export default function SuperTerminalsPage() {
  const [terminals, setTerminals] = useState<GlobalTerminal[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  // Nieuw terminal form
  const [showForm, setShowForm] = useState(false);
  const [fNaam, setFNaam] = useState('');
  const [fSerie, setFSerie] = useState('');
  const [fModel, setFModel] = useState('');
  const [fSaving, setFSaving] = useState(false);

  // Assign modal
  const [assigning, setAssigning] = useState<GlobalTerminal | null>(null);
  const [assignTenantId, setAssignTenantId] = useState('');
  const [assignSaving, setAssignSaving] = useState(false);

  async function load() {
    const [terms, tens] = await Promise.all([getGlobalTerminals(), getTenants()]);
    setTerminals(terms);
    setTenants(tens);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFSaving(true);
    await createGlobalTerminal({
      naam: fNaam, serienummer: fSerie, model: fModel,
      status: 'active', tenantId: null, tafelNummer: '', bedrag: 0,
    });
    setFNaam(''); setFSerie(''); setFModel('');
    setShowForm(false);
    setFSaving(false);
    await load();
  }

  async function handleAssign() {
    if (!assigning) return;
    setAssignSaving(true);
    await assignTerminal(assigning.id, assignTenantId || null);
    setAssigning(null);
    setAssignTenantId('');
    setAssignSaving(false);
    await load();
  }

  async function handleToggleStatus(term: GlobalTerminal) {
    await updateGlobalTerminal(term.id, {
      status: term.status === 'active' ? 'inactive' : 'active',
    });
    await load();
  }

  function tenantName(tenantId: string | null) {
    if (!tenantId) return null;
    return tenants.find(t => t.id === tenantId)?.bedrijfsnaam ?? tenantId;
  }

  return (
    <>
      <PortalHeader title="Tappy Terminals" sub="Alle terminals beheren en toewijzen aan klanten" />

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <div className="bg-[#1E242D] border border-white/5 rounded-xl px-4 py-2 text-sm">
            <span className="text-[#C6FF3B] font-bold">{terminals.length}</span>
            <span className="text-[#8B949E] ml-1">terminals totaal</span>
          </div>
          <div className="bg-[#1E242D] border border-white/5 rounded-xl px-4 py-2 text-sm">
            <span className="text-[#C6FF3B] font-bold">{terminals.filter(t => !t.tenantId).length}</span>
            <span className="text-[#8B949E] ml-1">niet toegewezen</span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm"
        >
          + Terminal toevoegen
        </button>
      </div>

      {/* Nieuw terminal form */}
      {showForm && (
        <div className="bg-[#1E242D] rounded-2xl p-6 border border-[#C6FF3B]/20 mb-6">
          <h2 className="text-sm font-bold text-white mb-4">Nieuwe terminal registreren</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Naam</label>
              <input value={fNaam} onChange={e => setFNaam(e.target.value)} required
                className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50"
                placeholder="bijv. Tappy #001" />
            </div>
            <div>
              <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Serienummer</label>
              <input value={fSerie} onChange={e => setFSerie(e.target.value)}
                className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50"
                placeholder="SN-XXXXXX" />
            </div>
            <div>
              <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Model</label>
              <input value={fModel} onChange={e => setFModel(e.target.value)}
                className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50"
                placeholder="Tappy v1" />
            </div>
            <div className="col-span-3 flex gap-3">
              <button type="submit" disabled={fSaving}
                className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
                {fSaving ? 'Opslaan...' : 'Terminal aanmaken'}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="bg-white/5 text-white px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Annuleren
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-[#8B949E] text-sm">Laden...</div>
      ) : (
        <DataTable
          id="super-terminals"
          columns={[
            { key: 'naam', label: 'Naam', defaultVisible: true },
            { key: 'serienummer', label: 'Serienummer', defaultVisible: true },
            { key: 'model', label: 'Model', defaultVisible: true },
            { key: 'klant', label: 'Klant', defaultVisible: true },
            { key: 'tafelNummer', label: 'Tafel', defaultVisible: false },
            { key: 'status', label: 'Status', defaultVisible: true },
            { key: 'aangemaaktOp', label: 'Aangemaakt', defaultVisible: false },
          ]}
          rows={terminals as unknown as Record<string, unknown>[]}
          renderCell={(row, key) => {
            const term = row as unknown as GlobalTerminal;
            if (key === 'naam') return <span className="font-medium text-white">{term.naam}</span>;
            if (key === 'serienummer') return <span className="text-[#8B949E] font-mono text-xs">{term.serienummer || '—'}</span>;
            if (key === 'model') return <span className="text-[#8B949E]">{term.model || '—'}</span>;
            if (key === 'klant') return term.tenantId
              ? <span className="text-white">{tenantName(term.tenantId)}</span>
              : <span className="text-xs text-[#8B949E] italic">Niet toegewezen</span>;
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
            if (key === 'aangemaaktOp') return <span className="text-[#8B949E]">{term.aangemaaktOp?.toDate().toLocaleDateString('nl-NL')}</span>;
            return null;
          }}
          actions={(row) => {
            const term = row as unknown as GlobalTerminal;
            return (
              <button
                onClick={() => { setAssigning(term); setAssignTenantId(term.tenantId ?? ''); }}
                className="text-xs text-[#C6FF3B] hover:underline whitespace-nowrap"
              >
                {term.tenantId ? 'Hertoewijzen' : 'Toewijzen'} →
              </button>
            );
          }}
        />
      )}

      {/* Assign modal */}
      {assigning && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/10 w-full max-w-md">
            <h2 className="text-white font-bold mb-1">Terminal toewijzen</h2>
            <p className="text-sm text-[#8B949E] mb-5">
              <span className="text-white">{assigning.naam}</span> {assigning.serienummer ? `(${assigning.serienummer})` : ''}
            </p>
            <div className="mb-5">
              <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Klant</label>
              <select
                value={assignTenantId}
                onChange={e => setAssignTenantId(e.target.value)}
                className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50"
              >
                <option value="">— Niet toegewezen —</option>
                {tenants.filter(t => t.status === 'active').map(t => (
                  <option key={t.id} value={t.id}>{t.bedrijfsnaam}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAssign} disabled={assignSaving}
                className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
                {assignSaving ? 'Opslaan...' : 'Opslaan'}
              </button>
              <button onClick={() => setAssigning(null)}
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
