import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getSessionRole } from '@/lib/portal/requireRole';

export async function POST(req: NextRequest) {
  const sessionUid = req.cookies.get('tappy-session')?.value;
  const role = await getSessionRole(sessionUid);
  if (role !== 'super_admin') {
    return NextResponse.json({ error: 'Niet bevoegd' }, { status: 403 });
  }

  try {
    const { email, password, tenantId } = await req.json();
    if (!email || !password || !tenantId) {
      return NextResponse.json({ error: 'email, password en tenantId zijn verplicht' }, { status: 400 });
    }

    const userRecord = await adminAuth.createUser({ email, password });
    await adminDb.collection('users').doc(userRecord.uid).set({
      role: 'admin',
      tenantId,
      email,
    });

    return NextResponse.json({ uid: userRecord.uid });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Onbekende fout';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
