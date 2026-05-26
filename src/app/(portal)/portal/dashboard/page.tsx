'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/portal/AuthContext';
import { getTerminals, getTransactions, type Terminal, type Transaction } from '@/lib/firebase/firestore';
import PortalHeader from '@/components/portal/PortalHeader';
import StatCard from '@/components/portal/StatCard';
import Link from 'next/link';

export default function AdminDashboard() {
  const { tenantId } = useAuth();
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenantId) return;
    Promise.all([getTerminals(tenantId), getTransactions(tenantId)]).then(([terms, txs]) => {
      setTerminals(terms);
      setTransactions(txs);
      setLoading(false);
    });
  }, [tenantId]);

  const actief = terminals.filter(t => t.status === 'active').length;
  const vandaag = new Date().toDateString();
  const vandaagTxs = transactions.filter(tx => tx.tijdstip?.toDate().toDateString() === vandaag);
  const omzetVandaag = vandaagTxs.reduce((sum, tx) => sum + tx.bedrag, 0);
  const omzetTotaal = transactions.reduce((sum, tx) => sum + tx.bedrag, 0);

  return (
    <>
      <PortalHeader title="Dashboard" sub="Realtime overzicht van je Tappy-terminals" />
      {loading ? (
        <div className="text-[#8B949E] text-sm">Laden...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Actieve terminals" value={actief} sub={`van ${terminals.length} totaal`} />
            <StatCard label="Transacties vandaag" value={vandaagTxs.length} />
            <StatCard label="Omzet vandaag" value={`€${omzetVandaag.toFixed(2)}`} accent />
            <StatCard label="Totale omzet" value={`€${omzetTotaal.toFixed(2)}`} />
          </div>

          {/* Recente transacties */}
          <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden mb-6">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <span className="text-sm font-bold text-white">Recente transacties</span>
              <Link href="/portal/dashboard/transacties" className="text-xs text-[#C6FF3B] hover:underline">Alles bekijken →</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Terminal</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Bedrag</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Methode</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Tijdstip</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).length === 0 ? (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-[#8B949E] text-sm">Nog geen transacties.</td></tr>
                ) : transactions.slice(0, 5).map(tx => {
                  const terminal = terminals.find(t => t.id === tx.terminalId);
                  return (
                    <tr key={tx.id} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3 text-sm text-white">{terminal?.naam ?? tx.terminalId}</td>
                      <td className="px-5 py-3 text-sm font-bold text-[#C6FF3B]">€{tx.bedrag.toFixed(2)}</td>
                      <td className="px-5 py-3 text-sm text-[#8B949E]">{tx.betaalmethode || 'NFC'}</td>
                      <td className="px-5 py-3 text-sm text-[#8B949E]">{tx.tijdstip?.toDate().toLocaleString('nl-NL')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Terminals quick view */}
          <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <span className="text-sm font-bold text-white">Terminals</span>
              <Link href="/portal/dashboard/terminals" className="text-xs text-[#C6FF3B] hover:underline">Beheren →</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Naam</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Tafel</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Bedrag</th>
                  <th className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {terminals.length === 0 ? (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-[#8B949E] text-sm">Nog geen terminals.</td></tr>
                ) : terminals.map(term => (
                  <tr key={term.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3 text-sm text-white">{term.naam}</td>
                    <td className="px-5 py-3 text-sm text-[#8B949E]">{term.tafelNummer || '—'}</td>
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
        </>
      )}
    </>
  );
}
