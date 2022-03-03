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
  display: grid;
  border: 1px solid var(--grey200);
  padding: ${designTokens.space[3]};
  grid-template-columns: 1fr;
  grid-row-gap: ${designTokens.space[1]};
  margin-bottom: ${designTokens.space[4]};
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
        <Emoji>{getProgress()}</Emoji>
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

  const getSum = () => {
    const attempts = []

    data.map(item => {
      if(item.eval === 'X') {
        attempts.push(0)
      } else {
        attempts.push(parseInt(item.eval))
      }
    })

    console.log(attempts)

    const arraySum = (ar) => {
      var sum = 0;
      for (var i = 0; i < ar.length; i++) {
        sum += ar[i];
      }
      return sum;
    }

    const average = arraySum(attempts)/data.length

    return average
  }

  return(
    <AnaylticsContainer>
      <Label subtle>Average # of Attempts</Label>
      <h4>{getSum()} Attempts</h4>
    </AnaylticsContainer>
  )
}

export default Wordle