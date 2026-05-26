import { AuthProvider } from '@/lib/portal/AuthContext';
import { Suspense } from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Suspense>
        {children}
      </Suspense>
    </AuthProvider>
  );
}
