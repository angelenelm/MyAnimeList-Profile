import { StyledUserStats, StyledSection } from "../styles";
import {
  MediaGrid,
  ReleaseYearChart,
  MediaTypeChart,
  SourceChart,
  HorizontalChart,
} from "../components";

const UserAnimeStats = (props) => {
  const { userStats, userList, theme } = props;

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

    if (node.list_status.status === "completed" || node.list_status.status === "watching") {
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
          <div className="stats">
            <div className="stats__item">
              <span className="num">{userStats.completed}</span>
              <span className="num-label">anime</span>
            </div>
            <div className="stats__item">
              <span className="num">{userStats.episodes_watched.toLocaleString("en-US")}</span>
              <span className="num-label">episodes</span>
            </div>
            <div className="stats__item">
              <span className="num">
                {Math.round(userStats.days_watched * 24).toLocaleString("en-US")}
              </span>
              <span className="num-label">hours</span>
            </div>
            <div className="stats__item">
              <span className="num">{Object.entries(byStudio).length}</span>
              <span className="num-label">studios</span>
            </div>
          </div>

          <StyledSection>
            <h2>
              <span>Top Rated</span>
            </h2>
            <MediaGrid type="anime" mediaList={topTen} />
          </StyledSection>

          <StyledSection>
            <h2>By Release Year</h2>
            <ReleaseYearChart perYearData={perYear} theme={theme} />
          </StyledSection>

          <StyledSection>
            <div className="charts">
              <div className="charts__chart">
                <h2>By Media Type</h2>
                <MediaTypeChart byMediaType={byType} theme={theme} />
              </div>

              <div className="charts__chart">
                <h2>By Source</h2>
                <SourceChart bySource={bySource} theme={theme} />
              </div>
            </div>
          </StyledSection>

          <StyledSection>
            <div className="charts">
              <div className="charts__chart">
                <h2>By Genre</h2>
                <HorizontalChart userDataset={byGenre} theme={theme} />
              </div>

              <div className="charts__chart">
                <h2>By Studio</h2>
                <HorizontalChart userDataset={byStudio} theme={theme} />
              </div>
            </div>
          </StyledSection>

          <StyledSection>
            <h2>Milestones</h2>
          </StyledSection>

          <h2>Oldest</h2>
          <ul>
            <li>
              {oldest.node.alternative_titles.en
                ? oldest.node.alternative_titles.en
                : oldest.node.title}{" "}
              ({oldest.node.start_date.slice(0, 4)})
            </li>
          </ul>

          <h2>Newest</h2>
          <ul>
            <li>
              {newest.node.alternative_titles.en
                ? newest.node.alternative_titles.en
                : newest.node.title}{" "}
              ({newest.node.start_date.slice(0, 4)})
            </li>
          </ul>

          <h2>Highest Ranked</h2>
          <ul>
            <li>
              {highest.node.alternative_titles.en
                ? highest.node.alternative_titles.en
                : highest.node.title}{" "}
              (Your score: {highest.list_status.score}, vs Avg score: {highest.node.mean})
            </li>
          </ul>

          <h2>Most Popular</h2>
          <ul>
            <li>
              {mostPopular.node.alternative_titles.en
                ? mostPopular.node.alternative_titles.en
                : mostPopular.node.title}{" "}
              (Popularity: #{mostPopular.node.popularity}, vs #1: Attack on Titan)
            </li>
          </ul>

          <h2>Most Number of Episodes</h2>
          <ul>
            <li>
              {mostEpisodes.node.alternative_titles.en
                ? mostEpisodes.node.alternative_titles.en
                : mostEpisodes.node.title}{" "}
              (Watched {mostEpisodes.list_status.num_episodes_watched} of{" "}
              {mostEpisodes.node.num_episodes} episodes)
            </li>
          </ul>
        </StyledUserStats>
      )}
    </>
  );
};

export default UserAnimeStats;
