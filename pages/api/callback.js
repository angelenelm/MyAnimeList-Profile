import { CLIENT_ID, REDIRECT_URI, code_verifier } from './login';
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export default async function handler(req, res) {
  console.log(`/callback: ${code_verifier}`);

  const code = req.query.code || null;

  const response = await fetch('https://myanimelist.net/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: code_verifier,
    }),
  });

  const data = await response.json();

  res.send(data);
}
