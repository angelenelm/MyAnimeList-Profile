import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { StyledUserStats } from "../styles";
import { getUserMangaList } from "../myanimelist";

const UserMangaStats = (props) => {
  const { userStats, userList } = props;
  const [mangaList, setMangaList] = useState(props.userList);

  const authors = new Set();
  userList.data.forEach((node) => {
    authors.add(node.node.authors[0].node.id);
  });

  // Need to update user manga list sorted by release year
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUserMangaList("manga_start_date");

      setMangaList(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {userStats && (
        <StyledUserStats>
          <h3>Completed stats</h3>
          <span>{userStats.completed} manga</span>
          <span>{userStats.chapters_read.toLocaleString("en-US")} chapters</span>
          <span>{userStats.volumes_read.toLocaleString("en-US")} volumes</span>
          <span>
            {authors.size} {authors.size > 1 ? "authors" : "author"}
          </span>
        </StyledUserStats>
      )}
    </>
  );
};

export default UserMangaStats;
