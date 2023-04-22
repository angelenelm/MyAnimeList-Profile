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
        <p>
          Sorry! 🙇🏻‍♀️ This website is still a work in progress. Check out the{' '}
          <a
            href='https://github.com/angelenelm/MyAnimeList-Stats'
            target='_blank'
            rel='noopener noreferrer'>
            repo
          </a>{' '}
          in the mean time for updates!
        </p>
      </main>
    </div>
  );
};

export default Home;
