---
title: 'Showing my listening activity'
author: 'Ryan Parag'
description: 'Reflecting my listening habits in realtime using the Spotify Web API and Next.js'
date: '2021-03-01'
hero_image: /static/showing-my-listening-activity.png
---

**Spotify icon can be found in my [Figma Community file](https://www.figma.com/community/file/883736445420096182/Big-Sur-Icons)** (as well as a bunch of other icons)

------------------

TLDR:
**Grab your music and podcast info from Spotify using Next.js**
- [Lee Robinson's Spotify & Next.js tutorial](https://leerob.io/blog/spotify-api-nextjs) 👍
- [View this site's GitHub Repo to see how I did it](https://github.com/ryan-parag/notes.ryanparag.com) 👨‍💻
- [View what I designed/built](/listening/music) 🎉

------------------

Sticking to this site's ethos - _**designing in the open**_ - I thought I could share a few new things that I've been finding a ton of fun.

Either while I'm driving, walking, sitting at my desk, or falling asleep, I'm regularly listening to a song or podcast via Spotify. Using their [Web API](https://developer.spotify.com/documentation/web-api/), you're able to access:
- Music (playlists, artists, songs, albums, etc.)
- Podcasts (episodes, shows)
- User metrics (currently listening, top listens)
- ...and probably a ton more

### How to build

After a quick search, I came across [Lee Robinson's Spotify & Next.js tutorial](https://leerob.io/blog/spotify-api-nextjs). Using the Spotify Web API and Next.js v10+, I threw together a way to grab my own Spotify data and pull it into this site.

Lee's tutorial is incredibly helpful in getting Spotify setup to show your own "Top Tracks", but I also wanted to have a way to show:
- if I'm currently listening to something
- if I'm my currently playing item is a podcast or song
- my last played song
- my recently subscribed podcasts

I also wanted to design this in a way that was compact and not overly informative. Let's start with a component that let's me see if I'm currently listening to something, and whether that item is a song or podcast. We'll need 2 endpoints for this:

```js
// spotify.js

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const NOW_PLAYING_PODCAST_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing/?additional_types=episode`;
```

If you've followed [Lee's tutorial](https://leerob.io/blog/spotify-api-nextjs) and completed the token & auth setup, we just have to add 2 more functions in order to fetch these endpoints:

```js
// spotify.js

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
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
```

After that, we just need two routes to grab's playing. I kept the song and podcast routes separate in case I need them later. Using the route for grabbing the currently playing song as an example, we can import one of our new functions to grab the response from Spotify:

```js
// /api/spotify/now-playing.js

import { getNowPlaying } from '@utils/spotify';

export default async (_, res) => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400 || response.status === 500) {
    return res.status(200).json({ isPlaying: false, playing: null });
  }

  const song = await response.json();

  if(song.context === null) {
    return res.status(200).json({ isPlaying: false, playing: 'podcast' });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title
    });
};
```

We would repeat the same function for the currently playing podcast - making slight changes in the object we send back and the endpoint function we're referencing. The above function accounts for 3 scenarios:
1. If a song is playing
2. If a song isn't playing, but a podcast is playing
3. If neither a song nor podcast is playing

Let's see how we can design a single component to account for all 3 of these states:

![component states](/../static/showing-my-listening-activity_1.png)

This component can account for each of the scenarios our API response may give us - helping us only surface the correct information in a way that is a bit more seamless to the user.

### What's next?

![podcast subscriptions](/../static/showing-my-listening-activity_2.png)

I've been having some fun grabbing my recent top tracks and my recent podcast subscriptions - [check it out!](/listening/music) If you have feedback or ideas of what else could be a fun way to make this information more transparent and tangible, I'd love to know - let me know using the form below.