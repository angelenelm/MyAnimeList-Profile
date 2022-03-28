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
  display: block;
  align-items: center;
`;

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");
  const [list, setList] = useState("anime");
  const [stats, setStats] = useState(null);
  const [animeList, setAnimeList] = useState([null]);
  const [mangaList, setMangaList] = useState([null]);

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
      setStats(userStats.data);
      setAnimeList(userAnimeList.data);
      setMangaList(userMangaList.data);
    };

    catchErrors(fetchData());
  }, []);

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
            {stats && (
              <>
                <label htmlFor="list-select">Please choose a list: </label>
                <select id="list-select" onChange={handleListChange}>
                  <option value="anime">Anime</option>
                  <option value="manga">Manga</option>
                </select>
              </>
            )}
            {list === "anime" ? (
              <UserAnimeStats profile={profile} stats={stats?.anime} list={animeList} />
            ) : (
              <UserMangaStats profile={profile} stats={stats?.manga} list={mangaList} />
            )}
          </StyledContainer>
        </>
      )}
    </>
  );
}

export default App;
