import { setCookie, getCookie } from 'cookies-next';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const handler = async (req, res) => {
  const codeVerifierCookie = getCookie('code_verifier', { req, res });
  const stateCookie = getCookie('state', { req, res });
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (stateCookie === state) {
    const response = await fetch(`https://myanimelist.net/v1/oauth2/token`, {
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
        code_verifier: codeVerifierCookie,
      }),
    });

    const data = await response.json();
    const { token_type, expires_in, access_token, refresh_token } = data;
    const expires = new Date().getTime() + expires_in;
    setCookie('access_token', access_token, {
      req,
      res,
      expires: new Date(expires),
    });
    setCookie('refresh_token', refresh_token, { req, res });

    const user = await fetch(`https://api.myanimelist.net/v2/users/@me`, {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    const { name } = await user.json();

    res.redirect(`http://localhost:3000/profile/${name}`);
  } else {
    res.redirect('http://localhost:3000/api/login');
  }
};

export default handler;
