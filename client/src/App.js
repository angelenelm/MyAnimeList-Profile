import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./myanimelist";
import { catchErrors } from "./utils";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      console.log(data);
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8080/login">
            Log in to MyAnimeList
          </a>
        ) : (
          <>
            <button onClick={logout}>Log out</button>

            {profile && (
              <div>
                <h1>{profile.name}</h1>
                <p>Joined {profile.joined_at}</p>
                <img src={profile.picture} alt="Avatar" />
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
