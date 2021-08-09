import React, { useState } from 'react'
import Layout, { Wrapper } from '@components/Layout/'
import Subscribe from '@components/Subscribe'
import Title from '@components/Title'
import { NowLogo } from '@components/Logo'
import useSWR from 'swr';
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import fetcher from '@utils/fetcher';
import { SpotifyCurrentlyPlaying } from '@components/Spotify'
import { format } from 'timeago.js'
import List, { ListItem } from '@components/List'
import { ButtonAnchorTag, SmallButton } from '@components/Button'
import { CreateItem } from '@components/Now'

const Label = styled.div`
  font-size: ${designTokens.fontSizes[0]};
  opacity: 50%;
  margin-top: ${designTokens.space[1]};
`

const ListInner = styled.div`
  padding: ${designTokens.space[3]} 0;
`

const NotionLogo = () => {
  return (
    <div>
      <div style={{
        marginBottom: designTokens.space[2],
        color: 'var(--grey500)'
      }}>
        <small>Powered by</small>
      </div>
      <ButtonAnchorTag
        href="https://github.com/lyft/coloralgorithm"
        target="_blank"
      >
        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.0574 0.0680181L2.41835 1.29402C1.07835 1.41002 0.610352 2.28502 0.610352 3.33402V21.532C0.610352 22.349 0.901352 23.048 1.60235 23.982L5.51335 29.056C6.15635 29.873 6.73935 30.048 7.96635 29.99L27.2874 28.823C28.9214 28.707 29.3894 27.948 29.3894 26.665V6.19202C29.3894 5.52902 29.1264 5.33802 28.3524 4.77202L28.2204 4.67602L22.9104 0.943018C21.6254 0.0110181 21.1004 -0.106982 19.0564 0.0680181H19.0574ZM8.40535 5.85702C6.82735 5.96302 6.46935 5.98702 5.57335 5.26002L3.29535 3.45202C3.06335 3.21802 3.17935 2.92602 3.76335 2.86802L19.7584 1.70202C21.1004 1.58502 21.8004 2.05202 22.3264 2.46002L25.0694 4.44402C25.1864 4.50202 25.4774 4.85102 25.1274 4.85102L8.60835 5.84302L8.40535 5.85702V5.85702ZM6.56435 26.49V9.11002C6.56435 8.35102 6.79735 8.00102 7.49735 7.94202L26.4684 6.83402C27.1124 6.77602 27.4034 7.18402 27.4034 7.94202V25.206C27.4034 25.965 27.2864 26.607 26.2354 26.665L8.08135 27.715C7.03135 27.773 6.56435 27.424 6.56435 26.49V26.49ZM24.4864 10.042C24.6034 10.567 24.4864 11.092 23.9604 11.152L23.0854 11.325V24.157C22.3254 24.565 21.6254 24.798 21.0424 24.798C20.1084 24.798 19.8744 24.506 19.1744 23.632L13.4524 14.65V23.34L15.2624 23.749C15.2624 23.749 15.2624 24.799 13.8024 24.799L9.77535 25.032C9.65835 24.798 9.77535 24.215 10.1844 24.099L11.2344 23.808V12.318L9.77535 12.2C9.65835 11.675 9.95035 10.917 10.7684 10.859L15.0884 10.567L21.0424 19.667V11.617L19.5244 11.443C19.4074 10.8 19.8744 10.334 20.4574 10.276L24.4874 10.042H24.4864Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0">
            <rect width="30" height="30" fill="red"/>
            </clipPath>
          </defs>
        </svg>
        <strong
          style={{
            marginLeft: designTokens.space[2]
          }}>
            Notion API
        </strong>
      </ButtonAnchorTag>
    </div>
  )
}

const LineItem = ({ token, item }) => {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [deleteItem, setDelete] = useState(false)

  const handleClick = async () => {

    const message = {
      title: title,
      description: description,
      id: item.id,
      deleteItem: deleteItem
    }

    setEdit(false)
    
    const response = await fetch('api/profile/now-edit', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
  }

  const deleteLineItem = () => {
    setDelete(true)
    handleClick()
  }

  return(
    <>
      {
        !edit ? (
          <ListItem key={item.id}>
            <ListInner>
              <strong>{title}</strong>
              <br/>
              {description}
              <Label>Updated {format(item.last_edited)}</Label>
              {
                token === "loggedIn" ? (<SmallButton onClick={() => setEdit(true)}>Edit</SmallButton>) : null
              }
            </ListInner>
          </ListItem>
        )
        :
        (
          <div
            style={{
              borderLeft: `${designTokens.space[1]} solid var(--primary)`,
              padding: `${designTokens.space[3]} 0 ${designTokens.space[3]} ${designTokens.space[3]}`
            }}
          >
            <Label>Title</Label>
            <input
              type="text"
              placeholder="Enter the primary value..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Label>Description</Label>
            <textarea
              placeholder="Enter a description..."
              value={description}
              style={{ height: designTokens.space[8] }}
              onChange={e => setDescription(e.target.value)}
            />
            <SmallButton onClick={() => deleteLineItem()}>Delete</SmallButton>
            &nbsp;&nbsp;
            <SmallButton onClick={() => handleClick()}>Save</SmallButton>
          </div>
        )
      }
    </>
  )
}


const Section = ({token, title, type, data}) => {
  return(
    <>
      <h3>{title}</h3>
      <List>
        {
          data.map((item) => (
            <LineItem token={token} key={item.id} item={item}/>
          ))
        }
        { token === "loggedIn" ? (<CreateItem type={type}/>) : null }
      </List>
      <hr/>
    </>
  )
}

const Content = ({token, data}) => {

  return(
    <>
      {
        data && (
          <>
            {
              data.now.working.length > 0 && (
                <Section token={token} type={'Working'} title={'Working 💼'} data={data.now.working}/>
              )
            }
            {
              data.now.building.length > 0 && (
                <Section token={token} type={'Building'} title={'Building 🛠'} data={data.now.building}/>
              )
            }
            <h3>Listening 🎧</h3>
            <SpotifyCurrentlyPlaying/>
            <hr/>
            {
              data.now.playing.length > 0 && (
                <Section token={token} type={'Playing'} title={'Playing 🎉'} data={data.now.playing}/>
              )
            }
            {
              data.now.reading.length > 0 && (
                <Section token={token} type={'Reading'} title={'Reading 📚'} data={data.now.reading}/>
              )
            }
          </>
        )
      }
    </>
  )
}

const Page = ({ token, title, description, ...props }) => {

  const { data } = useSWR('/api/profile/now', fetcher);

  return (
    <>
      <Layout pageTitle={`${title} | Now`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '72px'}}>
              <NowLogo/>
            </div>
            <h1>Now</h1>
            <p className="lead">Here's a quick summary of what I'm doing and another addition to the <a href="https://nownownow.com/" target="_blank" className="link">NowNowNow Project</a>.</p>
            <NotionLogo/>
          </Title>
          <Content token={token} data={data}/>
          <Subscribe/>
        </Wrapper>
      </Layout>
    </>
  )
}

export default Page

export async function getServerSideProps({ req, res}) {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      token: req.cookies.token || ""
    },
  }
}
