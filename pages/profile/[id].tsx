import type { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getProfile } from '../api/login';
import { getCookies, deleteCookie } from 'cookies-next';
import styles from '../../styles/Profile.module.css';

export const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { id: string };
}) => {
  const { req, res, params } = context;
  const { access_token, refresh_token } = getCookies({ req, res });
  const profile = await getProfile(req, res);

  // Delete cookies only used for authentication
  deleteCookie('state', { req, res });
  deleteCookie('code_verifier', { req, res });

  // Check if id in URL matches profile name and if token cookies exist
  // if not, redirect to profile/[id] URL with correct profile name
  if (params.id !== profile.name && access_token && refresh_token) {
    return {
      redirect: {
        permanent: false,
        destination: `${profile.name}`,
      },
    };
  }

  // If token cookies don't exist, should be redirected to / to log in
  if (!access_token || !refresh_token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  } else {
    return {
      props: { profile },
    };
  }
};

const Profile = (props: { profile: any }) => {
  const { profile } = props;
  const title = `MyAnimeList Stats | ${profile.name}`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{profile.name}</h1>
        <Link href='/api/logout'>Logout</Link>
      </main>
    </div>
  );
};

export default Profile;
