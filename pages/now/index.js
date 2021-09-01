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
import { SmallButton, SmallButtonDanger } from '@components/Button'
import { CreateItem } from '@components/Now'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import NotionLogo from '@components/Logo/NotionLogo'
import { Label, Body, ItemTitle } from '@components/Typography'

const ListInner = styled.div`
  padding: ${designTokens.space[3]} 0;
`

const LineItem = ({ token, item }) => {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)

  const handleClick = async () => {

    const message = {
      title: title,
      description: description,
      id: item.id,
      deleteItem: false
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

  const deleteLineItem = async () => {

    const message = {
      title: title,
      description: description,
      id: item.id,
      deleteItem: true
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

  return(
    <>
      {
        !edit ? (
          <ListItem key={item.id}>
            <ListInner>
              <ItemTitle>{title}</ItemTitle>
              <Body>{description}</Body>
              <Label subtle mt={2} mb={token === "loggedIn" ? 3 : 0}>Updated {format(item.last_edited)}</Label>
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <SmallButtonDanger onClick={deleteLineItem}>Delete</SmallButtonDanger>
              <div>
                <SmallButton onClick={() => setEdit(false)}>Cancel</SmallButton>
                &nbsp;&nbsp;
                <SmallButton onClick={handleClick}>Save</SmallButton>
              </div>
            </div>
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

  const { data, error } = useSWR('/api/profile/now', fetcher);

  if(error) {
    return(<Error/>)
  }

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
          {
            data ? (
              <Content token={token} data={data}/>
            )
            :
            (
              <LoadingBox/>
            )
          }
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
