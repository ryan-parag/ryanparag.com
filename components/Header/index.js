import React, { useState } from 'react'
import NavItem from '../NavItem/'
import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '../Theme/designTokens'
import ThemeItem from '@components/ThemeItem'
import { IconButton, IconButtonPrimary } from '@components/Button'
import { motion } from 'framer-motion'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { X } from 'react-feather'
import { LogoWithLabel } from '@components/Logo'
import { Wrapper } from '@components/Layout/'
import { LoadingSmall } from '@components/LoadingBox'
import Error from '@components/Error'

const HeaderContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    z-index: 100;
    position:fixed;
  }
`;

const ThemePicker = styled.div`
  position: relative;
  max-height: 0;
  width: 100%;
  overflow: hidden;
  background: var(--grey100);
  transition: all 400ms cubic-bezier(.4,0,.2,1);
  font-family: ${designTokens.fonts.body};
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
  ::-webkit-scrollbar {
    display: none;
  }
`

const NavContainer = styled.header`
  padding: ${designTokens.space[4]} 0 ${designTokens.space[3]};
  width: 100%;
  border-bottom: 1px solid var(--grey200);
  box-shadow: 0px 1px 0px rgba(0,0,0,0.12);
  background: var(--transparent);
  position: relative;
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
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    background: var(--transparent);
    backdrop-filter: blur(40px) saturate(200%);
  }
  &.isOpen {
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,.2), 0px 5px 8px -1px rgba(0,0,0,.14), 0px 10px 20px -2px rgba(0,0,0,.12);
  }
`

const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: none;
  }
`

const Nav = styled.nav`
  a {
    padding: ${designTokens.space[1]};
    font-size: ${designTokens.sizing._sm};
    margin: 0;
    display: inline-flex;
    border-bottom: 2px solid transparent;
    color: var(--grey600);
    align-items: center;
    transition: all 120ms ease-out 0s;
    &:hover, &:focus {
      color: var(--grey900);
      border-color: var(--grey600);
      text-decoration: none;
    }
    &.selected {
      color: var(--grey900);
      border-color: var(--primary);
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
  padding: ${designTokens.space[1]};
  font-size: ${designTokens.sizing._sm};
  margin: 0;
  &:not(:last-of-type) {
    margin-right: ${designTokens.space[1]};
  }
`

const MobileNav = styled.header`
  display: none;
  align-items: center;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    display: flex;
    flex-direction: column;
  }
`

const MobileNavList = styled(motion.ul)`
  list-style-type: none;
  margin: 0;
  padding: ${designTokens.space[2]} 0 0;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
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
  padding: 0;
  color: var(--grey600);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: ${designTokens.space[2]};
  border: 1px solid var(--grey200);
  background: linear-gradient(to top, var(--grey100), var(--grey0));
  box-shadow: 0px 1px 3px rgba(0,0,0,0.14);
  transition: all 120ms ease-out 0s;
  svg {
    fill: currentColor;
    color: inherit;
  }
  &:hover, &:focus {
    border-color: var(--grey300);
  }
`

const CloseButton = styled(ThemeButton)`
  height: 32px;
  width: 32px;
  position: absolute;
  top: ${designTokens.space[2]};
  right: ${designTokens.space[2]};
`

const ThemeBtn = ({handleClick, state}) => {
  return(
    <IconButton
      onClick={handleClick}
      aria-label={state ? 'Close Themes' : 'Open Themes'}
    >
      {
        state ?
        (
          <>
            <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4098 20.3418C15.8711 20.3418 20.416 15.8065 20.416 10.3418C20.416 4.87712 15.8587 0.341797 10.3974 0.341797C4.94851 0.341797 0.416016 4.87712 0.416016 10.3418C0.416016 15.8065 4.96091 20.3418 10.4098 20.3418ZM10.4098 18.4583C5.91446 18.4583 2.32314 14.8523 2.32314 10.3418C2.32314 5.83128 5.90208 2.22532 10.3974 2.22532C14.9052 2.22532 18.5089 5.83128 18.5213 10.3418C18.5337 14.8523 14.9176 18.4583 10.4098 18.4583ZM10.4098 5.348C10.1745 5.348 10.0011 5.44713 9.76586 5.67018L6.58318 8.84242C6.43459 8.97872 6.36028 9.18939 6.36028 9.41243C6.36028 9.87091 6.70703 10.2055 7.16525 10.2055C7.40053 10.2055 7.59866 10.1188 7.74728 9.97004L8.76276 8.94155L9.67918 7.80152L9.59249 10.0072V14.5301C9.59249 15.001 9.93924 15.348 10.4098 15.348C10.8928 15.348 11.2395 15.001 11.2395 14.5301V10.0072L11.1528 7.78913L12.0816 8.94155L13.0847 9.97004C13.221 10.1311 13.4315 10.2055 13.6668 10.2055C14.1126 10.2055 14.4717 9.87091 14.4717 9.41243C14.4717 9.18939 14.3974 8.97872 14.2488 8.84242L11.0662 5.67018C10.8556 5.45951 10.6699 5.348 10.4098 5.348Z" fill="currentColor"/>
            </svg>
          </>

        )
        :
        (
          <>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.53679 8.83841C2.81548 9.55092 2.85947 10.5009 3.63355 11.2838L5.23448 12.8847C4.38124 13.4213 2.7803 14.081 1.99742 14.8551C0.757138 16.0954 0.774731 17.7755 2.04141 19.0422C3.30808 20.3089 4.97939 20.3177 6.21967 19.0774C7.00255 18.3033 7.65348 16.6936 8.19006 15.8579L9.80859 17.4588C10.5827 18.2241 11.5415 18.2681 12.254 17.5468L13.1512 16.6232C13.723 16.0426 13.8109 15.3213 13.4327 14.6616C13.7845 14.5648 14.11 14.3537 14.3827 14.081L18.2355 10.2106C19.1679 9.27823 19.1503 8.16989 18.1739 7.19349L11.4711 0.490671C10.8554 -0.125074 10.0197 -0.169056 9.44794 0.402707C9.19284 0.649005 8.99932 1.01845 8.89377 1.50225C8.44515 3.5518 7.53913 5.4782 6.48356 6.83284C6.31643 7.06155 6.19329 7.29025 6.12291 7.51896C5.55115 7.29905 4.953 7.43099 4.45161 7.93239L3.53679 8.83841ZM13.1864 13.307C12.8345 13.6588 12.5003 13.6324 12.1484 13.2806L7.71505 8.856L7.72385 8.84721C7.38079 8.51295 7.25764 8.16109 7.71505 7.50137C8.65626 6.13793 9.60627 4.25551 10.1692 2.16198C10.1956 2.06522 10.2396 1.97725 10.3188 1.89809C10.4595 1.76614 10.6354 1.72216 10.8202 1.91568L14.8313 5.91802C14.6026 7.29905 13.5031 8.66248 12.6674 9.50693C12.5794 9.5861 12.4651 9.70045 12.597 9.8324C13.0105 10.2546 15.4822 8.49535 16.5202 7.60692L17.0832 8.16989C17.479 8.56572 17.4878 8.99675 17.1272 9.3486L13.1864 13.307ZM4.7155 9.67407L5.28726 9.1111C5.54235 8.8648 5.85902 8.8648 6.11412 9.12869L11.9549 14.9783C12.21 15.2334 12.2188 15.5412 11.9725 15.7963L11.4183 16.3593C11.1632 16.6232 10.8466 16.6144 10.5827 16.3505L8.48913 14.257C8.19006 13.9579 7.847 14.0634 7.53913 14.4681C6.93218 15.3301 5.90301 17.5116 5.30485 18.101C4.59235 18.7959 3.65993 18.8135 2.96502 18.1186C2.27011 17.4149 2.27011 16.4736 2.97382 15.7699C3.56318 15.1806 5.75347 14.1426 6.60671 13.5357C7.01135 13.2278 7.1257 12.8847 6.81783 12.5857L4.73309 10.5009C4.4692 10.2546 4.4692 9.92036 4.7155 9.67407ZM3.5016 17.582C3.77429 17.8459 4.17892 17.8459 4.44281 17.582C4.7155 17.3005 4.7067 16.9047 4.44281 16.6408C4.17012 16.3769 3.75669 16.3681 3.5016 16.6408C3.2553 16.9223 3.23771 17.3093 3.5016 17.582Z" fill="currentColor"/>
            </svg>
          </>
        )
      }
    </IconButton>
  )
}

const LatestTheme = ({handleThemeToggle, activeTheme}) => {

  const { data } = useSWR('/api/themes/submitted/latest', fetcher);

  if (!data) {
    return null;
  }

  const latestTheme = data.latest

  const theme = {
    name: 'Latest Submitted',
    grey900: latestTheme.grey900,
    grey800: latestTheme.grey800,
    grey700: latestTheme.grey700,
    grey600: latestTheme.grey600,
    grey500: latestTheme.grey500,
    grey400: latestTheme.grey400,
    grey300: latestTheme.grey300,
    grey200: latestTheme.grey200,
    grey100: latestTheme.grey100,
    grey0: latestTheme.grey0,
    primary: latestTheme.primary,
    tertiary: latestTheme.tertiary,
    secondary: latestTheme.secondary,
    primaryTransparent: latestTheme.primaryTransparent,
    tertiaryTransparent: latestTheme.tertiaryTransparent,
    secondaryTransparent: latestTheme.secondaryTransparent,
    transparent: latestTheme.transparent,
    secondaryDark: latestTheme.secondaryDark,
    primaryDark: latestTheme.primaryDark,
    tertiaryDark: latestTheme.tertiaryDark,
  }

  return(
    <div
      style={{
        margin: `0 ${designTokens.space[3]}`,
        display: 'inline-block'
      }}
    >
      <ThemeItem
        tabIndex={'0'}
        theme={theme}
        clickHandle={() => handleThemeToggle(theme)}
        active={activeTheme === theme.name}
      />
    </div>
  )
}

const ThemeList = ({ handleThemeToggle, activeTheme }) => {
  const { data, error } = useSWR('/api/themes', fetcher);
  const [active, setActive] = useState()

  if (!data) {
    return (
      <Error/>
    )
  }

  return (
    <>
      {
        data ? (
          <>
            <LatestTheme
              handleThemeToggle={handleThemeToggle}
              activeTheme={activeTheme}
            />
            {
              data.themes.map((theme, index) => (
                <div
                  key={index}
                  style={{
                    margin: `0 ${designTokens.space[3]}`,
                    display: 'inline-block'
                  }}
                >
                  <ThemeItem
                    tabIndex={'0'}
                    theme={theme}
                    clickHandle={() => handleThemeToggle(theme)}
                    active={activeTheme === theme.name}
                  />
                </div>
              ))
            }
          </>
        )
        :
        (
          <LoadingSmall/>
        )
      }
    </>
  )
}

export default function Header({ toggleTheme, theme }) {

  const [isExpanded, setExpanded] = React.useState(false)
  const [isPickerOpen, setPickerOpen] = React.useState(false)
  const [activeTheme, setActiveTheme] = useState(theme.name);
  const toggle = () => setPickerOpen(!isPickerOpen);

  const variants = {
    visible: { height: 'auto' },
    hidden: { height: 0 },
  }

  const closeMobile = () => {
    setExpanded(false)
    setPickerOpen(false)
  }

  const handleThemeToggle = (themeName) => {
    toggleTheme(themeName)
    setActiveTheme(themeName.name)
  }

  return (
    <HeaderContainer>
      <ThemePicker className={isPickerOpen ? 'isOpen' : null}>
        <div style={{
          textAlign: 'center',
          padding: `${designTokens.space[2]} ${designTokens.space[6]} ${designTokens.space[0]}`,
        }}>
          <small>
            <strong>Select a theme.</strong> Inspired by Breath of the Wild and{' '}
            <a
              title="Max Böck's Color Theme Switcher"
              href="https://mxb.dev/blog/color-theme-switcher/"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                color: 'var(--secondaryDark)',
              }}
            >
              Max's awesome color switcher
            </a>
          </small>
          <CloseButton
           onClick={toggle}
          >
            <X size={'16'}/>
          </CloseButton>
        </div>
        <ThemePickerBody>
          <ThemeList
            handleThemeToggle={handleThemeToggle}
            activeTheme={activeTheme}
          />
          <div
            style={{
              margin: `0 ${designTokens.space[3]}`,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <Link href="/create-theme">
              <a>
                <IconButtonPrimary
                  style={{
                    transform: `translateY(${designTokens.space[3]})`
                  }}
                  aria-label={'Create Theme'}
                >
                  <svg width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7909 24.5781C13.6792 24.5781 14.3984 23.8449 14.3984 23.0129V14.1856H23C23.8602 14.1856 24.5935 13.4665 24.5935 12.5781C24.5935 11.7039 23.8602 10.9706 23 10.9706H14.3984V2.14334C14.3984 1.29728 13.6792 0.578125 12.7909 0.578125C11.9166 0.578125 11.1833 1.29728 11.1833 2.14334V10.9706H2.5817C1.74974 10.9706 0.988281 11.7039 0.988281 12.5781C0.988281 13.4665 1.74974 14.1856 2.5817 14.1856H11.1833V23.0129C11.1833 23.8449 11.9166 24.5781 12.7909 24.5781Z" fill="currentColor"/>
                  </svg>
                </IconButtonPrimary>
              </a>
            </Link>
          </div>
        </ThemePickerBody>
      </ThemePicker>
      <NavContainer className={isExpanded ? 'isOpen' : null}>
        <MobileNav>
          <Wrapper>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <div style={{ display: 'inline-flex', alignItems: 'center'}}>
                {
                  isExpanded ? (
                    <IconButton onClick={closeMobile} aria-label={'Close'}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'><path d='M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z'/></svg>
                    </IconButton>
                  )
                  :
                  (
                    <IconButton onClick={() => setExpanded(true)} aria-label={'Open'}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'><line x1='88' y1='152' x2='424' y2='152' fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48px"/><line x1='88' y1='256' x2='424' y2='256' fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48px"/><line x1='88' y1='360' x2='424' y2='360' fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48px"/></svg>
                    </IconButton>
                  )
                }
                <div style={{ paddingLeft: designTokens.space[3]}}>
                  <LogoWithLabel/>
                </div>
              </div>
              <ThemeBtn
                handleClick={toggle}
                state={isPickerOpen}
              />
            </div>
          </Wrapper>
          {
            isExpanded ?
              (
                <>
                  <MobileNavList
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    exit={{ height: 0 }}
                    transition={{ ease: "easeOut", duration: 0.3, delay: 0.05 }}
                  >
                    <MobileNavItem>
                      <NavItem href="/">
                        <a>Home</a>
                      </NavItem>
                    </MobileNavItem>
                    <MobileNavItem>
                      <NavItem href="/work">
                        <a>Work</a>
                      </NavItem>
                    </MobileNavItem>
                    <MobileNavItem>
                      <NavItem href="/notes">
                        <a>Notes</a>
                      </NavItem>
                    </MobileNavItem>
                    <MobileNavItem>
                      <NavItem href="/about">
                        <a>About</a>
                      </NavItem>
                    </MobileNavItem>
                  </MobileNavList>
                </>
              )
              :
              (
                null
              )
          }
        </MobileNav>
        <Wrapper>
          <HeaderInner>
            <Nav role="navigation" aria-label="main navigation">
              <NavList>
              <NavListItem>
                  <NavItem href="/">
                    <a>Home</a>
                  </NavItem>
                </NavListItem>
                <NavListItem>
                  <NavItem href="/work">
                    <a>Work</a>
                  </NavItem>
                </NavListItem>
                <NavListItem>
                  <NavItem href="/notes">
                    <a>Notes</a>
                  </NavItem>
                </NavListItem>
                <NavListItem>
                  <NavItem href="/about">
                    <a>About</a>
                  </NavItem>
                </NavListItem>
              </NavList>
            </Nav>
            <ThemeBtn
              handleClick={toggle}
              state={isPickerOpen}
            />
          </HeaderInner>
        </Wrapper>
      </NavContainer>
    </HeaderContainer>
  )
}