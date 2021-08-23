import React from 'react'
import Layout, { Wrapper } from '@components/Layout/'
import Title from '@components/Title'
import { designTokens } from '@components/Theme/designTokens'
import Chip from '@components/Chip'
import Card from '@components/Card'
import styled from 'styled-components'
import { Box, MapPin, User, Calendar, Smartphone } from 'react-feather'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${designTokens.space[4]};
  width: 100%;
  margin: auto;
  max-width: ${designTokens.breakpoints[2]};
  padding: ${designTokens.space[5]} ${designTokens.space[3]} 0;
  @media screen and (max-width: ${designTokens.breakpoints[1]}) {
    max-width: ${designTokens.layoutWidth.lg};
  }
  @media screen and (max-width: ${designTokens.breakpoints[3]}) {
    max-width: ${designTokens.layoutWidth.sm};
    grid-template-columns: repeat(1, 1fr);
  }
`

const Avatar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: ${designTokens.space[5]};
  width: ${designTokens.space[5]};
  background: ${props => props.waiting ? 'var(--grey200)' : 'var(--primaryTransparent)'};
  font-size: ${designTokens.fontSizes[0]};
  font-weight: ${designTokens.fontWeights.bold};
  color: ${props => props.waiting ? 'var(--grey600)' : 'var(--primaryDark)'};
`

const SpecContent = styled.div`
  padding-left: ${designTokens.space[3]};
  flex: 1 1 0%;
`

const Table = styled.table`
  font-size: ${designTokens.fontSizes[0]};
  th {
    text-align: left;
    color: var(--grey600);
    width: calc(${designTokens.space[8]} + ${designTokens.space[2]});
  }
  th, td {
    padding: ${designTokens.space[1]} 0;
  }
`

const Info = ({data}) => {
  return(
    <Table>
      <tbody>
        {
          data.location && (
            <tr>
              <th>
                <MapPin size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Location
              </th>
              <td>{data.location}</td>
            </tr>
          )
        }
        {
          data.role && (
            <tr>
              <th>
                <User size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Roles
              </th>
              <td>
                {
                  data.role.map((item, i) => (
                    <Chip key={i} ghost mr={designTokens.space[1]}>{item}</Chip>
                  ))
                }
              </td>
            </tr>
          )
        }
        {
          data.date && (
            <tr>
              <th>
                <Calendar size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Date
              </th>
              <td>
                <Chip ghost mr={designTokens.space[1]}>{data.date}</Chip>
              </td>
            </tr>
          )
        }
        {
          data.spaces && (
            <tr>
              <th>
                <Box size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Spaces
              </th>
              <td>
                {
                  data.spaces.map((item, i) => (
                    <Chip key={i} ghost mr={designTokens.space[1]}>{item}</Chip>
                  ))
                }
              </td>
            </tr>
          )
        }
        {
          data.platforms && (
            <tr>
              <th>
                <Smartphone size={'16'} style={{ transform: 'translateY(4px)', marginRight: designTokens.space[2] }}/>
                Platforms
              </th>
              <td>
                {
                  data.platforms.map((item, i) => (
                    <Chip key={i} ghost mr={designTokens.space[1]}>{item}</Chip>
                  ))
                }
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
}

const Page = ({ title, description, ...props }) => {

  const roleInfo = {
    location: 'Tampa, FL',
    role: ['Product Design', 'Front-end Engineering', 'Product'],
    date: '2019 - Present',
    spaces: ['Enterprise', 'Growth', 'Building Materials'],
    platforms: ['Web', 'Mobile', 'Tablet']
  }

  return (
    <>
      <Layout pageTitle={`${title} | Masonite`} description={description} ogImage="/social-media.png">
        <Wrapper>
          <Title>
            <img
              src="/static/projects/icon-masonite.png"
              width={designTokens.space[7] + designTokens.space[2]}
              style={{ border: '1px solid var(--grey200)', borderRadius: designTokens.space[2] }}
            />
            <h1>Masonite</h1>
            <p className="lead">Connecting doors to the cloud and simplifying home-remodeling</p>
            <p>
              At Masonite (a global company known for manufacturing residential and architectural doors), I help build cross-platform design systems and products for core experience, integrations, native mobile, and growth - focusing on establishing a process of lean user research and working directly with software engineers, product management, and other stakeholders.
            </p>
            <Info data={roleInfo}/>
          </Title>
          <h4>Projects</h4>
          <ul>
            <li>
              <a href="#" className="link">Masonite M-Pwr Smart Doors</a>
            </li>
            <li>
              <a href="#" className="link">Door Configurator</a>
            </li>
            <li>
              <a href="#" className="link">Core ordering platform for home builders</a>
            </li>
          </ul>
          <hr/>
          <h3>Masonite M-Pwr Smart Doors</h3>
        </Wrapper>
        <Grid>
          <Card
            title={'Masonite M-Pwr'}
            img={'/static/projects/masonite/cover.png'}
            button={'Read case study'}
            link={'https://google.com'}
          >
            <p>
              <small>The cross-platform experience for the management, purchase, and manipulation for a door in a user's smart home</small>
            </p>
            <Chip ghost type={'secondary'} mt={designTokens.space[3]}>Private</Chip>
          </Card>
          <Card
            title={'Door Configurator'}
            img={'/static/projects/masonite/cover-2.png'}
            button={'Read case study'}
            link={'https://google.com'}
          >
            <p>
              <small>Building compatible doors with flexible components - all through a simpler, responsive, and accessible interface</small>
            </p>
            <Chip ghost type={'secondary'} mt={designTokens.space[3]}>Private</Chip>
          </Card>
        </Grid>
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