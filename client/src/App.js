import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { accessToken, logout, getCurrentUserProfile } from "./myanimelist";
import { catchErrors } from "./utils";
import { ThemeProvider } from "styled-components/macro";
import { GlobalStyle, lightTheme, darkTheme } from "./styles";
import { ThemeToggle } from "./components";
import { Login, Profile } from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeChange = (event) => setDarkMode(event.target.checked);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();

      if (data.status !== 401) {
        setProfile(data);
      }
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <header>
          <ThemeToggle checked={darkMode} onChange={handleDarkModeChange} />
          <Router>
            <ScrollToTop />
            <Switch>
              <Route exact path="/">
                {!token || !profile ? <Login /> : <Redirect to="/:id" />}
              </Route>

              <Route exact path="/:id">
                <button onClick={logout}> Log out</button>
                <Profile />
              </Route>

              <Route exact path="/:id/anime">
                <h1>All time anime stats</h1>
              </Route>
              <Route exact path="/:id/anime/:id">
                <h1>[year] anime stats</h1>
              </Route>

              <Route exact path="/:id/manga/">
                <h1>[year] manga stats</h1>
              </Route>

              <Route exact path="/:id/manga/:id">
                <h1>[year] manga stats</h1>
              </Route>
            </Switch>
          </Router>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
