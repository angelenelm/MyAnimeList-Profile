import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

const deleteAuthCookies = (req: NextApiRequest, res: NextApiResponse) => {
  // Delete cookies only used for authentication
  deleteCookie('state', { req, res });
  deleteCookie('code_verifier', { req, res });
};

export default deleteAuthCookies;
