import { StyledUserStats } from "../styles";

const UserAnimeStats = (props) => {
  const { stats, list } = props;

  return (
    <>
      {stats && (
        <StyledUserStats>
          <span>{stats.completed} anime</span>
          <span>{stats.episodes_watched.toLocaleString("en-US")} episodes</span>
          <span>{Math.round(stats.days_watched * 24).toLocaleString("en-US")} hours</span>
        </StyledUserStats>
      )}
    </>
  );
};

export default UserAnimeStats;
