import React, { useState } from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import styled, { css } from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { truncateString } from '@utils/text'
import { format } from 'timeago.js' 
import { LoadingSmall } from '@components/LoadingBox'
import { HoverImage, NewProjectStyles } from '@components/Projects'
import { Label, ItemTitle, Body } from '@components/Typography'

const SpotifyContent = styled.div`
  position: relative;
  transition: all 120ms ease-out;
  display: flex;
  align-items: center;
`

const SpotifyLink = styled.a`
  ${NewProjectStyles}
  &:hover, &:focus {
    ${SpotifyContent} {
      transform: translateX(${designTokens.space[3]});
    }
  }
`

const SpotifyContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${designTokens.space[3]};
  padding: ${designTokens.space[3]} 0;
`

const ContentContainer = styled.div`
  flex: 1 1 0%;
  padding-left: ${designTokens.space[3]};
  padding-right: ${designTokens.space[8]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-right: ${designTokens.space[3]};
  }
`

const Content = styled.div`
  color: ${props => props.subtle ? 'var(--grey500)' : 'inherit'};
`

const SmallLink = css`
  font-size: ${designTokens.sizing._sm};
  color: var(--grey900);
  border: 0;
  cursor: pointer;
  appearance: none;
  text-decoration: none;
  overflow-wrap: break-word;
  border-radius: ${designTokens.space[1]};
  padding-left: ${designTokens.space[1]};
  padding-right: ${designTokens.space[1]};
  padding-top: ${designTokens.space[1]};
  padding-bottom: ${designTokens.space[1]};
  background: var(--grey200);
  transition: all 120ms ease-out 0s;
  &:hover,&:focus {
    background: var(--primaryTransparent);
  }
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    font-size: ${designTokens.sizing._xs};
  }
`

const InteriorButton = styled.button`
  ${SmallLink}
  margin-left: ${props => props.marginLeft ? '40px' : '0px'};
`

const InteriorLink = styled.a`
  ${SmallLink}
  margin-left: ${props => props.marginLeft ? '40px' : '0px'};
`

const TypeIcon = styled.div`
  display: inline-flex;
  font-size: ${designTokens.sizing._sm};
  background: ${props => props.secondary ? 'var(--secondaryTransparent)' : 'var(--tertiaryTransparent)'};
  margin-right: ${designTokens.space[2]};
  color: ${props => props.secondary ? 'var(--secondaryDark)' : 'var(--tertiaryDark)'};;
  align-items: center;
  justify-content: center;
  width: ${designTokens.space[3]};
  height: ${designTokens.space[3]};
  border-radius: ${designTokens.space[1]};
  line-height: 1;
  font-weight: ${designTokens.fontWeights.subheading};
`

const MobileTextContainer = styled.div`
  display: block;
  @media screen and (max-width: ${designTokens.breakpoints[5]}) {
    display: none;
  }
`

const SpotifyIcon = ({active}) => {
  return(
    <svg width="24" viewBox="0 0 168 168">
      <path
        fill={active ? '#1ED760' : 'var(--grey400)'}
        d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
      />
    </svg>
  )
}

const ExplicitIcon = () => {
  return (
    <TypeIcon secondary>
      E
    </TypeIcon>
  )
}

const CollabIcon = () => {
  return (
    <TypeIcon>
      C
    </TypeIcon>
  )
}

export const SpotifyTrack = ({track}) => {

  return (
    <>
      {
        track && track.songUrl ? (
          <SpotifyLink
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={track.title}
          >
            <SpotifyContent>
              <SpotifyIcon active/>
              <ContentContainer>
                <Content>
                  <ItemTitle small>
                    {truncateString(track.title, 56)}
                  </ItemTitle>
                  <Label subtle>
                    {
                      track.explicit ? (
                        <ExplicitIcon/>
                      )
                      :
                      null
                    }
                    by {truncateString(track.artist,56)}
                    {
                      track.played ? (
                        <span>
                          &nbsp;• {format(track.played)}
                        </span>
                      )
                      :
                      null
                    }
                  </Label>
                </Content>
              </ContentContainer>
            </SpotifyContent>
            <HoverImage src={track.albumImageUrl} alt={track.artist} />
          </SpotifyLink>
        )
        :
        (
          <LoadingSmall title={'Loading...'}/>
        )
      }
    </>
  );
}

export const SpotifyPodcast = ({podcast}) => {

  return (
    <>
      {
        podcast && podcast.showUrl ? (
          <SpotifyLink
            href={podcast.showUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={podcast.name}
          >
            <SpotifyContent>
              <SpotifyIcon active/>
              <ContentContainer>
                <Label subtle mb={2}>{truncateString(podcast.publisher, 56)}</Label>
                <Content>
                  <ItemTitle small>{truncateString(podcast.name, 56)}</ItemTitle>
                  <Body subtle small>
                    {truncateString(podcast.description, 76)}
                  </Body>
                </Content>
              </ContentContainer>
            </SpotifyContent>
            <HoverImage src={podcast.showImageUrl} alt={podcast.name} />
          </SpotifyLink>
        )
        :
        (
          <LoadingSmall title={'Loading...'}/>
        )
      }
    </>
  );
}

export const SpotifyPlaylist = ({playlist}) => {

  return (
    <>
      {
        playlist && playlist.playlistUrl ? (
          <SpotifyLink
            href={playlist.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={playlist.title}
          >
            <SpotifyContent>
              <SpotifyIcon active/>
              <ContentContainer>
                <Content>
                  <Label subtle mb={2}>Playlist ({playlist.tracks} song{playlist.tracks !== 1 ? 's' : null})</Label>
                  <ItemTitle small>{truncateString(playlist.title, 56)}</ItemTitle>
                  <Body subtle small>
                    {
                      playlist.collaborative ? (
                        <CollabIcon/>
                      )
                      :
                      null
                    }
                    {truncateString(playlist.description, 72)}
                  </Body>
                </Content>
              </ContentContainer>
            </SpotifyContent>
            <HoverImage src={playlist.playlistImageUrl} alt={playlist.title} />
          </SpotifyLink>
        )
        :
        (
          <LoadingSmall title={'Loading...'}/>
        )
      }
    </>
  );
}

export const SpotifyLastPlayed = ({action}) => {
  const { data } = useSWR('/api/spotify/last-played', fetcher);

  return (
    <>
    {
      data?.songUrl ? (
        <SpotifyLink
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SpotifyContent>
            <SpotifyIcon active/>
            <ContentContainer>
              <Content>
                <Label subtle mb={2}>Recently played:</Label>
                <ItemTitle small>{truncateString(data.title, 56)}</ItemTitle>
                <Label subtle>
                  {
                      data.explicit ? (
                        <ExplicitIcon/>
                      )
                      :
                      null
                  }
                  by {data.artist}
                  {
                    data.played ? (
                      <span>
                        &nbsp;• {format(data.played)}
                      </span>
                    )
                    :
                    null
                  }
                </Label>
              </Content>
            </ContentContainer>
          </SpotifyContent>
          <HoverImage src={data.albumImageUrl} alt={data.artist} />
        </SpotifyLink>
      )
      :
      (
        <LoadingSmall title={'Loading...'}/>
      )
    }
    {
      data?.songUrl && action ? (
        <div style={{ marginTop: designTokens.space[2] }}>
          <InteriorButton
            marginLeft
            onClick={action}
          >
            View Currently Playing
          </InteriorButton>
          {' '}<small>or</small>{' '}
          <Link href="/listening" shallow>
            <InteriorLink>
              View More...
            </InteriorLink>
          </Link>
        </div>
      )
      :
      null
    }
    </>
  );
}

export const SpotifyNowPlaying = ({action}) => {
  const { data } = useSWR('/api/spotify/playing-music', fetcher);

  return (
    <>
      {
        data ? (
          <>
            {
              data.currently_playing.isPlaying && (
                <SpotifyLink
                  href={data.currently_playing.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SpotifyContent>
                    <SpotifyIcon active/>
                    <ContentContainer>
                      <Label subtle mb={2}>Currently Playing</Label>
                      <Content>
                        <ItemTitle small>{truncateString(data.currently_playing.title, 56)}</ItemTitle>
                        <Body subtle small>
                          {
                            data.currently_playing.explicit ? (
                              <ExplicitIcon/>
                            )
                            :
                            null
                          }
                          by {data.currently_playing.artist}
                        </Body>
                      </Content>
                    </ContentContainer>
                  </SpotifyContent>
                  <HoverImage src={data.currently_playing.albumImageUrl} alt={data.currently_playing.artist} />
                </SpotifyLink>
              )
            }
            <div style={{ marginTop: designTokens.space[2] }}>
              <InteriorButton
                marginLeft
                onClick={action}
              >
                View Last Played
              </InteriorButton>
              {' '}<small>or</small>{' '}
              <Link href="/listening" shallow>
                <InteriorLink>
                  View More...
                </InteriorLink>
              </Link>
            </div>
          </>
        )
        :
        (
          <LoadingSmall/>
        )
      }
    </>
  );
}

export const SpotifyNowPlayingPodcast = ({action}) => {
  const { data } = useSWR('/api/spotify/playing-podcast', fetcher);

  return (
    <>
      {
        data ? (
          <>
            {
              data.currently_playing.isPlaying && (
                <SpotifyLink
                  href={data.currently_playing.podcastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SpotifyContent>
                    <SpotifyIcon active/>
                    <ContentContainer>
                      <Label subtle mb={2}>Currently Playing</Label>
                      <Content>
                        <ItemTitle small>{truncateString(data.currently_playing.episodeTitle, 56)}</ItemTitle>
                        <MobileTextContainer>
                          <Body subtle small>
                            {
                              data.currently_playing.explicit ? (
                                <ExplicitIcon/>
                              )
                              :
                              null
                            }
                            {truncateString(data.currently_playing.episodeDescription, 80)}
                          </Body>
                        </MobileTextContainer>
                        <Label mt={1}>{data.currently_playing.podcastName} by {data.currently_playing.publisher}</Label>
                      </Content>
                    </ContentContainer>
                  </SpotifyContent>
                  <HoverImage src={data.currently_playing.podcastImgUrl} alt={data.currently_playing.podcastName} />
                </SpotifyLink>
              )
            }
            <div style={{ marginTop: designTokens.space[2] }}>
              <InteriorButton
                marginLeft
                onClick={action}
              >
                View Last Played
              </InteriorButton>
              {' '}<small>or</small>{' '}
              <Link href="/listening" shallow>
                <InteriorLink>
                  View More...
                </InteriorLink>
              </Link>
            </div>
          </>
        )
        :
        (
          <LoadingSmall/>
        )
      }
    </>
  );
}

const SpotifyNotPlaying = ({ action }) => {

  return (
    <>
      <SpotifyContainer>
          <SpotifyIcon/>
          <ContentContainer>
            <Content subtle>
              <Body>Not currently listening</Body>
              {
                action ? (
                  <div style={{ marginTop: designTokens.space[2] }}>
                    <InteriorButton
                      onClick={action}
                    >
                      View Last Played
                    </InteriorButton>
                    {' '}<small>or</small>{' '}
                    <Link href="/listening" shallow>
                      <InteriorLink>
                        View More...
                      </InteriorLink>
                    </Link>
                  </div>
                )
                :
                null
              }
            </Content>
          </ContentContainer>
        </SpotifyContainer>
    </>
  );
}

export const SpotifyCurrentlyPlaying = ({playing}) => {

  const { data } = useSWR('/api/spotify/player', fetcher);

  const [toggle, setToggle] = useState(playing)

  return (
    <>
    {
      data ? (
        <motion.div
          style={{ position: 'relative' }}
          initial={{ top: designTokens.space[4], opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          ariaLive="polite"
        >
          {
            toggle ? (
              <>
                {
                  data.isPlaying ? (
                    <>
                      {
                        data.playing === 'episode' ? (
                          <SpotifyNowPlayingPodcast
                            action={() => setToggle(!toggle)}
                          />
                        )
                        :
                        (
                          <SpotifyNowPlaying
                            action={() => setToggle(!toggle)}
                          />
                        )
                      }
                    </>
                  )
                  :
                  (
                    <SpotifyNotPlaying
                      action={() => setToggle(!toggle)}
                    />
                  )
                }
              </>
            )
            :
            (
              <SpotifyLastPlayed
                action={() => setToggle(!toggle)}
              />
            )
          }
        </motion.div>
      )
      :
      (
        <LoadingSmall/>
      )
    }
    </>
  );
}