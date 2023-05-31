import Head from 'next/head';
import Link from 'next/link';
import { getCookies } from 'cookies-next';
import deleteAuthCookies from '../utils/deleteAuthCookies';
import styles from '../styles/Home.module.css';

export async function getServerSideProps({ req, res }) {
  const { access_token } = getCookies({ req, res });

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
    // Cleans up cookies used for authentication if user did not complete login flow
    deleteAuthCookies(req, res);

    return {
      props: {},
    };
  }
}

export default function Home() {
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
          {`by `}
          <a
            href='https://github.com/angelenelm'
            target='_blank'
            rel='noopener noreferrer'>
            @angelenelm
          </a>
        </h2>
        <Link href='/api/login'>Login</Link>
      </main>
    </div>
  );
}
