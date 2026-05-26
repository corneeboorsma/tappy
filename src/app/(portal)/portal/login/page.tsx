'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { getPortalUser } from '@/lib/firebase/firestore';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // Set session cookie for middleware
      document.cookie = `tappy-session=${cred.user.uid}; path=/; max-age=86400; SameSite=Strict`;
      // Get role and redirect
      const portalUser = await getPortalUser(cred.user.uid);
      const redirect = searchParams.get('redirect');
      if (redirect) {
        router.push(redirect);
      } else if (portalUser?.role === 'super_admin') {
        router.push('/portal/super');
      } else {
        router.push('/portal/dashboard');
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('Ongeldig e-mailadres of wachtwoord.');
      } else if (code === 'auth/invalid-api-key') {
        setError('Configuratiefout: Firebase API key ontbreekt.');
      } else if (code === 'auth/operation-not-allowed') {
        setError('E-mail/wachtwoord login is niet ingeschakeld in Firebase Console.');
      } else if (code === 'auth/network-request-failed') {
        setError('Netwerkfout. Controleer je verbinding.');
      } else {
        setError(`Fout: ${code ?? 'onbekend'}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image src="/images/tappy-logo-dark.png" alt="Tappy" width={96} height={27} />
        </div>
        <div className="bg-[#1E242D] rounded-3xl p-8 border border-white/5">
          <h1 className="text-xl font-bold text-white mb-1">Inloggen</h1>
          <p className="text-sm text-[#8B949E] mb-8">Toegang tot je Tappy-portal</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">E-mailadres</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C6FF3B]/50 transition-colors"
                placeholder="naam@bedrijf.nl"
              />
            </div>
            <div>
              <label className="text-xs text-[#8B949E] uppercase tracking-wide mb-1.5 block">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C6FF3B]/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C6FF3B] text-[#0D1117] font-bold py-3 rounded-xl hover:bg-[#d4ff5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-white/20 mt-6">© 2025 Tappy</p>
      </div>
    </div>
  );
}
