import { NextResponse } from 'next/server';
import { STUB_RELEASE } from '@/lib/stub-api';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Authentication required.',
      stub: true,
      release: STUB_RELEASE,
    },
    { status: 401 },
  );
}
