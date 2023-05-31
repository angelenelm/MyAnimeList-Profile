import type { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getCookies } from 'cookies-next';
import getProfile from '../../utils/getProfile';
import Footer from '../../components/Footer';
import styles from '../../styles/Profile.module.css';
import {
  LogoutOutlined,
  LocationOnOutlined,
  EventOutlined,
} from '@mui/icons-material';
import ThemeSwitch from '../../components/ThemeSwitch';

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { id: string };
}) {
  const { req, res, params } = context;
  const { access_token } = getCookies({ req, res });

  // If access_token doesn't exist, should be redirected to / to log in
  if (!access_token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const profile = await getProfile(req, res);

  // Check if id in URL matches profile name; if not, 404
  if (params.id !== profile.name) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: { profile },
    };
  }
}

function Profile(props: { profile: any }) {
  const { profile } = props;
  const title = `${profile.name} | MyAnimeList Stats`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <header className={styles.header}>
        {/* <ThemeSwitch /> */}
        <Link href='/api/logout' className={styles.logout}>
          <span>Logout</span>
          <LogoutOutlined />
        </Link>

        <div className={styles['profile-picture']}>
          <Image
            src={profile.picture}
            alt={`Profile picture of MyAnimeList user ${profile.name}.`}
            fill
            priority
            sizes='150px'
          />
        </div>

        <h1>
          <a
            href={`https://myanimelist.net/profile/${profile.name}`}
            target='_blank'
            rel='noopener noreferrer'>
            {profile.name}
          </a>
        </h1>

        <div className={styles.info}>
          {profile.location && (
            <div className={styles.item}>
              <LocationOnOutlined />
              <span>{profile.location}</span>
            </div>
          )}
          <div className={styles.item}>
            <EventOutlined />
            <span>{`Since ${profile.joinedDate}`}</span>
          </div>
        </div>

        <div className={styles['stat-cards']}>
          <div className={styles.card}>
            <span className={styles.stat}>{profile.numAnimeCompleted}</span>
            <p className={styles.label}>completed</p>
          </div>
          <div className={styles.card}>
            <span className={styles.stat}>
              {Math.round(profile.numDaysWatched * 24)}
            </span>
            <p className={styles.label}>hours</p>
          </div>
          <div className={styles.card}>
            <span className={styles.stat}>
              {Math.round(profile.avgAnimeScore)}/10
            </span>
            <p className={styles.label}>average score</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h3>Top 10</h3>

          <ul className={styles['top-ten']}>
            {profile.animeList.map(
              (item: any, index: number) =>
                index < 10 && (
                  <li key={index} className={styles.item}>
                    <div className={styles.poster}>
                      <a
                        href={`https://myanimelist.net/anime/${item.id}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <img
                          src={item.pictures.large}
                          alt={`Poster for the anime ${
                            item.titles.en ? item.titles.en : item.titles.romaji
                          }.`}
                        />
                      </a>
                    </div>
                    <span className={styles.score}>{item.score}/10</span>
                    <span className={styles.title}>
                      {`${
                        item.titles.en ? item.titles.en : item.titles.romaji
                      } (${item.startDate.substring(0, 4)})`}
                    </span>
                  </li>
                )
            )}
          </ul>
        </section>

        <section className={styles.section}>
          <h3>By Release Year</h3>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
