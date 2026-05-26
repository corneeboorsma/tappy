import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid');
  if (!uid) return NextResponse.json({ error: 'uid vereist' }, { status: 400 });
  try {
    const user = await adminAuth.getUser(uid);
    return NextResponse.json({ disabled: user.disabled });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Onbekende fout';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
