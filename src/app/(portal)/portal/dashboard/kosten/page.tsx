'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/portal/AuthContext';
import { getTenant, getTerminals, getTransactions, type Tenant, type Terminal, type Transaction } from '@/lib/firebase/firestore';
import PortalHeader from '@/components/portal/PortalHeader';

interface MaandData {
  label: string;
  jaar: number;
  maand: number;
  aantalTerminals: number;
  vastKosten: number;
  aantalTransacties: number;
  transactieOmzet: number;
  transactieKosten: number;
  totaal: number;
}

export default function KostenPage() {
  const { tenantId } = useAuth();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenantId) return;
    Promise.all([getTenant(tenantId), getTerminals(tenantId), getTransactions(tenantId)]).then(
      ([t, terms, txs]) => { setTenant(t); setTerminals(terms); setTransactions(txs); setLoading(false); }
    );
  }, [tenantId]);

  function buildMaanden(): MaandData[] {
    if (!tenant) return [];
    const maandenMap = new Map<string, Transaction[]>();
    transactions.forEach(tx => {
      if (!tx.tijdstip) return;
      const d = tx.tijdstip.toDate();
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!maandenMap.has(key)) maandenMap.set(key, []);
      maandenMap.get(key)!.push(tx);
    });

    // Altijd huidige maand tonen, ook zonder transacties
    const now = new Date();
    const huidigeKey = `${now.getFullYear()}-${now.getMonth()}`;
    if (!maandenMap.has(huidigeKey)) maandenMap.set(huidigeKey, []);

    const maanden: MaandData[] = [];
    maandenMap.forEach((txs, key) => {
      const [jaar, maand] = key.split('-').map(Number);
      const d = new Date(jaar, maand, 1);
      const vastKosten = terminals.length * (tenant.pricing?.vastPerTerminal ?? 0);
      const transactieOmzet = txs.reduce((s, tx) => s + tx.bedrag, 0);
      const transactieKosten = transactieOmzet * ((tenant.pricing?.transactieTarief ?? 0) / 100);
      maanden.push({
        label: d.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' }),
        jaar, maand,
        aantalTerminals: terminals.length,
        vastKosten,
        aantalTransacties: txs.length,
        transactieOmzet,
        transactieKosten,
        totaal: vastKosten + transactieKosten,
      });
    });
    return maanden.sort((a, b) => b.jaar !== a.jaar ? b.jaar - a.jaar : b.maand - a.maand);
  }

  const maanden = buildMaanden();

  return (
    <>
      <PortalHeader title="Kosten" sub="Maandelijks overzicht van je Tappy-abonnement" />

      {loading ? (
        <div className="text-[#8B949E] text-sm">Laden...</div>
      ) : (
        <>
          {/* Tarievenoverzicht */}
          {tenant && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#1E242D] rounded-2xl p-5 border border-white/5">
                <div className="text-xs text-[#8B949E] uppercase tracking-wide mb-1">Vast tarief per terminal</div>
                <div className="text-2xl font-bold text-white">€{tenant.pricing?.vastPerTerminal?.toFixed(2) ?? '—'}<span className="text-sm font-normal text-[#8B949E]">/maand</span></div>
              </div>
              <div className="bg-[#1E242D] rounded-2xl p-5 border border-white/5">
                <div className="text-xs text-[#8B949E] uppercase tracking-wide mb-1">Transactietarief</div>
                <div className="text-2xl font-bold text-white">{tenant.pricing?.transactieTarief ?? '—'}<span className="text-sm font-normal text-[#8B949E]">%</span></div>
              </div>
            </div>
          )}

          {/* Maandoverzichten */}
          <div className="flex flex-col gap-4">
            {maanden.length === 0 ? (
              <div className="text-[#8B949E] text-sm">Geen kostendata beschikbaar.</div>
            ) : maanden.map((m) => (
              <div key={`${m.jaar}-${m.maand}`} className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <span className="font-bold text-white capitalize">{m.label}</span>
                  <span className="text-[#C6FF3B] font-bold text-lg">€{m.totaal.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/5">
                  <div className="px-6 py-4">
                    <div className="text-xs text-[#8B949E] uppercase tracking-wide mb-1">Vaste kosten</div>
                    <div className="text-white font-bold">€{m.vastKosten.toFixed(2)}</div>
                    <div className="text-xs text-[#8B949E] mt-0.5">{m.aantalTerminals} terminal{m.aantalTerminals !== 1 ? 's' : ''} × €{tenant?.pricing?.vastPerTerminal?.toFixed(2)}</div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="text-xs text-[#8B949E] uppercase tracking-wide mb-1">Transactiekosten</div>
                    <div className="text-white font-bold">€{m.transactieKosten.toFixed(2)}</div>
                    <div className="text-xs text-[#8B949E] mt-0.5">{m.aantalTransacties} transacties · €{m.transactieOmzet.toFixed(2)} omzet</div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="text-xs text-[#8B949E] uppercase tracking-wide mb-1">Totaal</div>
                    <div className="text-[#C6FF3B] font-bold">€{m.totaal.toFixed(2)}</div>
                    <div className="text-xs text-[#8B949E] mt-0.5">incl. BTW</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
