import { stubListResponse, stubNotImplemented } from '@/lib/stub-api';

export async function GET() {
  return stubListResponse('results');
}

export async function POST() {
  return stubNotImplemented();
}
