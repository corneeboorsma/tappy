import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
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
