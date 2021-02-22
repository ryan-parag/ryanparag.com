import querystring from 'querystring';

//const client_id = process.env.SPOTIFY_CLIENT_ID
//const client_secret = process.env.SPOTIFY_CLIENT_SECRET
//const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const client_id = "fb47075d3d544037a69493e74b4424f5"
const client_secret = "f2f6fc974e574d3087f977acef6a1335"
const refresh_token = "AQBLK4Jg4weblcdk4InW6MAuBWdB_5hdNvV1XI_QegqP7kedEGeXXTPXF9BVsAp1Z_LgItNqklXlVvDw0mi22LUs_GDIssBXKp756FE1HwF2eVtJfS7aaQ7cfCNcY96qOR4"

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getLastPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(LAST_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};