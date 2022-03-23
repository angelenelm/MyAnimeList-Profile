import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getCurrentUserProfile } from "../myanimelist";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();

      if (data.status !== 401) {
        setProfile(data);
      }
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.joined_at}</p>
          <img src={profile.picture} alt="Avatar" />
        </div>
      )}
    </>
  );
};

export default Profile;
