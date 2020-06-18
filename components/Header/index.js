import NavItem from '../NavItem/'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'

const HeaderContainer = styled.header`
  padding: 24px 16px;
`

const Nav = styled.nav`
  a {
    padding: ${designTokens.space[2]} ${designTokens.space[3]};
    border-radius: ${designTokens.space[1]};
    &.selected {
      background: ${({ theme }) => theme.greenTransparent};
      color: ${({ theme }) => theme.highlightedText};
    }
  }
`

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <Nav role="navigation" aria-label="main navigation">
          <NavItem href="/">
            <a>Notes</a>
          </NavItem>
          <NavItem href="/about">
            <a>About</a>
          </NavItem>
        </Nav>
      </HeaderContainer>
    </>
  )
}
