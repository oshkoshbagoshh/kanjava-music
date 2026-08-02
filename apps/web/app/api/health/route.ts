import { NextResponse } from 'next/server';
import { STUB_RELEASE } from '@/lib/stub-api';

export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: 'stub',
    release: STUB_RELEASE,
  });
}
