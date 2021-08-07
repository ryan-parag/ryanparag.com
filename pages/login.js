import React, { useState } from 'react'
import styled from 'styled-components'
import Layout, { Wrapper } from '@components/Layout/'
import { ButtonPrimary } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'

const Container = styled.div`
  width: 100%;
  max-width: calc(${designTokens.space[10]} * 2);
  margin: auto;
  padding: ${designTokens.space[3]} ${designTokens.space[3]};
  margin-bottom: ${designTokens.space[5]};
`

const Login = ({ title, description, ...props }) => {

  const [pass, setPass] = useState('')

  return (
    <>
      <Layout pageTitle={`${title} | RSS`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Container>
            <h1>Admin Login</h1>
              <p>Enter the admin password to access editing features</p>
              <input
                type="password"
                placeholder="Enter password..."
                onChange={e => setPass(e.target.value)}
                value={pass}
              />
              {
                pass.length > 0 ? (
                  <ButtonPrimary>
                    Login
                  </ButtonPrimary>
                )
                :
                null
              }
          </Container>
        </Wrapper>
      </Layout>
    </>
  )
}

export default Login

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
