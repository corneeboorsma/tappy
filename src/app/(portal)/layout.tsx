import { AuthProvider } from '@/lib/portal/AuthContext';
import Sidebar from '@/components/portal/Sidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-[#0D1117] text-[#F5F7FA]">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
