import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Link from 'next/link'
import Randomizer from '@components/Randomizer'
import { ContactAbout } from '@components/ContactBox'
import Accordion from '@components/Accordion'
import Subscribe from '@components/Subscribe'

const Contact = styled.div`
  margin-right: ${designTokens.space[4]};
  max-width: calc(${designTokens.space[9]} + ${designTokens.space[10]});
  width: 100%;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    max-width: 100%;
  }
`

const GridContainer = styled.section`
  display: flex;
  align-items: flex-start;
  padding: ${designTokens.space[9]} ${designTokens.space[3]};
  max-width: calc(${designTokens.breakpoints[2]});
  margin: auto;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
    padding: ${designTokens.space[6]} ${designTokens.space[3]} ${designTokens.space[0]};
  }
`

const FAQ = ({ type }) => {
  return(
    <GridContainer>
      <Contact>
        <ContactAbout
          title={'Hey, I\'m Ryan.👋'}
          img={'/static/profile.png'}
        >
          <p>I'm a designer and <Randomizer/>.</p>
          <p><Link href="/about"><a className="link">More about me<span className="icon">&rarr;</span></a></Link></p>
        </ContactAbout>
      </Contact>
      <div style={{ width: '100%' }}>
        {
          type === 'subscribe' ? (
            <Subscribe/>
          )
          :
          (
            <>
              <Accordion label="Who are you?">
                <p>
                  <strong>Hey, I'm Ryan Parag!</strong> I currently reside in Tampa,FL, where I help simplify the home remodeling experience and help build connected, IoT experiences for homeowners at <a className="link" href="https://ryanparag.com/work/masonite">Masonite</a> - a global manufacturer of doors.
                </p>
                <p>
                  Previously, I helped build an enterprise problem-solving platform for payments as the first product designer at <a className="link" href="https://ryanparag.com/work/disputelab">Chargebacks911</a>.
                </p>
                <p>
                  Before that, I was a healthcare analyst working in the business side of pharmaceuticals (after studying Healthcare Informatics in college) - building pricing models against demographic data, assessing risk through quant analyses on research cost, comparing swaths of data to help predict outcomes and test product goals, etc. 😴.
                </p>
                <p>
                  I thrive in fast-paced, collaborative environments and am commited to being transparent in my work and process by trying to <Link href="/notes/"><a>share</a></Link> how I think and design around small and large problems.
                </p>
                <p>Feel free to take a look at my work <Link href="/work/"><a className="link">here</a></Link> &mdash; or <a className="link" href="mailto:parag.ryan@gmail.com">contact me</a> for a more in-depth look!</p>
              </Accordion>
              <Accordion label="What do you do in your free time?">
                <p>
                  In my free time, you can find me <a className="link" href="https://github.com/ryan-parag">tinkering on a random project</a> (or even this site), learning how to race cars 🏎, traveling to a random spot on the globe 🧳, learning something new 👨‍🏫, or a bunch of other random things .
                </p>
                <p>
                  Take a look at some of my random projects:
                </p>
                <ul>
                  <li>
                    <Link href="../listening/music"><a className="link">Tracking my listening activity</a></Link>
                  </li>
                  <li>
                    <a className="link" href="https://slack-themes.now.sh/">Slack Themes</a>
                  </li>
                  <li>
                    <a className="link" href="https://tampabay.design/">Tampa Bay Design Community Finder</a>
                  </li>
                  <li>
                    <Link href="../create-theme"><a className="link">Theme Creator</a></Link>
                  </li>
                  <li>
                    <Link href="../worksheets"><a className="link">UX Framework Resources</a></Link>
                  </li>
                </ul>
              </Accordion>
              <Accordion label="How do I contact you?">
                <p>
                  I'd love to help out or chat &mdash; <strong><a className="link" href="mailto:parag.ryan@gmail.com">email me at parag.ryan@gmail.com!</a></strong> Feel free to contact me if you:
                </p>
                <ul>
                  <li>Are looking for a designer who codes?</li>
                  <li>Want to trade design feedback?</li>
                  <li>Want to collaborate on a cool project?</li>
                  <li>Have any cool movies/tv series to recommend?</li>
                  <li>Like to chat over coffee, tea, seltzer water, coke zero, whatever really ☕️</li>
                </ul>
              </Accordion>
            </>
          )
        }
      </div>
    </GridContainer>

  )
}

FAQ.defaultProps = {
  type: 'subscribe'
}

export default FAQ