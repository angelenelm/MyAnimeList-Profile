import { StyledUserStats } from "../styles";

const UserAnimeStats = (props) => {
  const { userStats, userList } = props;

  const topTen = userList.data.slice(0, 10);

  // Get number of anime watched per year for anime in Completed or Watching
  const perYear = {};

  // Get number of anime watched by type
  const byType = {};

  // Get number of anime by genre
  const byGenre = {};

  // Get number of anime by source type
  const bySource = {};

  // Get number of anime by studio
  const byStudio = {};

  // Oldest anime in Completed or Watching
  let oldest;

  // Newest anime in Completed or Watching
  let newest;

  // Highest ranked in Completed or Watching
  let highest;

  // Most popular in Completed or Watching
  let mostPopular;

  // Most number of episodes in Completed or Watching
  let mostEpisodes;

  userList?.data?.forEach((node) => {
    // To get oldest/newest anime, and create perYear dictionary
    const startDate = new Date(node.node.start_date);
    const startDateYear = startDate.getFullYear();

    if (node.list_status.status === "completed" || "watching") {
      // Get oldest anime in Completed or Watching
      if (!oldest) {
        oldest = node;
      } else {
        const currentOldestStartDate = new Date(oldest.node.start_date);
        if (startDate < currentOldestStartDate) {
          oldest = node;
        }
      }

      // Get newest anime in Completed or Watching
      if (!newest) {
        newest = node;
      } else {
        const currentNewestStartDate = new Date(newest.node.start_date);

        if (startDate > currentNewestStartDate) {
          newest = node;
        }
      }

      // Get highest ranked anime in Completed or Watching
      if (!highest) {
        highest = node;
      } else {
        if (node.node.rank < highest.node.rank) {
          highest = node;
        }
      }

      // Get most popular anime in Completed or Watching
      if (!mostPopular) {
        mostPopular = node;
      } else {
        if (node.node.popularity < mostPopular.node.popularity) {
          mostPopular = node;
        }
      }

      // Get most popular anime in Completed or Watching
      if (!mostEpisodes) {
        mostEpisodes = node;
      } else {
        if (node.node.num_episodes > mostEpisodes.node.num_episodes) {
          mostEpisodes = node;
        }
      }

      // Get number of anime watched per year for anime in Completed & Watching
      (perYear[startDateYear] || (perYear[startDateYear] = [])).push(node);

      // Get number of anime by type for anime in Completed or Watching
      (byType[node.node.media_type] || (byType[node.node.media_type] = [])).push(node);

      // Get number of anime by genre for anime in Completed or Watching
      node.node.genres.forEach((genre) => {
        (byGenre[genre.name] || (byGenre[genre.name] = [])).push(node);
      });

      // Get number of anime by genre for anime in Completed or Watching
      (bySource[node.node.source] || (bySource[node.node.source] = [])).push(node);

      // Get number of anime by studio for anime in Completed or Watching
      node.node.studios.forEach((studio) => {
        (byStudio[studio.name] || (byStudio[studio.name] = [])).push(node);
      });
    }
  });

  return (
    <>
      {userStats && (
        <StyledUserStats>
          <span>{userStats.completed} anime</span>
          <span>{userStats.episodes_watched.toLocaleString("en-US")} episodes</span>
          <span>{Math.round(userStats.days_watched * 24).toLocaleString("en-US")} hours</span>
          <span>{Object.entries(byStudio).length} studios</span>
        </StyledUserStats>
      )}

      <h3>Top Rated</h3>
      <ol>
        {topTen.map((item, index) => {
          return (
            <li key={index}>
              {item.node.alternative_titles.en ? item.node.alternative_titles.en : item.node.title}
            </li>
          );
        })}
      </ol>

      <h3>By Release Year</h3>
      <ul>
        {Object.entries(perYear).map((item, index) => {
          return (
            <li key={index}>
              {item[0]}: {item[1].length}
            </li>
          );
        })}
      </ul>

      <h3>By Media Type</h3>
      <ul>
        {Object.entries(byType).map((item, index) => {
          return (
            <li key={index}>
              {item[0]}: {item[1].length}
            </li>
          );
        })}
      </ul>

      <h3>By Genre</h3>
      <ul>
        {Object.entries(byGenre).map((item, index) => {
          return (
            <li key={index}>
              {item[0]}: {item[1].length}
            </li>
          );
        })}
      </ul>

      <h3>By Source</h3>
      <ul>
        {Object.entries(bySource).map((item, index) => {
          return (
            <li key={index}>
              {item[0]}: {item[1].length}
            </li>
          );
        })}
      </ul>

      <h3>By Studio</h3>
      <ul>
        {Object.entries(byStudio).map((item, index) => {
          return (
            <li key={index}>
              {item[0]}: {item[1].length}
            </li>
          );
        })}
      </ul>

      <h3>Oldest</h3>
      <ul>
        <li>
          {oldest.node.alternative_titles.en
            ? oldest.node.alternative_titles.en
            : oldest.node.title}{" "}
          ({oldest.node.start_date.slice(0, 4)})
        </li>
      </ul>

      <h3>Newest</h3>
      <ul>
        <li>
          {newest.node.alternative_titles.en
            ? newest.node.alternative_titles.en
            : newest.node.title}{" "}
          ({newest.node.start_date.slice(0, 4)})
        </li>
      </ul>

      <h3>Highest Ranked</h3>
      <ul>
        <li>
          {highest.node.alternative_titles.en
            ? highest.node.alternative_titles.en
            : highest.node.title}{" "}
          (Your score: {highest.list_status.score}, vs Avg score: {highest.node.mean})
        </li>
      </ul>

      <h3>Most Popular</h3>
      <ul>
        <li>
          {mostPopular.node.alternative_titles.en
            ? mostPopular.node.alternative_titles.en
            : mostPopular.node.title}{" "}
          (Popularity: #{mostPopular.node.popularity}, vs #1: Attack on Titan)
        </li>
      </ul>

      <h3>Most Number of Episodes</h3>
      <ul>
        <li>
          {mostEpisodes.node.alternative_titles.en
            ? mostEpisodes.node.alternative_titles.en
            : mostEpisodes.node.title}{" "}
          (Watched {mostEpisodes.list_status.num_episodes_watched} of{" "}
          {mostEpisodes.node.num_episodes} episodes)
        </li>
      </ul>
    </>
  );
};

export default UserAnimeStats;
