import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

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
        <a href='http://localhost:3000/api/login'>Login</a>
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
