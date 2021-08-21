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

const AlbumImage = styled.img`
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  border-radius: ${designTokens.space[1]};
  box-shadow: 0px 0px 0px 2px var(--grey200);
  position: absolute;
  right: ${designTokens.space[1]};
  top: 50%;
  transform: translateY(-50%);
  transition: all 120ms ease-out 0ms;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    width: ${designTokens.space[6]};
    height: ${designTokens.space[6]};
  }
`

const SpotifyLink = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${designTokens.space[2]};
  padding: ${designTokens.space[3]} 0;
  transition: all 120ms ease-out 0s;
  color: var(--grey900);
  position: relative;
  overflow: hidden;
  &:hover, &:focus {
    padding-left: ${designTokens.space[3]};
    text-decoration: none;
    box-shadow: inset 4px 0px 0px var(--primary);
    background: var(--grey100);
    ${AlbumImage} {
      transform: translateY(-50%) translateX(-${designTokens.space[6]}) rotate(10deg) scale(3);
      box-shadow: 0px 4px 8px -1px var(--grey300);
      @media screen and (max-width: ${designTokens.breakpoints[4]}) {
        transform: translateY(-50%) translateX(${designTokens.space[3]}) rotate(10deg) scale(1.5);
      }
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
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-right: ${designTokens.space[7]};
  }
`

const Label = styled.div`
  font-size: ${designTokens.fontSizes[0]};
  opacity: 50%;
  margin-bottom: ${designTokens.space[1]};
`

const Content = styled.div`
  color: ${props => props.subtle ? 'var(--grey500)' : 'inherit'};
`

const SmallLink = css`
  font-size: ${designTokens.fontSizes[0]};
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
  font-size: ${designTokens.fontSizes[0]};
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
          >
            <SpotifyIcon active/>
            <ContentContainer>
              <Content>
                <strong>
                  {truncateString(track.title, 56)}
                </strong>
                <br/>
                <small>
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
                      <span style={{
                        fontSize: designTokens.fontSizes[0],
                        color: 'var(--grey600)'
                      }}>
                        &nbsp;• {format(track.played)}
                      </span>
                    )
                    :
                    null
                  }
                </small>
              </Content>
            </ContentContainer>
            <AlbumImage src={track.albumImageUrl} alt={track.artist}/>
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
          >
            <SpotifyIcon active/>
            <ContentContainer>
              <Label>{truncateString(podcast.publisher, 56)}</Label>
              <Content>
                <strong>{truncateString(podcast.name, 56)}</strong>
                <br/>
                <p
                  style={{
                    opacity: 0.5,
                    fontSize: designTokens.fontSizes[0],
                    lineHeight: designTokens.lineHeights.body,
                    marginBottom: '0'
                  }}
                >
                  {truncateString(podcast.description, 80)}
                </p>
              </Content>
            </ContentContainer>
            <AlbumImage src={podcast.showImageUrl} alt={podcast.name}/>
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
          >
            <SpotifyIcon active/>
            <ContentContainer>
              <Label>Playlist ({playlist.tracks} song{playlist.tracks !== 1 ? 's' : null})</Label>
              <Content>
                <strong>{truncateString(playlist.title, 56)}</strong>
                <br/>
                <p
                  style={{
                    opacity: 0.5,
                    fontSize: designTokens.fontSizes[0],
                    lineHeight: designTokens.lineHeights.body,
                    marginBottom: '0'
                  }}
                >
                  {
                    playlist.collaborative ? (
                      <CollabIcon/>
                    )
                    :
                    null
                  }
                  {truncateString(playlist.description, 80)}
                </p>
              </Content>
            </ContentContainer>
            <AlbumImage src={playlist.playlistImageUrl} alt={playlist.title}/>
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
  const { data } = useSWR('/api/last-played', fetcher);

  return (
    <>
    {
      data?.songUrl ? (
        <SpotifyLink
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SpotifyIcon active/>
          <ContentContainer>
            <Label>Recently played:</Label>
            <Content>
              <strong>{truncateString(data.title, 56)}</strong>
              <br/>
              <small>
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
                    <span style={{
                      fontSize: designTokens.fontSizes[0],
                      color: 'var(--grey600)'
                    }}>
                      &nbsp;• {format(data.played)}
                    </span>
                  )
                  :
                  null
                }
              </small>
            </Content>
          </ContentContainer>
          <AlbumImage src={data.albumImageUrl} alt={data.artist}/>
        </SpotifyLink>
      )
      :
      (
        <LoadingSmall title={'Loading...'}/>
      )
    }
    {
      data?.songUrl && action ? (
        <>
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
        </>
      )
      :
      null
    }
    </>
  );
}

export const SpotifyNowPlaying = ({action}) => {
  const { data } = useSWR('/api/now-playing', fetcher);

  return (
    <>
    {
      data?.isPlaying ? (
        <SpotifyLink
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SpotifyIcon active/>
          <ContentContainer>
            <Label>Currently Playing</Label>
            <Content>
              <strong>{truncateString(data.title, 56)}</strong>
              <br/>
              <small>
                {
                  data.explicit ? (
                    <ExplicitIcon/>
                  )
                  :
                  null
                }
                by {data.artist}
              </small>
            </Content>
          </ContentContainer>
          <AlbumImage src={data.albumImageUrl} alt={data.artist}/>
        </SpotifyLink>
      )
      :
      (
        <SpotifyContainer>
          <SpotifyIcon/>
          <ContentContainer>
            <Content subtle>
              <div style={{ marginBottom: designTokens.space[2] }}>Not currently listening</div>
              {
                action ? (
                  <>
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
                  </>
                )
                :
                null
              }
            </Content>
          </ContentContainer>
        </SpotifyContainer>
      )
    }
    {
      data?.songUrl && action ? (
        <>
          <InteriorButton
            marginLeft
            onClick={action}
          >
            View Last Played
          </InteriorButton>
        </>
      )
      :
      null
    }
    </>
  );
}

export const SpotifyNowPlayingPodcast = ({action}) => {
  const { data } = useSWR('/api/podcast-playing', fetcher);

  return (
    <>
    {
      data?.isPlaying ? (
        <SpotifyLink
          href={data.podcastUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SpotifyIcon active/>
          <ContentContainer>
            <Label>Currently Playing</Label>
            <Content>
              <strong>{truncateString(data.episodeTitle, 56)}</strong>
              <br/>
              <small style={{ opacity: 0.5 }}>
                {
                  data.explicit ? (
                    <ExplicitIcon/>
                  )
                  :
                  null
                }
                {truncateString(data.episodeDescription, 80)}
              </small>
              <br/>
              <small>{data.podcastName} by {data.publisher}</small>
            </Content>
          </ContentContainer>
          <AlbumImage src={data.podcastImgUrl} alt={data.podcastName}/>
        </SpotifyLink>
      )
      :
      (
        <SpotifyContainer>
          <SpotifyIcon/>
          <ContentContainer>
            <Content subtle>
              <div style={{ marginBottom: designTokens.space[2] }}>Not currently listening</div>
              {
                action ? (
                  <>
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
                  </>
                )
                :
                null
              }
            </Content>
          </ContentContainer>
        </SpotifyContainer>
      )
    }
    {
      data?.podcastUrl && action ? (
        <>
          <InteriorButton
            marginLeft
            onClick={action}
          >
            View Last Played
          </InteriorButton>
        </>
      )
      :
      null
    }
    </>
  );
}

export const SpotifyCurrentlyPlaying = ({playing}) => {

  const { data } = useSWR('/api/now-playing', fetcher);

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
                  data?.isPlaying ? (
                    <SpotifyNowPlaying
                      action={() => setToggle(!toggle)}
                    />
                  )
                  :
                  (
                    <SpotifyNowPlayingPodcast
                      action={() => setToggle(!toggle)}
                    />
                  )
                }
              </>
            )
            : (
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