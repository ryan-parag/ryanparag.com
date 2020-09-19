import React from 'react'
import { BoxAnchorLink } from '@components/Box'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${designTokens.space[3]};
  grid-row-gap: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    grid-template-columns: 1fr;
  }
`

const ProjectInner = styled.div`
  display: flex;
  align-items: center;
`

const ProjectImage = styled.img`
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  margin-right: ${designTokens.space[3]};
`

export default function Projects(){

  const projects = [
    {
      name: 'Portfolio',
      description: 'Take a look through my case studies and larger projects',
      image: '/static/icon-portfolio.svg',
      link:'https://ryanparag.com'
    }, {
      name: 'Theme Creator',
      description: 'Feed your curiousity by theming this website',
      image: '/static/icon-theme-creator.svg',
      link:'/create-theme'
    }, {
      name: 'Figma',
      description: 'Check out my files and plugins on Figma Community',
      image: '/static/icon-figma.svg',
      link:'https://figma.com/@ryanparag'
    }, {
      name: 'Slack Themes',
      description: 'Having trouble keeping track of all of your Slack workspaces?',
      image: '/static/icon-slack-themes.svg',
      link:'https://slack-themes.now.sh/'
    }, {
      name: 'TampaBay.design',
      description: 'How to get involved in one of the many local communities',
      image: '/static/icon-tampabay.svg',
      link:'https://tampabay.design'
    }
  ]

  return(
    <ProjectGrid>
      {
        projects.map(project => (
          <BoxAnchorLink key={project.name} href={project.link}>
            <ProjectInner>
              <ProjectImage src={project.image} alt={project.name}/>
              <div>
                <h4 style={{ marginTop: '0', marginBottom: designTokens.space[2]}}>{project.name}</h4>
                <div>
                  <small>{project.description}</small>
                </div>
              </div>
            </ProjectInner>
          </BoxAnchorLink>
        ))
      }
    </ProjectGrid>
  )
}