import React, { useEffect } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Label, ItemTitle, Body } from '@components/Typography'
import Chip from '@components/Chip'

const WordleContainer = styled.div`
  border: 1px solid var(--grey200);
  padding: ${designTokens.space[3]};
  display: grid;
  grid-template-columns: auto ${designTokens.space[8]};
  grid-column-gap: ${designTokens.space[4]};
  margin-bottom: ${designTokens.space[4]};
  border-radius: ${designTokens.space[2]};
`

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${designTokens.space[1]};
`

const Row = styled.div`
  display: grid;
  grid-column-gap: ${designTokens.space[1]};
  grid-template-columns: repeat(5, ${designTokens.space[3]});
`

const Block = styled.span`
  width: ${designTokens.space[3]};
  height: ${designTokens.space[3]};
  background: ${props => props.type === 'correct' ? '#0BB409' : props.type === 'present' ? '#FBCC1B' : 'var(--grey300)'};
  display: inline-block;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Emoji = styled.label`
  font-size: ${designTokens.fontSizes[2]};
`

const AnaylticsContainer = styled.div`
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
`

const AnalyticsBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: ${designTokens.space[2]};
  padding: ${designTokens.space[3]};
`

const AnalyticsFooter = styled.div`
  background: var(--grey100);
  padding: ${designTokens.space[2]} ${designTokens.space[3]};
`

const WordleResult = ({result}) => {

  return(
    <ResultContainer>
      {
        result.map((item, i) => (
          <Row key={i}>
            {
              item.map((letter, i) => (
                <Block type={letter} key={i} title={letter}/>
              ))
            }
          </Row>
        ))
      }
    </ResultContainer>
  )
}

const Evaluation = ({ value }) => {

  const getProgress = () => {
    switch (value) {
      case 'X':
        return '🤬'
      case '6':
        return '🥵'
      case '5':
        return '😑'
      case '4':
        return '😐'
      case '3':
        return '😃'
      case '2':
        return '🤠'
      case '1':
        return '🤯'
      default:
        return ''
    }
  }

  if(value === 'X') {
    return(
      <div>
        <ItemTitle>{getProgress()}</ItemTitle>
        <Label subtle>Unsuccessful</Label>
      </div>
    )
  } else {
    return (
      <div>
        <Emoji>{getProgress()}</Emoji>
        <Label subtle>{value} attempts</Label>
      </div>
    )
  }
}

const Wordle = ({wordle}) => {

  const formatDate = (input) => {
    const date = new Date(input).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return date
  }

  return(
    <WordleContainer>
      <Header>
        <div>
          <ItemTitle>Wordle {wordle.matchNumber}</ItemTitle>
          <Label subtle>{formatDate(wordle.date)}</Label>
        </div>
        <Evaluation value={wordle.eval}/>
      </Header>
      <WordleResult result={wordle.result} />
    </WordleContainer>
  )
}

export const WordleAnalytics = ({data}) => {

  const getWins = () => {
    const losses = []
    const wins = {
      loss: 0,
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      winPercentage: null,
      numOfMatches: null,
      average: null
    }

    data.map(item => {
      if(item.eval === 'X') {
        losses.push(item)
      }
      switch (item.eval) {
        case 'X':
          wins.loss++
          break;
        case '6':
          wins.six++
          break;
        case '5':
          wins.five++
          break;
        case '4':
          wins.four++
          break;
        case '3':
          wins.three++
          break;
        case '2':
          wins.two++
          break;
        case '1':
          wins.one++
          break;
        default:
          return ''
      }
    })

    const percentage = ((data.length - losses.length)/data.length) * 100 + '%'
    wins.winPercentage = percentage
    wins.numOfMatches = data.length
    wins.average = (((wins.one*1) + (wins.two*2) + (wins.three*3) + (wins.four*4) + (wins.five*5) + (wins.six*6)) / wins.numOfMatches).toFixed(2)

    return wins
  }

  return(
    <AnaylticsContainer>
      <AnalyticsBody>
        <div>
          <Label subtle>Total Wins</Label>
          <h4 style={{ marginTop: designTokens.space[2], marginBottom: '0' }}>{getWins().winPercentage}</h4>
        </div>
        <div>
          <Label subtle>Current Streak</Label>
          <h4 style={{ marginTop: designTokens.space[2], marginBottom: '0' }}>{getWins().numOfMatches}</h4>
        </div>
        <div>
          <Label subtle>Avg. Attempts</Label>
          <h4 style={{ marginTop: designTokens.space[2], marginBottom: '0' }}>{getWins().average}</h4>
        </div>
      </AnalyticsBody>
      <AnalyticsFooter>
        <Label subtle>{getWins().numOfMatches} wordles</Label>
      </AnalyticsFooter>
    </AnaylticsContainer>
  )
}

export default Wordle