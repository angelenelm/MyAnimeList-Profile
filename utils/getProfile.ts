import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookies } from 'cookies-next';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Obtains information for logged-in user
// Refreshes access and refresh token when current access token expires
const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  const { access_token } = getCookies({ req, res });
  const requestURI = `https://api.myanimelist.net/v2`;
  const headers = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  // Profile object type
  interface Profile {
    name: string; // name
    location?: string; // location
    joinedDate?: string; // joined_at
    picture?: string; // picture
    numAnimeCompleted?: number; // anime_statistics.num_items_completed
    numDaysWatched?: number; // anime_statistics.num_days_watched
    avgAnimeScore?: number; // anime_statistics.mean_score
    animeList: Anime[];
  }

  let profile = {} as Profile;

  // Get user's username, location, join date, and picture
  const profileResponse = await fetch(
    `${requestURI}/users/@me?fields=anime_statistics`,
    headers
  );
  const { name, location, joined_at, picture, anime_statistics } =
    await profileResponse.json();

  profile.name = name;
  profile.location = location;
  profile.joinedDate = new Date(joined_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  profile.picture = picture;
  profile.numAnimeCompleted = anime_statistics?.num_items_completed;
  profile.numDaysWatched = anime_statistics?.num_days_watched;
  profile.avgAnimeScore = anime_statistics?.mean_score;

  // Anime object type
  interface Anime {
    id: number; // id
    titles: { en: string; ja: string; romaji: string }; // title & alternative_titles
    pictures: { medium: string; large: string }; // main_picture
    listStatus: string; // my_list_status.status
    score: number; // my_list_status.score
    startDate: string; // start_date
    endDate: string; // end_date
    avgScore: number; // mean
    rank: number; // rank
    popularity: number; // popularity
    mediaType: string; // media_type
    genres: string[]; // genres
    source: string; // source
    studios: string[]; // studios
  }

  let animeList: Anime[] = [];

  // Get user's anime list
  const animeListResponse = await fetch(
    `${requestURI}/users/@me/animelist?limit=100&status=completed&sort=list_score`,
    headers
  );
  const { data } = await animeListResponse.json();

  // Obtain details for all anime in anime list response for profile page
  // Using Promise.all() for concurrent fetch requests for much better loading time
  const responses = await Promise.all(
    data.map(async (item: any) => {
      const response = await fetch(
        `${requestURI}/anime/${item.node.id}?fields=alternative_titles,start_date,end_date,mean,rank,popularity,media_type,genres,my_list_status,source,studios`,
        headers
      );

      return await response.json();
    })
  );

  for (const response of responses) {
    let anime = {} as Anime;
    anime.id = response.id; // id
    anime.titles = {
      // title & alternative_titles.en & alternative_titles.ja
      en: response.alternative_titles.en,
      ja: response.alternative_titles.ja,
      romaji: response.title,
    };
    anime.pictures = {
      // main_picture
      medium: response.main_picture.medium,
      large: response.main_picture.large,
    };
    anime.listStatus = response.my_list_status.status; // my_list_status.status
    anime.score = response.my_list_status.score; // my_list_status.score
    anime.startDate = response.start_date; // start_date
    anime.endDate = response.end_date; // end_date
    anime.avgScore = response.mean; // mean
    anime.rank = response.rank; // rank
    anime.popularity = response.popularity; // popularity
    anime.mediaType = response.media_type; // media_type
    anime.genres = response.genres; // genres
    anime.source = response.source; // source
    anime.studios = response.studios; // studios

    animeList.push(anime);
  }

  profile.animeList = animeList;

  return profile;
};

export { getProfile };
