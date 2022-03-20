import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    if (refreshToken) {
      fetch(`http://localhost:8080/refresh?refresh_token=${refreshToken}`)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user?access_token=${accessToken}`);
        const data = await response.json();
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!accessToken ? (
          <a className="App-link" href="http://localhost:8080/login">
            Log in to MyAnimeList
          </a>
        ) : (
          <>
            <h1>Logged in!</h1>
            <a href="http://localhost:3000">Log out</a>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
