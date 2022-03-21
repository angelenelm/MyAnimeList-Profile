const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const port = 8080;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// for generating code_verifier and code_challenge for OAuth2 PKCE
// for MAL API, code_challenge is the same as code_verifier
const randomstring = require("randomstring");
const code_verifier = randomstring.generate(128);

/**
 * Generates a random string containing numbers and letters
 * Used to generate state param
 *
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

app.get("/", (req, res) => {
  res.send("MyAnimeList Profile");
});

app.get("/login", (req, res) => {
  const state = generateRandomString(16);

  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    code_challenge: code_verifier,
    redirect_uri: REDIRECT_URI,
    state: state,
  });

  res.redirect(`https://myanimelist.net/v1/oauth2/authorize?${queryParams}`);
});

app.get("/callback", (req, res) => {
  const code = req.query.code ?? null;

  axios({
    method: "post",
    url: "https://myanimelist.net/v1/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    data: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: code_verifier,
    }),
  })
    .then((response) => {
      console.log(`Response status: ${response.status}`);

      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = new URLSearchParams({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:3000?${queryParams}`);
      }
      else {
        res.redirect(`http://localhost:3000/?${new URLSearchParams({ error: `invalid_token` })}`);
      }
    })
    .catch((error) => {
      res.redirect(`http://localhost:3000/?${new URLSearchParams({ error: `invalid_token` })}`);
    });
});

// As of Nov 2021, the lifetime of the access token and the refresh token is the same (31 days).
// this behavior will be fixed in the future
app.get("/refresh", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://myanimelist.net/v1/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    data: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

// get user profile information
app.get("/user", (req, res) => {
  axios
    .get("https://api.myanimelist.net/v2/users/@me", {
      headers: {
        Authorization: req.headers.authorization,
      },
    })
    .then((response) => res.json(response.data))
    .catch((error) => res.send(error));
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
