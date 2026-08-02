import { NextResponse } from 'next/server';

export const STUB_RELEASE = '1';

export function stubNotImplemented() {
  return NextResponse.json(
    {
      error:
        'Not implemented in Vercel stub; use local Docker stack until Release 2.',
      stub: true,
      release: STUB_RELEASE,
    },
    { status: 501 },
  );
}

export function stubListResponse(key: string) {
  return NextResponse.json({
    [key]: [],
    count: 0,
    stub: true,
    release: STUB_RELEASE,
  });
}
