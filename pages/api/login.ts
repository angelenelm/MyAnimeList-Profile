import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, getCookies } from 'cookies-next';
import Randomstring from 'randomstring';

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

const code_verifier = Randomstring.generate(128);
const state = Randomstring.generate(16);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  setCookie('state', state, { req, res, httpOnly: true });
  setCookie('code_verifier', code_verifier, { req, res, httpOnly: true });

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    state: state,
    redirect_uri: REDIRECT_URI,
    code_challenge: code_verifier,
  });

  res.redirect(`https://myanimelist.net/v1/oauth2/authorize?${params}`);
};

export default handler;
