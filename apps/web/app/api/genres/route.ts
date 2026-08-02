import { stubListResponse } from '@/lib/stub-api';

export async function GET() {
  return stubListResponse('genres');
}
