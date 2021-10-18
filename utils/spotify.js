import querystring from 'querystring';

// https://leerob.io/blog/spotify-api-nextjs
// https://benwiz.com/blog/create-spotify-refresh-token/

// https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20user-top-read


const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const NOW_PLAYING_PODCAST_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing/?additional_types=episode`;
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const LAST_PLAYED_PODCAST_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played/?additional_types=episode`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const SHOWS_ENDPOINT = `https://api.spotify.com/v1/me/shows?limit=50`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`;
const PLAYBACK_ENDPOINT = `https://api.spotify.com/v1/me/player`

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

export const getPodcastPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_PODCAST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
};

export const getLastPlayedPodcast = async () => {
  const { access_token } = await getAccessToken();

  return fetch(LAST_PLAYED_PODCAST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
};

export const getShows = async () => {
  const { access_token } = await getAccessToken();

  return fetch(SHOWS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
};

export const getPlaylists = async () => {
  const { access_token } = await getAccessToken();

  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
};

export const getPlayer = async () => {
  const { access_token } = await getAccessToken();

  return fetch(PLAYBACK_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
};