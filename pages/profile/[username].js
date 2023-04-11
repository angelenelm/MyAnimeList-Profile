import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/User.module.css';

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>MyAnimeList Stats</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{username}</h1>
      </main>
    </div>
  );
};

export default Profile;
