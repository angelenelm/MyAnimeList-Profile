import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, setCookie } from 'cookies-next';
import deleteAuthCookies from '../../utils/deleteAuthCookies';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const BASE_URL = process.env.BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const codeVerifierCookie = getCookie('code_verifier', { req, res });
  const stateCookie = getCookie('state', { req, res });
  const code = req.query.code || null;
  const state = req.query.state || null;

  // Clean up cookies only used for authentication
  deleteAuthCookies(req, res);

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

    const now = new Date();
    const accessTokenExpiresIn = new Date(now.getTime() + data.expires_in);
    const refreshTokenExpiresIn = new Date(now.setMonth(now.getMonth() + 1));

    setCookie('access_token', data.access_token, {
      req,
      res,
      expires: accessTokenExpiresIn,
      httpOnly: true,
    });

    setCookie('refresh_token', data.refresh_token, {
      req,
      res,
      expires: refreshTokenExpiresIn,
      httpOnly: true,
    });

    const malResponse = await fetch(
      `https://api.myanimelist.net/v2/users/@me`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );
    const user = await malResponse.json();

    res.redirect(`${BASE_URL}/profile/${user.name}`);
  } else {
    res.redirect(`${BASE_URL}`);
  }
}
