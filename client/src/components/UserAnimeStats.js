import { StyledUserStats } from "../styles";

const UserAnimeStats = (props) => {
  const { userStats, userList } = props;

  const studios = new Set();
  userList?.data?.forEach((node) => {
    node.node.studios.forEach((studio) => {
      studios.add(studio.id);
    });
  });

  return (
    <>
      {userStats && (
        <StyledUserStats>
          <h3>Completed stats</h3>
          <span>{userStats.completed} anime</span>
          <span>{userStats.episodes_watched.toLocaleString("en-US")} episodes</span>
          <span>{Math.round(userStats.days_watched * 24).toLocaleString("en-US")} hours</span>
          <span>{studios.size} studios</span>
        </StyledUserStats>
      )}
    </>
  );
};

export default UserAnimeStats;
