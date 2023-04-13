import { deleteCookie } from 'cookies-next';

const handler = (req, res) => {
  deleteCookie('access_token', { req, res });
  deleteCookie('refresh_token', { req, res });
  deleteCookie('code_verifier', { req, res });
  deleteCookie('state', { req, res });

  res.redirect('http://localhost:3000');
};

export default handler;
