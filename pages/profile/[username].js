import Head from 'next/head';
import styles from '../../styles/User.module.css';

const Profile = (props) => {
  const username = props.query.username;

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
