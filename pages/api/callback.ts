import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { getProfile } from '../api/login';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const codeVerifierCookie = getCookie('code_verifier', { req, res });
  const stateCookie = getCookie('state', { req, res });
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (stateCookie === state) {
    const response = await fetch(`https://myanimelist.net/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: `${code}`,
        redirect_uri: REDIRECT_URI,
        code_verifier: `${codeVerifierCookie}`,
      }),
    });

    const data = await response.json();
    const { expires_in, access_token, refresh_token } = data;

    // access_token expires 1 hour from request time
    // refresh_token expires 1 month from request time
    const now = new Date();
    const accessTokenExpiresIn = now.getTime() + expires_in;
    const refreshTokenExpiresIn = new Date(now.setMonth(now.getMonth() + 1));
    setCookie('access_token', access_token, {
      req,
      res,
      expires: new Date(accessTokenExpiresIn),
    });
    setCookie('refresh_token', refresh_token, {
      req,
      res,
      expires: refreshTokenExpiresIn,
    });

    const profile = await getProfile(req, res);

    res.redirect(`http://localhost:3000/profile/${profile.name}`);
  } else {
    res.redirect('http://localhost:3000/');
  }
};

export default handler;
