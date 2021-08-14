import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { PortfolioList, Form } from '@components/Portfolios'
import { AMALogo } from '@components/Logo'

const Page = ({ token, posts, title, description, ...props }) => {

  const { data } = useSWR('/api/portfolios/list', fetcher);
  return (
    <>
      <Layout pageTitle={`${title} | Portfolios`} description={description} ogImage="/ama-social-media.png">
        <Wrapper>
          <Title>
            <div style={{ width: '64px', fontSize: '64px', lineHeight: '1' }}>
              🤠
            </div>
            <h1>Portfolios</h1>
            <p className="lead">A list of portfolios, personal sites, and designers that are dope </p>
            <Form/>
          </Title>
          <PortfolioList
            items={data}
          />
        </Wrapper>
      </Layout>
    </>
  )
}

export default Page

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