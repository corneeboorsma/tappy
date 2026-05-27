'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { createTenant, createPortalUser } from '@/lib/firebase/firestore';
import PortalHeader from '@/components/portal/PortalHeader';
import Link from 'next/link';
import { useAuth } from '@/lib/portal/AuthContext';

interface FormData {
  bedrijfsnaam: string;
  adres: string;
  kvk: string;
  iban: string;
  btwNummer: string;
  contactNaam: string;
  contactEmail: string;
  contactTelefoon: string;
  vastPerTerminal: string;
  transactieTarief: string;
  loginEmail: string;
  loginWachtwoord: string;
}

const empty: FormData = {
  bedrijfsnaam: '', adres: '', kvk: '', iban: '', btwNummer: '',
  contactNaam: '', contactEmail: '', contactTelefoon: '',
  vastPerTerminal: '', transactieTarief: '',
  loginEmail: '', loginWachtwoord: '',
};

export default function NieuweKlantPage() {
  const { role, loading: authLoading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!authLoading && role !== 'super_admin') {
      router.replace('/portal/dashboard');
    }
  }, [role, authLoading, router]);

  if (authLoading || role !== 'super_admin') return null;

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      // 1. Maak tenant aan in Firestore
      const tenantId = await createTenant({
        bedrijfsnaam: form.bedrijfsnaam,
        adres: form.adres,
        kvk: form.kvk,
        iban: form.iban,
        btwNummer: form.btwNummer,
        contactNaam: form.contactNaam,
        contactEmail: form.contactEmail,
        contactTelefoon: form.contactTelefoon,
        locaties: [],
        pricing: {
          vastPerTerminal: parseFloat(form.vastPerTerminal) || 0,
          transactieTarief: parseFloat(form.transactieTarief) || 0,
        },
        status: 'active',
      });
      // 2. Maak Firebase Auth gebruiker aan
      const cred = await createUserWithEmailAndPassword(auth, form.loginEmail, form.loginWachtwoord);
      // 3. Sla gebruiker op in Firestore
      await createPortalUser(cred.user.uid, {
        role: 'admin',
        tenantId,
        email: form.loginEmail,
      });
      setSuccess(`Klant aangemaakt. Login: ${form.loginEmail} / ${form.loginWachtwoord}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis.');
    } finally {
      setSaving(false);
    }
  }

  if (success) {
    return (
      <>
        <PortalHeader title="Klant aangemaakt" />
        <div className="max-w-lg">
          <div className="bg-[#C6FF3B]/10 border border-[#C6FF3B]/30 rounded-2xl p-6 mb-6">
            <div className="text-[#C6FF3B] font-bold mb-2">✓ Klant succesvol aangemaakt</div>
            <div className="text-sm text-[#8B949E] mb-4">Geef de klant de volgende inloggegevens:</div>
            <div className="bg-[#0D1117] rounded-xl p-4 text-sm font-mono">
              <div className="text-[#8B949E]">E-mail: <span className="text-white">{form.loginEmail}</span></div>
              <div className="text-[#8B949E] mt-1">Wachtwoord: <span className="text-white">{form.loginWachtwoord}</span></div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/portal/super" className="bg-[#C6FF3B] text-[#0D1117] font-bold px-5 py-2.5 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm">
              Terug naar overzicht
            </Link>
            <button onClick={() => { setForm(empty); setSuccess(''); }} className="bg-white/5 text-white px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Nieuwe klant
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PortalHeader title="Klant aanmaken" sub="Vul de gegevens in om een nieuwe klant te registreren" />
      <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-8">

        {/* Bedrijfsgegevens */}
        <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
          <h2 className="text-sm font-bold text-white mb-5">Bedrijfsgegevens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Bedrijfsnaam" value={form.bedrijfsnaam} onChange={v => set('bedrijfsnaam', v)} required />
            <Field label="Adres" value={form.adres} onChange={v => set('adres', v)} required />
            <Field label="KVK-nummer" value={form.kvk} onChange={v => set('kvk', v)} />
            <Field label="IBAN" value={form.iban} onChange={v => set('iban', v)} />
            <Field label="BTW-nummer" value={form.btwNummer} onChange={v => set('btwNummer', v)} />
          </div>
        </section>

        {/* Contactpersoon */}
        <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
          <h2 className="text-sm font-bold text-white mb-5">Contactpersoon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Naam" value={form.contactNaam} onChange={v => set('contactNaam', v)} required />
            <Field label="E-mailadres" type="email" value={form.contactEmail} onChange={v => set('contactEmail', v)} required />
            <Field label="Telefoonnummer" value={form.contactTelefoon} onChange={v => set('contactTelefoon', v)} />
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
          <h2 className="text-sm font-bold text-white mb-5">Tarieven</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Vast tarief per terminal (€/maand)" type="number" value={form.vastPerTerminal} onChange={v => set('vastPerTerminal', v)} placeholder="9.95" />
            <Field label="Transactietarief (%)" type="number" value={form.transactieTarief} onChange={v => set('transactieTarief', v)} placeholder="1.5" />
          </div>
        </section>

        {/* Login */}
        <section className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
          <h2 className="text-sm font-bold text-white mb-1">Inloggegevens klant</h2>
          <p className="text-xs text-[#8B949E] mb-5">Deze gegevens geef je door aan de klant om in te loggen op het portal.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="E-mailadres" type="email" value={form.loginEmail} onChange={v => set('loginEmail', v)} required />
            <Field label="Tijdelijk wachtwoord" value={form.loginWachtwoord} onChange={v => set('loginWachtwoord', v)} required placeholder="Min. 8 tekens" />
          </div>
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">{error}</div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-[#C6FF3B] text-[#0D1117] font-bold px-6 py-3 rounded-xl hover:bg-[#d4ff5a] transition-colors text-sm disabled:opacity-50">
            {saving ? 'Aanmaken...' : 'Klant aanmaken'}
          </button>
          <Link href="/portal/super" className="bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
            Annuleren
          </Link>
        </div>
      </form>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C6FF3B]/50 transition-colors"
      />
    </div>
  );
}
