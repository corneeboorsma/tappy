import { adminDb } from '@/lib/firebase/admin';
import type { UserRole } from '@/lib/firebase/firestore';

export async function getSessionRole(sessionUid: string | undefined): Promise<UserRole | null> {
  if (!sessionUid) return null;
  try {
    const doc = await adminDb.collection('users').doc(sessionUid).get();
    if (!doc.exists) return null;
    return (doc.data()?.role as UserRole) ?? null;
  } catch {
    return null;
  }
}
