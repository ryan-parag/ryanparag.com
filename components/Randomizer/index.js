import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const RandomText = styled.span`
  color: var(--primaryDark);
  transition: all 120ms ease-out 0s;
  box-shadow: 0px 0px 0px transparent;
  border-radius: ${designTokens.space[1]};
  cursor: pointer;
  &:hover, &:focus {
    box-shadow: 0px 0px 0px ${designTokens.space[1]} var(--primaryTransparent);
    background: var(--primaryTransparent);
  }
`

const Randomizer = () => {

  const facts = [
    { text: "gummy-eating champ 🍬" },
    { text: "your friendly neighborhood Spider-Man" },
    { text: "90's hip hop aficionado 🎤" },
    { text: "probably traveling somewhere 🧳" },
    { text: "former zookeeper 🦒" },
    { text: "sparkling water enthusiast" },
    { text: "collector of browser tabs" },
    { text: "knower of random facts 🤔" },
    { text: "still haven't completed The Legend of Zelda: Breath of the Wild" },
    { text: "currently based in Tampa, FL" },
    { text: "a morning person 🌅" },
    { text: "like to draw letters" },
    { text: "a Floridian with too many denim shirts " },
    { text: "fumbling through learning new things" },
    { text: "inbox-zero person 📥" },
    { text: "Slack group hoarder"},
    { text: "constant tinkerer"},
    { text: "enjoy meditating to cooking videos on youtube 👩‍🍳"},
    { text: "regularly bite off more than I can chew - literally and figuratively"},
    { text: "like this portfolio, a constant work in progress"},
    { text: "have strong opinions on movies 🎬"},
    { text: "make really good french toast 🍞"},
    { text: "constantly curious"},
    { text: "in a constant state of learning something new"},
    { text: "prefer speaking in giphys"},
    { text: "learning how to make a great cup of coffee ☕️"},
    { text: "have never seen the movie Shrek"},
    { text: "fan of sweet treats 🍭"},
    { text: "in a phase of learning to play chess online ♟"},
    { text: "thinks lime Skittles are better than green apple Skittles (🙏 bring them back)"},
    { text: "an avid consumer of: news, plane tickets, sneakers, and HBO"},
    { text: "former grade-school pianist 🎹"},
    { text: "aspiring polyglot 🙋‍♂️"},
    { text: "not a fan of drinking milk 🥛"},
    { text: "lurker of other design portfolios 🤫"},
    { text: "curious about how digital products can cut through noise 🧐"},
    { text: "sometimes I like to design with code 👨‍💻"},
    { text: "I regularly fall when riding my fixed-gear bicycle 🚴‍♂️"},
    { text: "learning how to race cars 🏎"},
    { text: "can fall asleep anywhere 😴"},
    { text: "introvert, but aspiring ambivert"},
    { text: "a fan of giant robots 🤖"},
    { text: "I start most mornings watching videos of snow leopard cubs 🐯"},
    { text: "is not good at golf 🏌️‍♂️ - like at all"},
    { text: "I have a desk cactus named Pete 🌵"},
    { text: "I believe mint chip is the best ice cream 🍦"},
    { text: "drinker of limoncello LaCroix"},
  ]

  const randomFact = () => {
    let random = facts[Math.floor(Math.random() * facts.length)]
    return random
  }

  const [isRandom, setIsRandom] = useState('')

  useEffect(() => {
    setIsRandom(randomFact())
  }, [])

  return(
    <RandomText
      role="button"
      onClick={() => setIsRandom(randomFact())}
    >
      {isRandom.text}
    </RandomText>
  )
}

export default Randomizer