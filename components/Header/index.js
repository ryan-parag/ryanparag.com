import NavItem from '../NavItem/'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'

const HeaderContainer = styled.header`
  padding: 24px 16px;
  width: 100%;
`

const HeaderInner = styled.div`
  width: 100%;
  max-width: 640px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Nav = styled.nav`
  a {
    padding: ${designTokens.space[2]} ${designTokens.space[3]};
    border: 1px solid ${({ theme }) => theme.grey200};
    border-radius: ${designTokens.space[1]};
    margin: 0 ${designTokens.space[1]} 0 0;
    display: inline-block;
    transition: all 120ms ease-out 0s;
    &:hover {
      background: ${({ theme }) => theme.grey100};
    }
    &.selected {
      background: ${({ theme }) => theme.greenTransparent};
      color: ${({ theme }) => theme.highlightedText};
      border-color: transparent;
    }
  }
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-flex;
`

const NavListItem = styled.li`
  margin-bottom: 0;
  &:not(:last-of-type) {
    margin-right: ${designTokens.space[1]};
  }
`

const OutboundNavLink = styled.a`
  padding: ${designTokens.space[2]} ${designTokens.space[3]};
  border-radius: ${designTokens.space[1]};
  display: inline-block;
  &:hover {
    background: ${({ theme }) => theme.grey100};
  }
`

const ThemeButton = styled.button`
  background: transparent;
  border-radius: ${designTokens.space[1]};
  color: ${({ theme }) => theme.grey600};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.grey200};
  height: 40px;
  width: 40px;
  svg {
    fill: currentColor;
    color: ${({ theme }) => theme.grey600};;
  }
`

export default function Header({ toggleTheme, theme }) {
  return (
    <>
      <HeaderContainer>
        <HeaderInner>
          <Nav role="navigation" aria-label="main navigation">
            <NavList>
              <NavListItem>
                <NavItem href="/">
                  <a>Notes</a>
                </NavItem>
              </NavListItem>
              <NavListItem>
                <NavItem href="/about">
                  <a>About</a>
                </NavItem>
              </NavListItem>
              <NavListItem>
                <OutboundNavLink href="https://ryanparag.com">
                  <div>
                    Portfolio
                    <span className="icon">&rarr;</span>
                  </div>
                  </OutboundNavLink>
              </NavListItem>
            </NavList>
          </Nav>
          <ThemeButton
            className={
              theme == 'dark' ?
                'active'
                :
                null
            }
            onClick={toggleTheme}
          >
            {
              theme == 'dark' ?
                (
                  <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='20' height='20' viewBox='0 0 512 512'><path d='M256,118a22,22,0,0,1-22-22V48a22,22,0,0,1,44,0V96A22,22,0,0,1,256,118Z'/><path d='M256,486a22,22,0,0,1-22-22V416a22,22,0,0,1,44,0v48A22,22,0,0,1,256,486Z'/><path d='M369.14,164.86a22,22,0,0,1-15.56-37.55l33.94-33.94a22,22,0,0,1,31.11,31.11l-33.94,33.94A21.93,21.93,0,0,1,369.14,164.86Z'/><path d='M108.92,425.08a22,22,0,0,1-15.55-37.56l33.94-33.94a22,22,0,1,1,31.11,31.11l-33.94,33.94A21.94,21.94,0,0,1,108.92,425.08Z'/><path d='M464,278H416a22,22,0,0,1,0-44h48a22,22,0,0,1,0,44Z'/><path d='M96,278H48a22,22,0,0,1,0-44H96a22,22,0,0,1,0,44Z'/><path d='M403.08,425.08a21.94,21.94,0,0,1-15.56-6.45l-33.94-33.94a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.55,37.56Z'/><path d='M142.86,164.86a21.89,21.89,0,0,1-15.55-6.44L93.37,124.48a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.56,37.55Z'/><path d='M256,358A102,102,0,1,1,358,256,102.12,102.12,0,0,1,256,358Z'/></svg>
                )
                :
                (
                  <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='20' height='20' viewBox='0 0 512 512'><path d='M264,480A232,232,0,0,1,32,248C32,154,86,69.72,169.61,33.33a16,16,0,0,1,21.06,21.06C181.07,76.43,176,104.66,176,136c0,110.28,89.72,200,200,200,31.34,0,59.57-5.07,81.61-14.67a16,16,0,0,1,21.06,21.06C442.28,426,358,480,264,480Z'/></svg>
                )
            }
          </ThemeButton>
        </HeaderInner>
      </HeaderContainer>
    </>
  )
}
