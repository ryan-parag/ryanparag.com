import useSWR from 'swr';
import React, { useState } from 'react'
import fetcher from '@utils/fetcher';
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const SpotifyLink = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${designTokens.space[2]};
  padding: ${designTokens.space[3]} 0;
  transition: all 120ms ease-out 0s;
  color: var(--grey900);
  &:hover, &:focus {
    padding-left: ${designTokens.space[3]};
    text-decoration: none;
    box-shadow: inset 4px 0px 0px var(--primary);
    background: var(--grey100);
    img {
      transform: rotate(10deg) scale(2);
      box-shadow: 0px 4px 8px -1px var(--grey300);
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
`

const AlbumImage = styled.img`
  width: calc(${designTokens.space[5]} + ${designTokens.space[2]});
  height: calc(${designTokens.space[5]} + ${designTokens.space[2]});
  border-radius: ${designTokens.space[1]};
  box-shadow: 0px 0px 0px 2px var(--grey200);
  transition: all 120ms ease-out 30ms;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Label = styled.div`
  font-size: ${designTokens.fontSizes[0]};
  opacity: 50%;
  margin-bottom: ${designTokens.space[1]};
`

const Content = styled.div`
  color: ${props => props.subtle ? 'var(--grey400)' : 'inherit'};
`

const InteriorButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: ${designTokens.fontSizes[0]};
  color: var(--primaryDark);
  padding: 0;
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    text-decoration: underline;
  }
`

export const SpotifyLastPlayed = ({action}) => {
  const { data } = useSWR('./api/last-played', fetcher);

  return (
    <>
    {
      data?.songUrl ? (
        <SpotifyLink
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="24" viewBox="0 0 168 168">
            <path
              fill="#1ED760"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <ContentContainer>
            <Label>Recently played:</Label>
            <Content><strong>{data.title}</strong> by {data.artist}</Content>
          </ContentContainer>
          <AlbumImage src={data.albumImageUrl}/>
        </SpotifyLink>
      )
      :
      (
        <SpotifyContainer>
          <svg width="24" viewBox="0 0 168 168">
            <path
              fill="var(--grey300)"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <ContentContainer>
            <Content subtle>
              <div>Something went wrong</div>
              {
                action ? (
                  <InteriorButton
                    onClick={action}
                  >
                    View Currently Playing
                  </InteriorButton>
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
        <InteriorButton
          onClick={action}
        >
          View Currently Playing
        </InteriorButton>
      )
      :
      null
    }
    </>
  );
}

export const SpotifyNowPlaying = ({action}) => {
  const { data } = useSWR('./api/now-playing', fetcher);

  return (
    <>
    {
      data?.songUrl ? (
        <SpotifyLink
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="24" viewBox="0 0 168 168">
            <path
              fill="#1ED760"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <ContentContainer>
            <Label>Currently Playing</Label>
            <Content><strong>{data.title}</strong> by {data.artist}</Content>
          </ContentContainer>
          <AlbumImage src={data.albumImageUrl}/>
        </SpotifyLink>
      )
      :
      (
        <SpotifyContainer>
          <svg width="24" viewBox="0 0 168 168">
            <path
              fill="var(--grey300)"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <ContentContainer>
            <Content subtle>
              <div>Not currently playing</div>
              {
                action ? (
                  <InteriorButton
                    onClick={action}
                  >
                    View Last Played
                  </InteriorButton>
                )
                :
                null
              }
            </Content>
          </ContentContainer>
        </SpotifyContainer>
      )
    }
    </>
  );
}

export const SpotifyCurrentlyPlaying = ({previous}) => {
  const [toggle, setToggle] = useState(previous)

  return (
    <>
      {
        !toggle ? (
          <SpotifyNowPlaying
            action={() => setToggle(!toggle)}
          />
        )
        : (
          <SpotifyLastPlayed
            action={() => setToggle(!toggle)}
          />
        )
      }
    </>
  );
}