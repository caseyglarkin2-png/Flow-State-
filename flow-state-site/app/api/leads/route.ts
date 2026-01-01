import { handleLeadPost } from '@/lib/api/leadHandler';

export async function POST(req: Request) {
  return handleLeadPost(req);
}
