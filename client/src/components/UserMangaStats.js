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
          <div className="stats">
            <div className="stats__item">
              <span className="num">{userStats.completed}</span>
              <span className="num-label">manga</span>
            </div>
            <div className="stats__item">
              <span className="num">{userStats.chapters_read.toLocaleString("en-US")}</span>
              <span className="num-label">chapters</span>
            </div>
            <div className="stats__item">
              <span className="num">{userStats.volumes_read.toLocaleString("en-US")}</span>
              <span className="num-label">volumes</span>
            </div>
            <div className="stats__item">
              <span className="num">{authors.size}</span>
              <span className="num-label">authors</span>
            </div>
          </div>
        </StyledUserStats>
      )}
    </>
  );
};

export default UserMangaStats;
