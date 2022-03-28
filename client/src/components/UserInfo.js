import { convertIsoDate } from "../utils";
import { StyledUserInfo } from "../styles";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

const UserInfo = (props) => {
  const { profile } = props;

  return (
    <>
      {profile && (
        <StyledUserInfo>
          <img className="header__img" src={profile.picture} alt="Avatar" />
          <h1>{profile.name}</h1>
          <div className="header__info">
            {profile.location !== "" && (
              <span className="header__info__item">
                <LocationOnOutlinedIcon />
                {profile.location}
              </span>
            )}
            <span className="header__info__item">
              <TodayOutlinedIcon />
              Joined {convertIsoDate(profile.joined_at)}
            </span>
          </div>
        </StyledUserInfo>
      )}
    </>
  );
};

export default UserInfo;
