const randomstring = require('randomstring');

export const CLIENT_ID = process.env.CLIENT_ID;
export const REDIRECT_URI = process.env.REDIRECT_URI;

const random = randomstring.generate(128);
export const code_verifier = random;

const state = randomstring.generate(16);

export default function handler(req, res) {
  console.log(`/login: ${code_verifier}`);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    state: state,
    redirect_uri: REDIRECT_URI,
    code_challenge: code_verifier,
  });

  res.redirect(`https://myanimelist.net/v1/oauth2/authorize?${params}`);
}
