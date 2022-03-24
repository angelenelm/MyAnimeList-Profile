import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { accessToken, logout, getCurrentUserProfile } from "./myanimelist";
import { catchErrors } from "./utils";
import styled from "styled-components/macro";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeToggle } from "./components";
import { Login, Profile } from "./pages";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: 0px;
  right: 25px;
  background-color: var(--secondaryButtonColor);
  color: var(--buttonTextColor);
  text-decoration: none;
  padding: 12px 15px;
  margin: 20px auto;
  border-radius: 5px;
  display: inline-block;

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.05);
  }

  transition: var(--transition);
`;

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
  const [theme, setTheme] = useState("light");

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
      const { data } = await getCurrentUserProfile();

      if (data.status !== 401) {
        setProfile(data);
      }
    };

    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div>
      <GlobalStyle />
      <header>
        <ThemeToggle checked={theme === "dark"} onChange={handleThemeChange} />
        <StyledLogoutButton onClick={logout}> Log out</StyledLogoutButton>

        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              {!token || !profile ? <Login /> : <Redirect to="/:id" />}
            </Route>

            <Route exact path="/:id">
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
    </div>
  );
}

export default App;
