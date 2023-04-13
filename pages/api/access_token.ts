import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const access_token = getCookie('access_token', { req, res });
  if (access_token) {
    res.status(200).json({ access_token: access_token });
  } else {
    res.status(500).json({ error: 'Unable to obtain access token' });
  }
};

export default handler;
