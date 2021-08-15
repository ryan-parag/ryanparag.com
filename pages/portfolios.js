import React, { useState } from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { PortfolioList, Form } from '@components/Portfolios'
import styled from 'styled-components'
import { SmallButton, Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'

const SearchFilter = styled.div`
  position: relative;
  input {
    padding: ${designTokens.space[3]};
  }
  ${SmallButton} {
    position: absolute;
    right: ${designTokens.space[2]};
    top: 50%;
    transform: translateY(-50%);
  }
`

const ScrolledButton = styled(Button)`
  position: fixed;
  bottom: ${designTokens.space[3]};
  right: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Page = ({ token, title, description, ...props }) => {

  const [filterString, setFilterString] = useState('')

  const scrollToTop = () => {
    if(process.browser) {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }
  }

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
          <SearchFilter>
            <input
              type="text"
              value={filterString}
              placeholder="Filter by a name..."
              onChange={e => setFilterString(e.target.value)}
            />
            {
              filterString.length > 0 ? (
                <SmallButton
                  onClick={() => setFilterString('')}
                >
                  Clear
                </SmallButton>
              )
              :
              null
            }
          </SearchFilter>
          <PortfolioList
            items={data}
            filterString={filterString}
          />
        </Wrapper>
        <ScrolledButton
          onClick={() => scrollToTop()}
        >
          Scroll to Top
        </ScrolledButton>
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
      token: req.cookies.token || "",
    },
  }
}