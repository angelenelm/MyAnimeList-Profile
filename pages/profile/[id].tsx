import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookies } from 'cookies-next';
import { getProfile } from '../../utils/getProfile';
import styles from '../../styles/Profile.module.css';

export const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { id: string };
}) => {
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

  let profile = await getProfile(req, res);
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
        <Link href='/api/logout'>Logout</Link>
        <div className={styles['profile-image']}>
          <Image
            src={profile.picture}
            alt={`Profile picture of MyAnimeList user ${profile.name}`}
            fill
            priority
            sizes='150px'
          />
        </div>

        <h1>{profile.name}</h1>
        {profile.location && <span>Location: {profile.location}</span>}
        <span>
          User since
          {` ${profile.joinedDate}`}
        </span>
        <span>Average score: {profile.avgAnimeScore}</span>
        <span>{profile.numAnimeCompleted} anime completed</span>
        <span>{profile.numDaysWatched * 24} hours watched</span>

        <h3>Top 10 Completed</h3>
        <ol>
          {profile.animeList.map(
            (item: any, index: number) =>
              index < 10 && (
                <li key={index}>
                  {item.titles.en ? item.titles.en : item.titles.romaji}
                </li>
              )
          )}
        </ol>
      </main>
    </div>
  );
};

export default Profile;
