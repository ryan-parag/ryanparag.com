import Link from 'next/link'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background: rgba(0,0,0, 0.08);
  padding: 24px 16px;
`

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <nav role="navigation" aria-label="main navigation">
          <Link href="/">
            <a>Notes</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
      </HeaderContainer>
    </>
  )
}
