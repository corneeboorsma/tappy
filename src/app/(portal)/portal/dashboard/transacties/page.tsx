'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/portal/AuthContext';
import { getTransactions, getTerminals, type Transaction, type Terminal } from '@/lib/firebase/firestore';
import PortalHeader from '@/components/portal/PortalHeader';

export default function TransactiesPage() {
  const { tenantId } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTerminal, setFilterTerminal] = useState('');

  useEffect(() => {
    if (!tenantId) return;
    Promise.all([getTransactions(tenantId), getTerminals(tenantId)]).then(([txs, terms]) => {
      setTransactions(txs);
      setTerminals(terms);
      setLoading(false);
    });
  }, [tenantId]);

  const filtered = filterTerminal
    ? transactions.filter(tx => tx.terminalId === filterTerminal)
    : transactions;

  const totaal = filtered.reduce((sum, tx) => sum + tx.bedrag, 0);

  return (
    <>
      <PortalHeader title="Transacties" sub="Overzicht van alle betalingen per terminal" />

      <div className="flex items-center gap-4 mb-6">
        <select value={filterTerminal} onChange={e => setFilterTerminal(e.target.value)}
          className="bg-[#1E242D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6FF3B]/50 transition-colors">
          <option value="">Alle terminals</option>
          {terminals.map(t => <option key={t.id} value={t.id}>{t.naam}</option>)}
        </select>
        <div className="bg-[#1E242D] border border-white/5 rounded-xl px-4 py-2.5 text-sm">
          <span className="text-[#8B949E]">Totaal: </span>
          <span className="text-[#C6FF3B] font-bold">€{totaal.toFixed(2)}</span>
          <span className="text-[#8B949E] ml-2">({filtered.length} transacties)</span>
        </div>
      </div>

      {loading ? (
        <div className="text-[#8B949E] text-sm">Laden...</div>
      ) : (
        <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Terminal</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Bedrag</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Betaalmethode</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Datum</th>
                <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Tijdstip</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-[#8B949E] text-sm">Geen transacties gevonden.</td></tr>
              ) : filtered.map(tx => {
                const terminal = terminals.find(t => t.id === tx.terminalId);
                const d = tx.tijdstip?.toDate();
                return (
                  <tr key={tx.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 text-sm text-white">{terminal?.naam ?? '—'}</td>
                    <td className="px-5 py-3 text-sm font-bold text-[#C6FF3B]">€{tx.bedrag.toFixed(2)}</td>
                    <td className="px-5 py-3 text-sm text-[#8B949E]">{tx.betaalmethode || 'NFC'}</td>
                    <td className="px-5 py-3 text-sm text-[#8B949E]">{d?.toLocaleDateString('nl-NL')}</td>
                    <td className="px-5 py-3 text-sm text-[#8B949E]">{d?.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
