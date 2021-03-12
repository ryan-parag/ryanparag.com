import React, { useState } from 'react'
import Layout, { Wrapper } from '@components/Layout/'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Link from 'next/link'
import { ButtonLink } from '@components/Button'
import Title from '@components/Title'
import getPosts from '@utils/getPosts'
import PostList from '@components/PostList/'
import Subscribe from '@components/Subscribe'
import Randomizer from '@components/Randomizer'
import Accordion from '@components/Accordion'
import { EmailButtonInline } from '@components/ContactBox'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'

const ProfileImg = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  width: ${designTokens.space[9]};
  height: ${designTokens.space[9]};
  border-radius: 50%;
  background: var(--primaryTransparent);
  position: relative;
  transition: all 120ms ease-out 0s;
  img {
    display: block; width: 100%;
    transition: all 120ms ease-out 0s;
  }
  &:before, &:after {
    content: '';
    position: absolute;
    top: -${designTokens.space[4]};
    right: -${designTokens.space[4]};
    width: ${designTokens.space[4]};
    height: ${designTokens.space[4]};
    display: block;
    background: var(--secondaryTransparent);
    border-radius: 50%;
    transition: all 120ms ease-out 0s;
  }
  &:after {
    top: ${designTokens.space[2]};
    right: -${designTokens.space[7]};
    width: ${designTokens.space[3]};
    height: ${designTokens.space[3]};
    background: var(--tertiaryTransparent);
  }
  &:hover {
    img {
      transform: scale(.98);
    }
    &:before {
      right: -${designTokens.space[3]};
      transform: scale(1.2);
    }
    &:after {
      right: -${designTokens.space[6]};
      top: ${designTokens.space[4]};
      transform: scale(1.2);
    }
  }
  &:hover, &:focus {
    box-shadow: 0px 0px 0px ${designTokens.space[2]} var(--primaryTransparent);
    &:before {
      background: var(--secondary);
    }
    &:after {
      background: var(--tertiary);
    }
  }
`

const Memoji = () => {

  const memojis = [
    'memoji-thanks.png',
    'memoji-nervous.png',
    'memoji-peace.png',
    'memoji-shocked.png',
    'memoji-sleep.png',
    'memoji-stars.png',
    'memoji-surprise.png',
    'memoji-thinking.png',
    'memoji-eyeroll.png'
  ]

  const memojiRandom = () => {
    let random = memojis[Math.floor(Math.random() * memojis.length)]
    return random
  }

  const [isRandom, setIsRandom] = useState(memojiRandom())

  return(
    <ProfileImg onClick={() => setIsRandom(memojiRandom())}>
      <img src={`/static/about/${isRandom}`}/>
    </ProfileImg>
  )
}

const About = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  const latestPosts = sortedPosts.slice(0, 3)
  
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description} ogImage="/notes-social-media.png">
        <article>
          <Wrapper>
            <Title>
              <Memoji/>
              <h1>Hello, I'm Ryan.👋</h1>
              <p className="lead">I'm a designer and <Randomizer/>.</p>
              <p>
                Currently, I'm on the digital innovation team at <a href="https://ryanparag.com/work/masonite">Masonite</a> in Tampa, FL &mdash; curious about how we can design thoughtful products around open-ended problems. Most of our work is centered around emerging, early-phase growth channels &mdash; conceptualizing a simpler home remodeling experience and designing multiple smart-home experiences for homeowners, contractors, and internal teams.
              </p>
              <p>
                Previously, I studied Healthcare Informatics and forecasted pricing models as a healthcare analyst. After switching tracks full-time, I helped design a payments platform for banks and retailers at <a href="https://ryanparag.com/work/disputelab">Chargebacks911</a>.
              </p>
              <p>
                I thrive in fast-paced, collaborative environments and am commited to being transparent in my work by trying to <Link href="/notes/"><a>share how I think and design</a></Link> about various problems.
              </p>
              <p>
                In my free time, you can find me <a className="link" href="https://github.com/ryan-parag">tinkering on a random project</a>, traveling to a random spot on the globe 🧳, learning how to race cars 🏎, biking around town 🚴‍♂️, or a bunch of other random things.
              </p>
              <p>
                <a href="/static/about/RyanParag-resume.pdf" target="_blank">View my resumé</a>, <Link href="/work/"><a className="link">view my work</a></Link>, or contact me for a more in-depth look.
              </p>
              <Accordion label="How do I contact you?">
                <p>
                  I'd love to help out or chat! Feel free to contact me if you:
                </p>
                <ul style={{ marginBottom: designTokens.space[4] }}>
                  <li>Are looking for a designer who codes?</li>
                  <li>Want to trade design feedback?</li>
                  <li>Want to collaborate on a cool project?</li>
                  <li>Have any cool movies, tv series, <Link href="/listening/podcasts"><a>music/podcasts</a></Link> to recommend?</li>
                  <li>Like to chat over coffee, tea, seltzer water, coke zero, whatever really ☕️</li>
                </ul>
                <EmailButtonInline/>
              </Accordion>
            </Title>
          </Wrapper>
        </article>
        <Wrapper>
          <h3><Link href="/notes"><a>Recent Writing 📝</a></Link></h3>
          <PostList posts={latestPosts} />
          <div
            style={{
              textAlign: 'center',
              padding: designTokens.space[3]
            }}
          >
            <ButtonLink>
              <Link href="/notes/">
                <a>
                  <img
                    src="/static/note.svg"
                    width="32"
                    className="buttonIcon"
                  />
                  Read more notes
                </a>
              </Link>
            </ButtonLink>
          </div>
          <hr/>
          <h3><Link href="/listening/music"><a>Recent Listens 🎧</a></Link></h3>
          <SpotifyCurrentlyPlaying playing />
          <hr/>
          <Subscribe/>
        </Wrapper>
      </Layout>
    </>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../notes', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
