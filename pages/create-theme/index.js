import Layout, { Wrapper } from '@components/Layout/'
import Link from 'next/link'
import styled from 'styled-components'
import Title, {TitleIcon} from '@components/Title'
import Chip from '@components/Chip'
import { designTokens } from '@components/Theme/designTokens'
import List, { ListItem } from '@components/List'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Error from '@components/Error'
import LoadingBox from '@components/LoadingBox'
import { ButtonAnchorTag } from '@components/Button'
import ThemeItem, { ThemeListItem } from '@components/ThemeItem'
import ContactBox from '@components/ContactBox'
import { ItemTitle, Label } from '@components/Typography'

const BlankContainer = styled.div`
  
`

const BuilderLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${designTokens.space[3]} 0;
  cursor: pointer;
  color: var(--grey700);
  margin-bottom: ${designTokens.space[3]};
  border: 2px solid transparent;
  transition: all 120ms ease-out;
  ${BlankContainer} {
    opacity: 0.6;
    margin-right: ${designTokens.space[3]};
    transition: all 120ms ease-out 60ms;
  }
  &:hover, &:focus {
    background: var(--grey100);
    border: 2px dashed var(--grey200);
    padding-left: ${designTokens.space[3]};
    box-shadow: -${designTokens.space[1]} 0px 0px 0px var(--primary);
    ${BlankContainer} {
      opacity: 1;
    }
  }
  &:focus {
    box-shadow: 0px 0px 0px ${designTokens.space[1]} var(--grey300);
  }
`

const ComplexLink = () => {

  const blankTheme = {
    name: 'New Theme',
    grey900: 'var(--grey900)',
    grey800: 'var(--grey800)',
    grey700: 'var(--grey700)',
    grey600: 'var(--grey600)',
    grey500: 'var(--grey500)',
    grey400: 'var(--grey400)',
    grey300: 'var(--grey300)',
    grey200: 'var(--grey200)',
    grey100: 'var(--grey100)',
    grey0: 'var(--grey0)',
    primary: 'var(--grey300)',
    tertiary: 'var(--grey300)',
    secondary: 'var(--grey300)',
    primaryTransparent: 'var(--grey100)',
    tertiaryTransparent:'var(--grey100)',
    secondaryTransparent: 'var(--grey100)',
    transparent: 'var(--transparent)',
    secondaryDark: 'var(--grey400)',
    primaryDark: 'var(--grey400)',
    tertiaryDark: 'var(--grey400)',
  }

  return (
    <Link href={'/create-theme/builder'}>
      <BuilderLink>
        <BlankContainer>
          <ThemeItem
            theme={blankTheme}
            clickHandle={() => console.log(blankTheme)}
          />
        </BlankContainer>
        <div>
          <ItemTitle>Open the Theme Builder</ItemTitle>
          <Label subtle mt={2}>Design a new theme!</Label>
        </div>
      </BuilderLink>
    </Link>
  )
}

const ColorboxButton = () => {
  return(
    <ButtonAnchorTag
      href="https://github.com/lyft/coloralgorithm"
      target="_blank"
    >
    <svg width="24px" height="24px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="90.5486726%" y1="-18.7679634%" x2="29.4247788%" y2="84.8213047%" id="linearGradient-1">
          <stop stopColor="#191445" offset="0%"></stop>
          <stop stopColor="#645EE9" offset="27%"></stop>
          <stop stopColor="#943FFF" offset="66%"></stop>
          <stop stopColor="#FF01BE" offset="91%"></stop>
        </linearGradient>
      </defs>
      <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect fill="#FFFFFF" x="0" y="0" width="29" height="29"></rect>
        <g id="Asset-1" transform="translate(1.000000, 1.000000)">
          <polyline id="Path" stroke="#1A1445" strokeWidth="4.8467498" points="26.3144782 25.8848301 0.562415289 25.8848301 0.562415289 0.410267857"></polyline>
          <path d="M0.562415289,0.410267857 L26.3235972,0.410267857 L26.3235972,25.8938508 L26.3235972,25.8938508 C12.0960893,25.8938508 0.562415289,14.4844621 0.562415289,0.410267857 L0.562415289,0.410267857 L0.562415289,0.410267857 Z" id="Path" stroke="url(#linearGradient-1)" strokeWidth="6"></path>
        </g>
      </g>
    </svg>
    <span style={{
      marginLeft: designTokens.space[2]
    }}>
      <strong>ColorBox</strong>{' '}
      <small>by Lyft Design</small>
    </span>
    </ButtonAnchorTag>
  )
}

const Page = ({ title, description, ...props }) => {

  const { data, error } = useSWR('/api/themes/submitted/list', fetcher)

  return (
    <>
      <Layout pageTitle={`${title} | Create a Theme`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Title>
            <TitleIcon>
              <img src="/static/projects/icon-theme-creator.png" alt="Theme Creator"/>
            </TitleIcon>
            <h1 style={{ marginBottom: designTokens.space[2] }}>Create a Theme</h1>
            <div style={{ marginBottom: designTokens.space[4] }}>
              <Chip mr={designTokens.space[2]} ghost type={'default'}>Version 2</Chip>
              <Chip ghost type={'primary'}>Beta</Chip>
            </div>
            <p className="lead">Pick a few colors and build a new theme!</p>
            <p>I like to believe design is a fluid skill and that <strong>everyone is a bit of a designer</strong> 👍 - we all have the ability to feel certain ways about things that are designed. <strong>Feed that curiousity</strong> and play around with creating a new theme for this website!</p>
          </Title>
          <ComplexLink/>
          <List>
            <ListItem>
              <h3>Recently Created Themes</h3>
              <p>Want to see what others are creating? Take a look below!</p>
            </ListItem>
            {
              error && (<Error/>)
            }
            {
              data ? (
                <>
                  {
                    data.themes.map(item => (
                      <ThemeListItem
                        key={item.id}
                        theme={item}
                      />
                    ))
                  }
                </>
              )
              :
              (
                <LoadingBox>Loading...</LoadingBox>
              )
            }
          </List>
          <hr/>
          <ContactBox/>
        </Wrapper>
      </Layout>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
