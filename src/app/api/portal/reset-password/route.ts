import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { getSessionRole } from '@/lib/portal/requireRole';

export async function POST(req: NextRequest) {
  const sessionUid = req.cookies.get('tappy-session')?.value;
  const role = await getSessionRole(sessionUid);
  if (role !== 'super_admin') {
    return NextResponse.json({ error: 'Niet bevoegd' }, { status: 403 });
  }

  try {
    const { uid, password } = await req.json();
    if (!uid || !password) {
      return NextResponse.json({ error: 'uid en password zijn verplicht' }, { status: 400 });
    }

    await adminAuth.updateUser(uid, { password });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Onbekende fout';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
