import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout, { Wrapper } from '@components/Layout/'
import { ButtonPrimary, Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import Title from '@components/Title'
import { WordleIcon } from '@components/Logo'
import Link from 'next/link'
import { Label } from '@components/Typography'
import Form from '@components/Wordle/Form'

const Container = styled.div`
  width: 100%;
  max-width: calc(${designTokens.space[10]} * 2);
  margin: auto;
  padding: ${designTokens.space[3]} ${designTokens.space[3]};
  margin-bottom: ${designTokens.space[5]};
`

const Page = ({ token, title, description, ...props }) => {

  const [pass, setPass] = useState('')
  const router = useRouter()

  const checkLogin = async (event) => {
    event.preventDefault()
    const response = await fetch("/api/profile/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "token" : pass})
    })
    router.replace(router.asPath);
  }

  useEffect(() => {
    
 }, [pass]);

  return (
    <>
      <Layout pageTitle={`${title} | Wordle`} description={description} ogImage="/wordle-social-media.png">
        <Wrapper>
          <Container>
            <Title>
              <div style={{ width: '64px', marginBottom: designTokens.space[4] }}>
                <WordleIcon/>
              </div>
              <Link href="/wordle/activity">
                <a className="link">←{' '}Back to Activity</a>
              </Link>
              <h1>Submit Wordle</h1>
              <p className="lead">Copy/Paste the results from Wordle</p>
            </Title>
            {
              token === "loggedIn" ? (
                <Form/>
              )
              :
              (
                <form onSubmit={checkLogin}>
                  <p>Login to submit Wordle result</p>
                  <input
                    type="password"
                    placeholder="Enter password..."
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                  />
                  {
                    token === 'error' ? (
                      <div style={{ marginBottom: designTokens.space[3] }}>
                        <small style={{ color: 'var(--secondaryDark)'}}>Oops - incorrect password</small>
                      </div>
                    )
                    :
                    null
                  }
                  {
                    pass.length > 0 ? (
                      <ButtonPrimary
                        type="submit"
                        onClick={checkLogin}
                      >
                        Login
                      </ButtonPrimary>
                    )
                    :
                    null
                  }
                </form>
              )
            }
          </Container>
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
