import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default function deleteAuthCookies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Delete cookies used for authentication
  deleteCookie('state', { req, res });
  deleteCookie('code_verifier', { req, res });
}
