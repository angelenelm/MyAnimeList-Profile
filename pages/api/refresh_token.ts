import type { NextApiRequest, NextApiResponse } from 'next';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { refresh_token } = req.query;

  const response = await fetch(`https://myanimelist.net/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: `${refresh_token}`,
    }),
  });

  const data = await response.json();
  res.send(data);
};

export default handler;
