import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import List, { ListItem } from '@components/List'
import { designTokens } from '@components/Theme/designTokens'
import { Label, Body, ItemTitle } from '@components/Typography'
import Image from 'next/image'
import { ArrowRight } from 'react-feather'

export const NewProjectImage = styled.div`
  width: ${designTokens.space[7]};
  height: ${designTokens.space[7]};
  position: absolute;
  right: ${designTokens.space[1]};
  top: 50%;
  transform: translateY(-50%);
  border-radius: ${designTokens.space[1]};
  box-shadow: 0px 0px 0px 2px var(--grey200);
  transition: all 120ms ease-out 0ms;
  img {
    border-radius: ${designTokens.space[1]};
  }
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    width: ${designTokens.space[6]};
    height: ${designTokens.space[6]};
    transform: translateY(-40%) translateX(${designTokens.space[6]}) rotate(10deg) scale(1.5);
    user-select: none;
    border:0;
    z-index: 0;
    opacity: 0.5;
  }
`

export const HoverImage = ({src,alt}) => {
  return (
    <NewProjectImage>
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
        alt={alt}
      />
    </NewProjectImage>
  )
}

export const NewProjectContent = styled.div`
  padding-right: ${designTokens.space[8]};
  transition: all 120ms ease-out;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    padding-right: 0;
  }
`

export const NewProjectStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${designTokens.space[4]} 0;
  transition: all 120ms ease-out 0s;
  color: var(--grey900);
  position: relative;
  overflow: hidden;
  &:hover, &:focus {
    text-decoration: none;
    box-shadow: inset 4px 0px 0px var(--primary);
    background: var(--grey100);
    ${NewProjectContent} {
      transform: translateX(16px);
    }
    ${NewProjectImage} {
      opacity: 1;
      transform: translateY(-40%) translateX(${designTokens.space[4]}) rotate(10deg) scale(1.5);
      @media screen and (min-width: ${designTokens.breakpoints[4]}) {
        transform: translateY(-40%) translateX(-${designTokens.space[3]}) rotate(10deg) scale(2.5);
        box-shadow: 0px 4px 8px -1px var(--grey300);
      }
    }
  }
`

const NewProjectAnchorTag = styled.a`
  ${NewProjectStyles}
`

const NewProjectLink = styled.div`
  a {
    ${NewProjectStyles}
  }
`

const NewProjectContentContainer = styled.div`
  flex: 1 1 0%;
`

const ExperienceContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${designTokens.space[3]};
  padding-bottom: ${designTokens.space[3]};
  transition: all 120ms ease-out 0s;
  .link {
    opacity: 0;
    font-size: ${designTokens.sizing._sm};
    display: inline-flex;
    align-items: center;
    transition: all 120ms ease-out;
    @media screen and (max-width: ${designTokens.breakpoints[4]}) {
      .mobileText {
        display: none;
      }
    }
  }
  &:hover, &:focus {
    padding-left: ${designTokens.space[3]};
    padding-right: ${designTokens.space[3]};
    background: var(--grey100);
    box-shadow: -4px 0px 0px var(--primary);
    .link {
      opacity: 1;
    }
  }
`

const ExperienceBody = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  padding-left: ${designTokens.space[3]};
`

export const ProjectItem = ({project}) => {
  return(
    <>
      <NewProjectLink>
        <Link href={`/work/${project.slug}`}>
          <a title={project?.frontmatter?.title}>
            <NewProjectContentContainer>
              <NewProjectContent>
              <ItemTitle>
                {project?.frontmatter?.title}
              </ItemTitle>
              <Body subtle>
                {project?.frontmatter?.description}
              </Body>
              {
                project?.frontmatter?.startDate && (
                  <Label subtle mt={2}>{project?.frontmatter?.startDate} - {project?.frontmatter?.endDate}</Label>
                )
              }
              </NewProjectContent>
            </NewProjectContentContainer>
            {
              project?.frontmatter?.logo && (
                <HoverImage src={project?.frontmatter?.logo} alt={project?.frontmatter?.title}/>
              )
            }
          </a>
        </Link>
      </NewProjectLink>
    </>
  )
}

export const WorkItem = ({project}) => {
  return(
    <>
      {
        project.outbound ? (
          <NewProjectAnchorTag
            href={project.link}
            title={project.name}
          >
            <NewProjectContentContainer>
              <NewProjectContent>
                <ItemTitle>
                  {project.name}
                </ItemTitle>
                <Body subtle>
                  {project.description}
                </Body>
              </NewProjectContent>
            </NewProjectContentContainer>
            {
              project.image && (
                <HoverImage src={project.image} alt={project.name}/>
              )
            }
          </NewProjectAnchorTag>
        )
        :
        (
          <NewProjectLink>
            <Link href={project.link}>
              <a title={project.name}>
                <NewProjectContentContainer>
                  <NewProjectContent>
                    <ItemTitle>
                      {project.name}
                    </ItemTitle>
                    <Body subtle>
                      {project.description}
                    </Body>
                  </NewProjectContent>
                </NewProjectContentContainer>
                {
                  project.image && (
                    <HoverImage src={project.image} alt={project.name}/>
                  )
                }
              </a>
            </Link>
          </NewProjectLink>
        )
      }
    </>
  )
}

export const WorkList = ({work}) => {

  const portfolio = {
    name: 'Private Portfolio 🔒',
    description: 'Selected works and case studies',
    image: '/static/projects/icon-lock.png',
    link:'https://portfolio.ryanparag.com',
    outbound: true,
  }

  return(
    <List>
      {
        work.map((project, i) => (
          <ListItem key={i}>
            <ProjectItem project={project}/>
          </ListItem>
        ))
      }
      <ListItem>
        <WorkItem project={portfolio}/>
      </ListItem>
    </List>
  )
}

const ExperienceItem = ({ item }) => {
  return(
    <ListItem key={item.id}>
      <ExperienceContainer>
        <img src={`/static/projects/${item.logo}`} style={{ border: '1px solid var(--grey200)', width: `calc(${designTokens.space[5]} + ${designTokens.space[2]})`, borderRadius: designTokens.space[2] }}/>
        <ExperienceBody>
          <h6 style={{ fontSize: designTokens.sizing._sm, marginTop: '0', marginBottom: '0' }}>{item.company}</h6>
          <Label subtle mt={2}>
            {item.role} • {item.date}
          </Label>
        </ExperienceBody>
        {
          item.link !== 'null' && (
            <Link href={`/work${item.link}`}>
              <a className="link">
                <span className="mobileText" style={{ marginRight: designTokens.space[1]}}>View work</span>
                <ArrowRight size={'16'} />
              </a>
            </Link>
          )
        }
      </ExperienceContainer>
    </ListItem>
  )
}

export const Experience = ({ data }) => {
  return(
    <div style={{ paddingTop: designTokens.space[3], paddingBottom: designTokens.space[4] }}>
      <h5>
        Experience
      </h5>
      <List>
        {
          data.roles.verified.map((item) => (
            <ExperienceItem key={item.id} item={item} />
          ))
        }
      </List>
    </div>
  )
}

export default function Projects(){

  const projects = [
    {
      name: 'Wordle Results',
      description: 'Take a look at a history of my Wordle attmepts',
      image: '/static/projects/icon-wordle.png',
      link:'/wordle/activity',
      outbound: false
    }, {
      name: 'Race Times',
      description: 'A directory of translated race time schedules and leaderboards',
      image: '/static/projects/icon-race-times.png',
      link:'https://race-times.vercel.app/',
      outbound: true
    }, {
      name: 'Slack Themes',
      description: 'Having trouble keeping track of all of your Slack workspaces?',
      image: '/static/projects/icon-slack-themes.png',
      link:'https://slack-themes.vercel.app/',
      outbound: true
    }, {
      name: 'TampaBay.design',
      description: 'How to get involved in one of the many local design communities',
      image: '/static/projects/icon-tbd.png',
      link:'https://tampabay.design',
      outbound: true
    }, {
      name: 'Recent Listens',
      description: 'Take a look at my current music/podcast feed',
      image: '/static/projects/icon-listens.png',
      link:'/listening',
      outbound: false
    },{
      name: 'Portfolios',
      description: 'A list of portfolios, personal sites, and designers that are dope',
      image: '/static/projects/icon-portfolios.png',
      link:'/portfolios',
      outbound: false
    },{
      name: 'Ask me anything',
      description: 'Send over any kind of question you may have for me!',
      image: '/static/projects/icon-ama.png',
      link:'/ama',
      outbound: false
    }, {
      name: 'Theme Creator',
      description: 'Feed your curiousity by theming this website',
      image: '/static/projects/icon-theme-creator.png',
      link:'/create-theme',
      outbound: false
    }, {
      name: 'Worksheets',
      description: 'Questions and resources to utilize in your UX process',
      image: '/static/projects/icon-worksheets.png',
      link:'/worksheets',
      outbound: false
    }, {
      name: 'Figma',
      description: 'Check out my files and plugins on Figma Community',
      image: '/static/projects/icon-figma.png',
      link:'https://figma.com/@ryanparag',
      outbound: true
    }
  ]

  return(
    <List>
      {
        projects.map(project => (
          <ListItem key={project.name}>
            <WorkItem project={project}/>
          </ListItem>
        ))
      }
    </List>
  )
}