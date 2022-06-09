import axios from "axios";

// Retrieve items from localStorage to more elegantly refer to them later
const LOCALSTORAGE_ITEMS = {
  myanimelist_access_token: window.localStorage.getItem("myanimelist_access_token"),
  myanimelist_refresh_token: window.localStorage.getItem("myanimelist_refresh_token"),
  myanimelist_token_expire_time: window.localStorage.getItem("myanimelist_token_expire_time"),
  myanimelist_token_timestamp: window.localStorage.getItem("myanimelist_token_timestamp"),
};

/**
 * Clears out all localStorage items set and navigates to homepage
 * @returns {void}
 */
export const logout = () => {
  window.localStorage.removeItem("myanimelist_access_token");
  window.localStorage.removeItem("myanimelist_refresh_token");
  window.localStorage.removeItem("myanimelist_token_expire_time");
  window.localStorage.removeItem("myanimelist_token_timestamp");

  window.location = window.location.origin;
};

const refreshToken = async () => {
  try {
    if (
      !LOCALSTORAGE_ITEMS.myanimelist_refresh_token ||
      LOCALSTORAGE_ITEMS.myanimelist_refresh_token === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_ITEMS.myanimelist_token_timestamp) / 1000 < 1000
    ) {
      console.log("No refresh token available");

      logout();
    }

    const { data } = await axios.get(
      `http://localhost:8888/refresh?refresh_token=${LOCALSTORAGE_ITEMS.myanimelist_access_token}`
    );

    window.localStorage.setItem("myanimelist_access_token", data.access_token);
    window.localStorage.setItem("myanimelist_token_timestamp", Date.now());

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Checks if access token in localStorage has expired by comparing
 * expires_in and timestamp created for current access token
 *
 * Note: Currently, the lifetime of the Access Token and Refresh Token is the
 * same (31 days). This contradicts the documentation, stating that the
 * Access Token expires 1 hour after its issuing. This behavior will be
 * fixed in the future, so always refer to the "expires_in" parameter to know
 * the lifetime of the Access Token. The Refresh Token will still be valid
 * for 31 days since its issuing (source).
 *
 * Per https://myanimelist.net/blog.php?eid=835707 as of Nov 2021
 *
 * @returns {boolean} for if access token in localStorage has expired
 */
const accessTokenHasExpired = () => {
  const { myanimelist_access_token, myanimelist_expires_in, myanimelist_token_timestamp } =
    LOCALSTORAGE_ITEMS;

  if (!myanimelist_access_token || !myanimelist_token_timestamp) {
    return false;
  }

  const millisecondsElapsed = Date.now() - Number(myanimelist_token_timestamp);
  const secondsElapsed = millisecondsElapsed * 1000;

  return secondsElapsed > myanimelist_expires_in;
};

/**
 * Handles logic for retrieving MyAnimeList access token from
 * localStorage or from URL query params
 *
 * @returns {string} a MyAnimeList access token
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    myanimelist_access_token: urlParams.get("access_token"),
    myanimelist_refresh_token: urlParams.get("refresh_token"),
    myanimelist_token_expire_time: urlParams.get("expires_in"),
  };
  const hasError = urlParams.get("error");

  // If /callback has an error, if the access token has expired, or if the access token is not valid, refresh access token
  if (
    hasError ||
    accessTokenHasExpired() ||
    LOCALSTORAGE_ITEMS.myanimelist_access_token === "undefined"
  ) {
    console.log(`accessTokenHasExpired(): ${accessTokenHasExpired()}`);
    console.log("Refreshing token");

    refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_ITEMS.myanimelist_access_token &&
    LOCALSTORAGE_ITEMS.myanimelist_access_token !== "undefined"
  ) {
    return LOCALSTORAGE_ITEMS.myanimelist_access_token;
  }

  // If there is an access token in URL query params, use that
  if (queryParams.myanimelist_access_token) {
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }

    window.localStorage.setItem("myanimelist_token_timestamp", Date.now());

    return queryParams.myanimelist_access_token;
  }

  return false;
};

export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 *
 * Making all API requests through Express server to avoid CORS errors
 */
axios.defaults.baseURL = `http://localhost:8888`;
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

/**
 * Get current user's profile
 * https://docs.api.jikan.moe/#operation/getUserProfile
 *
 * @returns {Promise}
 */
export const getUserProfile = () => axios.get("/user");

export const getUserStats = () => axios.get(`/stats`);

export const getUserAnimeList = (sort = "list_score") => axios.get(`/anime?sort=${sort}`);

export const getUserMangaList = (sort = "list_score") => axios.get(`/manga?sort=${sort}`);
