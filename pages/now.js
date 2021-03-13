import Layout, { Wrapper } from '@components/Layout/'
import Link from 'next/link'
import Subscribe from '@components/Subscribe'
import { designTokens } from '@components/Theme/designTokens'
import Title from '@components/Title'
import { NowLogo } from '@components/Logo'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import List, { ListItem } from '@components/List'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'
import { format } from 'timeago.js'


const Section = ({title, data}) => {
  return(
    <>
      <h3>{title}</h3>
      <ul>
        {
          data.map((item, i) => (
            <li key={i}>
              <strong>{item.Name}</strong> - {item.Description}
            </li>
          ))
        }
      </ul>
      <hr/>
    </>
  )
}

const Content = ({data}) => {
  return(
    <>
      {
        data && (
          <>
            {
              data.now.working.length > 0 && (
                <Section title={'Working 💼'} data={data.now.working}/>
              )
            }
            {
              data.now.building.length > 0 && (
                <Section title={'Building 🛠'} data={data.now.building}/>
              )
            }
            <h3>Listening 🎧</h3>
            <SpotifyCurrentlyPlaying/>
            <hr/>
            {
              data.now.playing.length > 0 && (
                <Section title={'Playing 🎉'} data={data.now.playing}/>
              )
            }
            {
              data.now.reading.length > 0 && (
                <Section title={'Reading 📚'} data={data.now.reading}/>
              )
            }
          </>
        )
      }
    </>
  )
}

const Page = ({ title, description, ...props }) => {

  const { data } = useSWR('/api/now/', fetcher);
  console.log(data)

  return (
    <>
      <Layout pageTitle={`${title} | Now`} description={description} ogImage="/notes-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '72px'}}>
              <NowLogo/>
            </div>
            <h1>Now</h1>
            <p className="lead">Here's a quick summary of what I'm doing and another addition to the <a href="https://nownownow.com/" target="_blank" className="link">NowNowNow Project</a>.</p>
            {
              data && (
                <p>Last updated {format(data.lastModified)}</p>
              )
            }
          </Title>
          <Content data={data}/>
          <Subscribe/>
        </Wrapper>
      </Layout>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
