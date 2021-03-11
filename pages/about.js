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
import { EmailButton } from '@components/ContactBox'
import { SpotifyCurrentlyPlaying } from '@components/Spotify'

const ProfileImg = styled.div`
  width: ${designTokens.space[9]};
  height: ${designTokens.space[9]};
  border-radius: 50%;
  background: var(--primaryTransparent);
  position: relative;
  img {
    display: block; width: 100%;
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
  }
  &:after {
    top: ${designTokens.space[2]};
    right: -${designTokens.space[7]};
    width: ${designTokens.space[3]};
    height: ${designTokens.space[3]};
    background: var(--tertiaryTransparent);
  }
`

const About = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  const latestPosts = sortedPosts.slice(0, 3)
  
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description} ogImage="/notes-social-media.png">
        <article>
          <Wrapper>
            <Title>
              <ProfileImg>
                <img src="/static/profile.png"/>
              </ProfileImg>
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
                In my free time, you can find me <a className="link" href="https://github.com/ryan-parag">tinkering on a random project</a>, learning how to race cars 🏎, traveling to a random spot on the globe 🧳, biking around town 🚴‍♂️, or a bunch of other random things.
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
                  <li>Have any cool movies/tv series to recommend?</li>
                  <li>Like to chat over coffee, tea, seltzer water, coke zero, whatever really ☕️</li>
                </ul>
                <EmailButton/>
              </Accordion>
            </Title>
          </Wrapper>
        </article>
        <Wrapper>
          <h3>Recent Writing 📝</h3>
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
                    style={{
                      marginRight: designTokens.space[2],
                      transform: 'rotate(10deg) translateX(-4px)'
                    }}
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
