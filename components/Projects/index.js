import React from 'react'
import Link from 'next/link'
import { BoxAnchorLink, BoxBaseLink } from '@components/Box'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: ${designTokens.space[2]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    grid-template-columns: 1fr;
  }
`

const ProjectInner = styled.div`
  display: flex;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
  }
`

const ProjectContent = styled.div`
  width: 100%;
`

const ProjectLink = styled.div`
  a {
    ${BoxBaseLink}
  }
`


const ProjectImage = styled.img`
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  display: block;
  margin-right: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    margin-bottom: ${designTokens.space[3]};
  }
`

export const ProjectItem = ({project}) => {
  return(
    <>
      {
        project.outbound ? (
          <BoxAnchorLink href={project.link} target="_blank">
            <ProjectInner>
              <ProjectImage src={project.image} alt={project.name}/>
              <ProjectContent>
                <h4 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>{project.name}</h4>
                <p style={{ marginBottom: '0' }}>
                  {project.description}
                </p>
              </ProjectContent>
            </ProjectInner>
          </BoxAnchorLink>
        )
        :
        (
          <ProjectLink>
            <Link href={project.link}>
              <a>
                <ProjectInner>
                  <ProjectImage src={project.image} alt={project.name}/>
                  <ProjectContent>
                    <h4 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>{project.name}</h4>
                    <p style={{ marginBottom: '0' }}>
                      {project.description}
                    </p>
                  </ProjectContent>
                </ProjectInner>
              </a>
            </Link>
          </ProjectLink>
        )
      }
    </>
  )
}

export default function Projects(){

  const projects = [
    {
      name: 'Portfolio',
      description: 'Take a look through my case studies and larger projects',
      image: '/static/icon-portfolio.svg',
      link:'https://ryanparag.com',
      outbound: true
    }, {
      name: 'Recent Listens',
      description: 'Take a look at my current music/podcast feed',
      image: '/spotify.svg',
      link:'/recent-listens',
      outbound: false
    }, {
      name: 'Theme Creator',
      description: 'Feed your curiousity by theming this website',
      image: '/static/icon-theme-creator.svg',
      link:'/create-theme',
      outbound: false
    }, {
      name: 'Worksheets',
      description: 'Questions and resources to utilize in your UX process',
      image: '/static/icon-worksheet.svg',
      link:'/worksheets',
      outbound: false
    }, {
      name: 'Figma',
      description: 'Check out my files and plugins on Figma Community',
      image: '/static/icon-figma.svg',
      link:'https://figma.com/@ryanparag',
      outbound: true
    }, {
      name: 'Slack Themes',
      description: 'Having trouble keeping track of all of your Slack workspaces?',
      image: '/static/icon-slack-themes.svg',
      link:'https://slack-themes.now.sh/',
      outbound: true
    }, {
      name: 'TampaBay.design',
      description: 'How to get involved in one of the many local design communities',
      image: '/static/icon-tampabay.svg',
      link:'https://tampabay.design',
      outbound: true
    }
  ]

  return(
    <ProjectGrid>
      {
        projects.map(project => (
          <div key={project.name}>
            <ProjectItem project={project}/>
          </div>
        ))
      }
    </ProjectGrid>
  )
}