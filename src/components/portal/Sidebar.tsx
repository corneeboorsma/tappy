'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/portal/AuthContext';

const superAdminNav = [
  { href: '/portal/super', label: 'Dashboard', icon: '⬛' },
  { href: '/portal/super/klanten/nieuw', label: 'Klant aanmaken', icon: '＋' },
];

const adminNav = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: '⬛' },
  { href: '/portal/dashboard/terminals', label: 'Terminals', icon: '📟' },
  { href: '/portal/dashboard/transacties', label: 'Transacties', icon: '💳' },
  { href: '/portal/dashboard/kosten', label: 'Kosten', icon: '📊' },
];

export default function Sidebar() {
  const { role } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const nav = role === 'super_admin' ? superAdminNav : adminNav;

  async function handleLogout() {
    document.cookie = 'tappy-session=; path=/; max-age=0';
    await logout();
    router.push('/portal/login');
  }

  return (
    <aside className="w-56 shrink-0 bg-[#1E242D] border-r border-white/5 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/">
          <Image src="/images/tappy-logo-dark.png" alt="Tappy" width={72} height={20} />
        </Link>
        <div className="text-[10px] text-[#8B949E] mt-1 uppercase tracking-wide">
          {role === 'super_admin' ? 'Super Admin' : 'Portal'}
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== '/portal/super' && item.href !== '/portal/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#C6FF3B]/10 text-[#C6FF3B]'
                  : 'text-[#8B949E] hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#8B949E] hover:text-white hover:bg-white/5 transition-colors"
        >
          <span>↩</span> Uitloggen
        </button>
      </div>
    </aside>
  );
}
