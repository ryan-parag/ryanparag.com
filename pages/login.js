import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout, { Wrapper } from '@components/Layout/'
import { ButtonPrimary, Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'

const Container = styled.div`
  width: 100%;
  max-width: calc(${designTokens.space[10]} * 2);
  margin: auto;
  padding: ${designTokens.space[3]} ${designTokens.space[3]};
  margin-bottom: ${designTokens.space[5]};
`

const Login = ({ token, title, description, ...props }) => {

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

  const logout = async () => {
    const response = await fetch("/api/profile/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    router.replace(router.asPath);
  }

  useEffect(() => {
    
 }, [pass]);

  return (
    <>
      <Layout pageTitle={`${title} | RSS`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Container>
            <h1>{token === "loggedIn" ? "You are logged in" : "Admin Login"}</h1>
            {
              token === "loggedIn" ? (
                <Button
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              )
              :
              (
                <form onSubmit={checkLogin}>
                  <p>Enter the admin password to access editing features</p>
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

export default Login

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
