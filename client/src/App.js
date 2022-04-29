import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import {
  accessToken,
  getUserProfile,
  getUserStats,
  getUserAnimeList,
  getUserMangaList,
} from "./myanimelist";
import { catchErrors } from "./utils";
import { GlobalStyle } from "./styles";
import {
  LogoutButton,
  ThemeToggle,
  Login,
  UserInfo,
  UserAnimeStats,
  UserMangaStats,
} from "./components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");
  const [list, setList] = useState("anime");
  const [userStats, setUserStats] = useState(null);
  const [userAnimeList, setUserAnimeList] = useState(null);
  const [userMangaList, setUserMangaList] = useState(null);

  const handleListChange = (event) => {
    setList(event.target.value);
  };

  const handleThemeChange = (event) => {
    if (event.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const userProfile = await getUserProfile();
      const userStats = await getUserStats();
      const userAnimeList = await getUserAnimeList();
      const userMangaList = await getUserMangaList();

      setProfile(userProfile.data);
      setUserStats(userStats.data);
      setUserAnimeList(userAnimeList.data);
      setUserMangaList(userMangaList.data);
    };

    catchErrors(fetchData());
  }, []);

  // Need to obtain full anime and manga lists as default offset is 10
  useEffect(() => {
    if (!userAnimeList) {
      return;
    }
  }, [userAnimeList]);

  useEffect(() => {
    if (token || profile) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token, profile]);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <GlobalStyle />
      <header>
        <ThemeToggle checked={theme === "dark"} onChange={handleThemeChange} />
      </header>
      {!loggedIn ? (
        <Login />
      ) : (
        <>
          <LogoutButton />

          <StyledContainer>
            <UserInfo profile={profile} />
            {userStats && userAnimeList && userMangaList && (
              <>
                <label htmlFor="list-select">Please choose a list: </label>
                <select id="list-select" onChange={handleListChange}>
                  <option value="anime">Anime</option>
                  <option value="manga">Manga</option>
                </select>

                {list === "anime" ? (
                  <UserAnimeStats
                    profile={profile}
                    userStats={userStats.anime}
                    userList={userAnimeList}
                  />
                ) : (
                  <UserMangaStats
                    profile={profile}
                    userStats={userStats.manga}
                    userList={userMangaList}
                  />
                )}
              </>
            )}
          </StyledContainer>
        </>
      )}
    </>
  );
}

export default App;
