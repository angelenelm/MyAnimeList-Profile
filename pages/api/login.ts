import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, getCookies } from 'cookies-next';
import Randomstring from 'randomstring';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const code_verifier = Randomstring.generate(128);
const state = Randomstring.generate(16);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  setCookie('state', state, { req, res });
  setCookie('code_verifier', code_verifier, { req, res });

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    state: state,
    redirect_uri: REDIRECT_URI,
    code_challenge: code_verifier,
  });

  res.redirect(`https://myanimelist.net/v1/oauth2/authorize?${params}`);
};

// Obtains information for logged-in user
// Refreshes access and refresh token when current access token expires
// Cleans up cookies and redirects to home page if refresh token expires
export const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  let { access_token, refresh_token } = getCookies({ req, res });

  // First refresh access token if expired (no longer exists in browser)
  if (!access_token) {
    // If refresh token also expired, logout
    if (!refresh_token) {
    } else {
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

      // data should contain new access token, refresh token,
      // expires_in, and token_type
      const data = await response.json();

      // Set cookies with new access and refresh tokens
      const expires = new Date().getTime() + data.expires_in;
      setCookie('access_token', data.access_token, {
        req,
        res,
        expires: new Date(expires),
      });
      setCookie('refresh_token', data.refresh_token, { req, res });
    }
  }

  // Access token and refresh token should be valid here,
  // so we can now fetch user data to build the user profile
  interface Profile {
    name: string;
    location?: string;
    joined_at?: string;
    picture?: string;
  }

  let profile = {} as Profile;

  // Get user's username, location, join date, and picture
  const userInfo = await fetch(`https://api.myanimelist.net/v2/users/@me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const { name, location, joined_at, picture } = await userInfo.json();

  profile.name = name;
  profile.location = location;
  profile.joined_at = joined_at;
  profile.picture = picture;

  return profile;
};

export default handler;
