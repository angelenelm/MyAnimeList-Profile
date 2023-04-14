import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import getProfile from '../utils/getProfile';
import { getCookies } from 'cookies-next';
import styles from '../styles/Home.module.css';
import deleteAuthCookies from '../utils/deleteAuthCookies';

export const getServerSideProps = async ({ req, res }) => {
  const { access_token, refresh_token } = getCookies({ req, res });

  // If access_token and refresh_token cookies exist,
  // user is logged in and should be redirected to profile/[id]
  if (access_token && refresh_token) {
    const profile = await getProfile(req, res);

    return {
      redirect: {
        permanent: false,
        destination: `/profile/${profile.name}`,
      },
    };
  } else {
    // Cleans up cookies used for authentication
    // if user did not complete login flow
    deleteAuthCookies(req, res);

    return {
      props: {},
    };
  }
};

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MyAnimeList Stats</title>
        <meta
          name='description'
          content='A web app for visualizing MyAnimeList user data with fun charts!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>MyAnimeList Stats</h1>
        <h2>
          by{' '}
          <a
            href='https://github.com/angelenelm'
            target='_blank'
            rel='noopener noreferrer'>
            @angelenelm
          </a>
        </h2>
        <Link href='/api/login'>Login</Link>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
