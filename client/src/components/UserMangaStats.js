import { StyledUserStats } from "../styles";

const UserMangaStats = (props) => {
  const { stats, list } = props;
  console.log(list.data[0]);

  return (
    <>
      {stats && (
        <StyledUserStats>
          <span>{stats.completed} manga</span>
          <span>{stats.chapters_read} chapters</span>
        </StyledUserStats>
      )}
    </>
  );
};

export default UserMangaStats;
