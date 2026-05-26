'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/portal/AuthContext';
import { getTerminals, updateTerminal, type Terminal } from '@/lib/firebase/firestore';
import PortalHeader from '@/components/portal/PortalHeader';

export default function TerminalsPage() {
  const { tenantId } = useAuth();
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editBedrag, setEditBedrag] = useState('');
  const [editNaam, setEditNaam] = useState('');

  useEffect(() => {
    if (!tenantId) return;
    getTerminals(tenantId).then(t => { setTerminals(t); setLoading(false); });
  }, [tenantId]);

  function startEdit(term: Terminal) {
    setEditing(term.id);
    setEditBedrag(String(term.bedrag));
    setEditNaam(term.naam);
  }

  async function saveEdit(termId: string) {
    if (!tenantId) return;
    await updateTerminal(tenantId, termId, {
      naam: editNaam,
      bedrag: parseFloat(editBedrag) || 0,
    });
    const updated = await getTerminals(tenantId);
    setTerminals(updated);
    setEditing(null);
  }

  async function toggleStatus(term: Terminal) {
    if (!tenantId) return;
    await updateTerminal(tenantId, term.id, {
      status: term.status === 'active' ? 'inactive' : 'active',
    });
    const updated = await getTerminals(tenantId);
    setTerminals(updated);
  }

  return (
    <>
      <PortalHeader title="Terminals" sub="Beheer je Tappy-terminals, stel bedragen in en activeer of deactiveer" />
      {loading ? (
        <div className="text-[#8B949E] text-sm">Laden...</div>
      ) : (
        <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Naam</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Tafel</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Serienummer</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Bedrag (€)</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {terminals.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8B949E] text-sm">Nog geen terminals.</td></tr>
              ) : terminals.map(term => (
                <tr key={term.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    {editing === term.id ? (
                      <input value={editNaam} onChange={e => setEditNaam(e.target.value)}
                        className="bg-[#0D1117] border border-[#C6FF3B]/40 rounded-lg px-3 py-1.5 text-sm text-white w-32 focus:outline-none" />
                    ) : (
                      <span className="text-sm text-white">{term.naam}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-sm text-[#8B949E]">{term.tafelNummer || '—'}</td>
                  <td className="px-5 py-3 text-sm text-[#8B949E]">{term.serienummer || '—'}</td>
                  <td className="px-5 py-3">
                    {editing === term.id ? (
                      <input type="number" value={editBedrag} onChange={e => setEditBedrag(e.target.value)}
                        className="bg-[#0D1117] border border-[#C6FF3B]/40 rounded-lg px-3 py-1.5 text-sm text-white w-24 focus:outline-none" />
                    ) : (
                      <span className="text-sm text-white">€{term.bedrag?.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleStatus(term)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        term.status === 'active'
                          ? 'bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                          : 'bg-white/5 text-[#8B949E] border-white/10 hover:bg-[#C6FF3B]/10 hover:text-[#C6FF3B] hover:border-[#C6FF3B]/20'
                      }`}>
                      {term.status === 'active' ? 'Actief' : 'Inactief'}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {editing === term.id ? (
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => saveEdit(term.id)} className="text-xs bg-[#C6FF3B] text-[#0D1117] font-bold px-3 py-1.5 rounded-lg hover:bg-[#d4ff5a] transition-colors">Opslaan</button>
                        <button onClick={() => setEditing(null)} className="text-xs bg-white/5 text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">Annuleren</button>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(term)} className="text-xs text-[#C6FF3B] hover:underline">Bewerken</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
