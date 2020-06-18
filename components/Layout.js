import Head from 'next/head'

import Header from './Header'
import { Normalize } from 'styled-normalize'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin: auto;
`;

export default function Layout({ children, pageTitle, description, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <Normalize/>
      <section>
        <Header />
        <main>
          <LayoutContainer>{children}</LayoutContainer>
        </main>
      </section>
      <footer>
        Built with <img src="/netliheart.svg" alt="Netlify Heart" /> for you
      </footer>
    </>
  )
}
