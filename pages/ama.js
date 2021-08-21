import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { Questions, Form } from '@components/AMA'
import { AMALogo } from '@components/Logo'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import NotionLogo from '@components/Logo/NotionLogo'

const AMA = ({ token, posts, title, description, ...props }) => {

  const { data, error } = useSWR('/api/ama/questions/', fetcher);

  return (
    <>
      <Layout pageTitle={`${title} | AMA`} description={description} ogImage="/ama-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px'}}>
              <AMALogo/>
            </div>
            <h1>Ask me anything</h1>
            <p className="lead">Send over any kind of question you may have for me - once it's answered, it'll show up in the list</p>
            <NotionLogo/>
            <Form/>
          </Title>
          {
            data ? (
              <Questions
                editable={token === "loggedIn"}
                questions={data}
              />
            )
            :
            (
              <LoadingBox>
                Loading
              </LoadingBox>
            )
          }
          {
            error && (
              <Error/>
            )
          }
        </Wrapper>
      </Layout>
    </>
  )
}

export default AMA

export async function getServerSideProps({ req, res}) {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      token: req.cookies.token || ""
    },
  }
}
