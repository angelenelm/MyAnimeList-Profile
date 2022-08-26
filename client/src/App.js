import { useState, useEffect } from "react";
import {
  accessToken,
  getUserProfile,
  getUserStats,
  getUserAnimeList,
  getUserMangaList,
} from "./myanimelist";
import { catchErrors } from "./utils";
import { GlobalStyle, StyledContainer } from "./styles";
import {
  LogoutButton,
  ThemeToggle,
  Login,
  Loader,
  UserInfo,
  UserAnimeStats,
  UserMangaStats,
  Footer,
} from "./components";

const storedTheme = window.localStorage.getItem("malstats_theme");
const storedList = window.localStorage.getItem("malstats_list");

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState(storedTheme);
  const [list, setList] = useState(storedList);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

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

    setLoading(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("malstats_list", list);
  }, [list]);

  // Need to obtain full anime and manga lists as default offset is 10
  useEffect(() => {
    setLoading(true);

    if (!userAnimeList) {
      return;
    }

    setLoading(false);
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
    window.localStorage.setItem("malstats_theme", theme);
  }, [theme]);

  return (
    <>
      <StyledContainer>
        <GlobalStyle />
        <header>
          <ThemeToggle checked={theme === "dark"} onChange={handleThemeChange} />
          {!loggedIn ? <></> : <LogoutButton />}
        </header>
        {!loggedIn ? (
          <Login />
        ) : (
          <>
            {!loading ? (
              <>
                <UserInfo profile={profile} />
                {userStats && userAnimeList && userMangaList && (
                  <>
                    <div className="list-select">
                      <label htmlFor="list-select">Viewing</label>
                      <select id="list-select" onChange={handleListChange} value={list}>
                        <option value="anime">Anime</option>
                        <option value="manga">Manga</option>
                      </select>
                      <span> list</span>
                    </div>

                    {list === "anime" ? (
                      <UserAnimeStats
                        profile={profile}
                        userStats={userStats.anime}
                        userList={userAnimeList}
                        theme={theme}
                      />
                    ) : (
                      <UserMangaStats
                        profile={profile}
                        userStats={userStats.manga}
                        userList={userMangaList}
                        theme={theme}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <Loader />
            )}
          </>
        )}
      </StyledContainer>
      <Footer />
    </>
  );
}

export default App;
