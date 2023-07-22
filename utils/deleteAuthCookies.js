import { deleteCookie } from 'cookies-next';

export default function deleteAuthCookies(req, res) {
  // Delete cookies used for authentication
  deleteCookie('state', { req, res });
  deleteCookie('code_verifier', { req, res });
}
