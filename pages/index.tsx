import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getCookies } from 'cookies-next';
import styles from '../styles/Home.module.css';
import deleteAuthCookies from '../utils/deleteAuthCookies';

export const getServerSideProps = async ({ req, res }) => {
  const { access_token, refresh_token } = getCookies({ req, res });

  // If refresh_token exists, user logged in recently and should
  // be redirected to their profile page. Will refresh access_token
  // first if expired
  if (access_token) {
    const response = await fetch(`https://api.myanimelist.net/v2/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();

    return {
      redirect: {
        permanent: false,
        destination: `/profile/${data.name}`,
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
