'use client';
import { useAuth } from '@/lib/portal/AuthContext';

interface PortalHeaderProps {
  title: string;
  sub?: string;
}

export default function PortalHeader({ title, sub }: PortalHeaderProps) {
  const { user, role } = useAuth();
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {sub && <p className="text-sm text-[#8B949E] mt-1">{sub}</p>}
      </div>
      <div className="text-right">
        <div className="text-sm text-white">{user?.email}</div>
        <div className="text-xs text-[#8B949E]">
          {role === 'super_admin' ? 'Super Admin' : 'Beheerder'}
        </div>
      </div>
    </div>
  );
}
