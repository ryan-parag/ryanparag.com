import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { Questions, Form } from '@components/AMA'
import { AMALogo } from '@components/Logo'

const AMA = ({ posts, title, description, ...props }) => {

  const { data } = useSWR('/api/ama/questions/', fetcher);
  return (
    <>
      <Layout pageTitle={`${title} | AMA`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px'}}>
              <AMALogo/>
            </div>
            <h1>Ask me anything</h1>
            <p className="lead">Send over any kind of question you may have for me - once it's answered, it'll show up in the list</p>
            <Form/>
          </Title>
          <Questions
            questions={data}
          />
          {
            data && data.questions.waiting.length > 0 ? (
              <small
                style={{
                  color: 'var(--secondaryDark)'
                }}
              >
                {data.questions.waiting.length} question{data.questions.waiting.length > 1 ? 's' : ''} waiting to be answered
              </small>
            )
            :
            (
              null
            )
          }
        </Wrapper>
      </Layout>
    </>
  )
}

export default AMA

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
