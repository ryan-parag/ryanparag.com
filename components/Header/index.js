import React, { useState } from 'react'
import NavItem from '../NavItem/'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import { lightTheme, darkTheme, notionLight, notionDark, hyrule, zora, gerudo } from '@components/Theme/'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const ThemePicker = styled.div`
  position: relative;
  max-height: 0;
  width: 100%;
  overflow: hidden;
  background: var(--grey100);
  transition: all 400ms cubic-bezier(.4,0,.2,1);
  &.isOpen {
    max-height: 200px;
  }
`

const ThemePickerBody = styled.div`
  padding: ${designTokens.space[4]} ${designTokens.space[3]};
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  text-align: center;
`

const ThemeItem = styled.button`
  display: inline-block;
  padding: ${designTokens.space[3]} ${designTokens.space[4]};
  background: ${props => props.bg};
  color: ${props => props.color};
  text-align: center;
  font-family: inherit;
  border: 1px solid ${props => props.border};
  cursor: pointer;
  border-radius: ${designTokens.space[1]};
  margin: 0 ${designTokens.space[3]};
  font-size: ${designTokens.fontSizes[0]};
  transition: all 200ms ease-out 0s;
  &.active {
    border: 2px solid var(--primary);
  }
  &:hover, &:focus {
    transform: scale(1.03);
  }
`

const NavContainer = styled.header`
  padding: ${designTokens.space[4]} ${designTokens.space[3]} ${designTokens.space[3]};
  width: 100%;
  border-bottom: 1px solid var(--grey100);
  box-shadow: 0px 1px 0px rgba(0,0,0,.08);
  background: var(--transparent);
  backdrop-filter: blur(40px) saturate(200%);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: ${designTokens.space[2]};
    background: var(--primary);
    background:linear-gradient(to right, var(--primary), var(--tertiary), var(--secondary));
  }
`

const HeaderInner = styled.div`
  width: 100%;
  max-width: ${designTokens.layoutWidth};
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Nav = styled.nav`
  a {
    padding: ${designTokens.space[2]} ${designTokens.space[3]};
    border: 1px solid var(--grey200);
    border-radius: ${designTokens.space[1]};
    margin: 0 ${designTokens.space[1]} 0 0;
    display: inline-block;
    transition: all 120ms ease-out 0s;
    &:hover {
      background: var(--grey100);
    }
    &.selected {
      background: var(--primaryTransparent);
      color: var(--primaryDark);
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
    background: var(--grey100);
  }
`
const MobileNav = styled.header`
  display: none;
  align-items: center;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: flex;
  }
`

const MobileNavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const MobileNavItem = styled.li`
 margin-bottom: 0;
 display: block;
 width: 100%;
 margin-top: ${designTokens.space[2]};
 a,.theme-button {
  padding: ${designTokens.space[2]} ${designTokens.space[3]};
  border-radius: ${designTokens.space[1]};
  margin: 0 ${designTokens.space[1]} 0 0;
  display: block;
  border: 0;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  transition: all 120ms ease-out 0s;
  &:hover {
    background: var(--grey100);
  }
  &.selected {
    background: var(--primaryTransparent);
    color: var(--primaryDark);
    border-color: transparent;
  }
 }
 .theme-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const ThemeButton = styled.button`
  background: transparent;
  padding: 0;
  border-radius: ${designTokens.space[1]};
  color: var(--grey600);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  border: 1px solid var(--grey200);
  height: 40px;
  width: 40px;
  svg {
    fill: currentColor;
    color: var(--grey600);
  }
`

export default function Header({ toggleTheme, theme }) {

  const [isExpanded, setExpanded] = React.useState(false)
  const [isPickerOpen, setPickerOpen] = React.useState(false)
  const toggle = () => setPickerOpen(!isPickerOpen);

  const themes = [
    lightTheme,
    darkTheme,
    notionLight,
    notionDark,
    hyrule,
    zora,
    gerudo
  ]

  const closeMobile = () => {
    setExpanded(false)
    setPickerOpen(false)
  }

  const handleThemeToggle = (themeName) => {
    toggleTheme(themeName)
  }

  return (
    <HeaderContainer>
      <ThemePicker className={isPickerOpen ? 'isOpen' : null}>
        <ThemePickerBody>
          {
            themes.map(theme => (
              <ThemeItem
                bg={theme.grey0}
                border={theme.grey300}
                color={theme.grey900}
                onClick={() => handleThemeToggle(theme.name)}
              >
                {theme.name}
                <div style={{display: 'flex', marginTop: '8px', justifyContent: 'center'}}>
                  <div style={{ borderRadius: '50%', margin: '0 2px', height:'16px', width: '16px', background: theme.primary}}></div>
                  <div style={{ borderRadius: '50%', margin: '0 2px', height:'16px', width: '16px', background: theme.secondary}}></div>
                  <div style={{ borderRadius: '50%', margin: '0 2px', height:'16px', width: '16px', background: theme.tertiary}}></div>
                </div>
              </ThemeItem>
            ))
          }
        </ThemePickerBody>
      </ThemePicker>
      <NavContainer>
        <MobileNav>
          {
            isExpanded ?
              (
                <>
                  <MobileNavList>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                      <ThemeButton onClick={closeMobile}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'><path d='M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z'/></svg>
                      </ThemeButton>
                      <ThemeButton
                        onClick={toggle}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='20' height='20' viewBox='0 0 512 512'><path d='M441,336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77,5.34-9.94l30.28-26.87c25.92-22.91,40.2-53.66,40.2-86.59S449.73,119.92,423.78,97c-35.89-31.59-85-49-138.37-49C223.72,48,162,71.37,116,112.11c-43.87,38.77-68,90.71-68,146.24s24.16,107.47,68,146.23c21.75,19.24,47.49,34.18,76.52,44.42a266.17,266.17,0,0,0,86.87,15h1.81c61,0,119.09-20.57,159.39-56.4,9.7-8.56,15.15-20.83,15.34-34.56C456.14,358.87,450.56,345.09,441,336.2ZM112,208a32,32,0,1,1,32,32A32,32,0,0,1,112,208Zm40,135a32,32,0,1,1,32-32A32,32,0,0,1,152,343Zm40-199a32,32,0,1,1,32,32A32,32,0,0,1,192,144Zm64,271a48,48,0,1,1,48-48A48,48,0,0,1,256,415Zm72-239a32,32,0,1,1,32-32A32,32,0,0,1,328,176Z'/></svg>
                      </ThemeButton>
                    </div>
                    <MobileNavItem>
                      <NavItem href="/">
                        <a>Notes</a>
                      </NavItem>
                    </MobileNavItem>
                    <MobileNavItem>
                      <NavItem href="/about">
                        <a>About</a>
                      </NavItem>
                    </MobileNavItem>
                    <MobileNavItem>
                      <a href="https://ryanparag.com">
                        Portfolio &rarr;
                      </a>
                    </MobileNavItem>
                  </MobileNavList>
                </>
              )
              :
              (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <div style={{ display: 'inline-flex', alignItems: 'center'}}>
                      <ThemeButton onClick={() => setExpanded(true)}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'><line x1='88' y1='152' x2='424' y2='152' fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48px"/><line x1='88' y1='256' x2='424' y2='256' fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48px"/><line x1='88' y1='360' x2='424' y2='360' fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48px"/></svg>
                      </ThemeButton>
                      <div style={{ paddingLeft: designTokens.space[3]}}>
                        <strong>
                          Ryan's Notes
                        </strong>
                      </div>
                    </div>
                    <ThemeButton
                      onClick={toggle}
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='20' height='20' viewBox='0 0 512 512'><path d='M441,336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77,5.34-9.94l30.28-26.87c25.92-22.91,40.2-53.66,40.2-86.59S449.73,119.92,423.78,97c-35.89-31.59-85-49-138.37-49C223.72,48,162,71.37,116,112.11c-43.87,38.77-68,90.71-68,146.24s24.16,107.47,68,146.23c21.75,19.24,47.49,34.18,76.52,44.42a266.17,266.17,0,0,0,86.87,15h1.81c61,0,119.09-20.57,159.39-56.4,9.7-8.56,15.15-20.83,15.34-34.56C456.14,358.87,450.56,345.09,441,336.2ZM112,208a32,32,0,1,1,32,32A32,32,0,0,1,112,208Zm40,135a32,32,0,1,1,32-32A32,32,0,0,1,152,343Zm40-199a32,32,0,1,1,32,32A32,32,0,0,1,192,144Zm64,271a48,48,0,1,1,48-48A48,48,0,0,1,256,415Zm72-239a32,32,0,1,1,32-32A32,32,0,0,1,328,176Z'/></svg>
                    </ThemeButton>
                  </div>
                </>
              )
          }
        </MobileNav>
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
            onClick={toggle}
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='20' height='20' viewBox='0 0 512 512'><path d='M441,336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77,5.34-9.94l30.28-26.87c25.92-22.91,40.2-53.66,40.2-86.59S449.73,119.92,423.78,97c-35.89-31.59-85-49-138.37-49C223.72,48,162,71.37,116,112.11c-43.87,38.77-68,90.71-68,146.24s24.16,107.47,68,146.23c21.75,19.24,47.49,34.18,76.52,44.42a266.17,266.17,0,0,0,86.87,15h1.81c61,0,119.09-20.57,159.39-56.4,9.7-8.56,15.15-20.83,15.34-34.56C456.14,358.87,450.56,345.09,441,336.2ZM112,208a32,32,0,1,1,32,32A32,32,0,0,1,112,208Zm40,135a32,32,0,1,1,32-32A32,32,0,0,1,152,343Zm40-199a32,32,0,1,1,32,32A32,32,0,0,1,192,144Zm64,271a48,48,0,1,1,48-48A48,48,0,0,1,256,415Zm72-239a32,32,0,1,1,32-32A32,32,0,0,1,328,176Z'/></svg>
          </ThemeButton>
        </HeaderInner>
      </NavContainer>
    </HeaderContainer>
  )
}
