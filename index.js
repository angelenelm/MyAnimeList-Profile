const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 8080;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// for generating code_verifier and code_challenge for OAuth2 PKCE
const randomstring = require("randomstring");
const crypto = require("crypto");
const base64url = require("base64url");

const code_verifier = randomstring.generate(128);

const base64Digest = crypto.createHash("sha256").update(code_verifier).digest("base64");

const code_challenge = base64url.fromBase64(base64Digest);

// for generating state
/**
 * Generates a random string containing numbers and letters
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
    code_challenge: code_challenge,
    redirect_uri: REDIRECT_URI,
    state: state,
  }).toString();

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
      if (response.status === 200) {
        res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
      } else {
        res.send(response);
      }
    })
    .catch((error) => res.send(error));
});

app.get("/users/angelenelm", (req, res) => {
  axios
    .get("https://api.myanimelist.net/v2/users/angelenelm/animelist?status=compeleted", {
      headers: {
        "X-MAL-CLIENT-ID": CLIENT_ID,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
      } else {
        res.send(response);
      }
    })
    .catch((error) => res.send(error));
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
