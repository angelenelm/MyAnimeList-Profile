import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Profile.module.css';

const Profile = (props) => {
  const router = useRouter();
  const { username } = router.query;
  const title = `MyAnimeList Stats | ${username}`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{username}</h1>
      </main>
    </div>
  );
};

export default Profile;
