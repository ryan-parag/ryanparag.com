import React, { useEffect } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Label, ItemTitle, Body } from '@components/Typography'
import { ListItem } from '@components/List'
import Tooltip from '@components/Tooltip'
import Chip from '@components/Chip'

const WordleContainer = styled.div`
  display: grid;
  grid-template-columns: auto ${designTokens.space[8]};
  grid-column-gap: ${designTokens.space[4]};
  padding: ${designTokens.space[3]} 0;
  min-height: ${designTokens.space[9]};
`

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${designTokens.space[1]};
  height: fit-content;
`

const Row = styled.div`
  display: grid;
  grid-column-gap: ${designTokens.space[1]};
  grid-template-columns: repeat(5, ${designTokens.space[3]});
  height: ${designTokens.space[3]};
`

const Block = styled.span`
  width: ${designTokens.space[3]};
  height: ${designTokens.space[3]};
  background: ${props => props.type === 'correct' ? '#0BB409' : props.type === 'present' ? '#FBCC1B' : 'var(--grey300)'};
  display: inline-block;
  border-radius: ${designTokens.space[1]};
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    transform: scale(1.2);
  }
`

const BlockDefault = styled(Block)`
  background: ${props => props.type === 'correct' ? '#0BB409' : props.type === 'present' ? '#FBCC1B' : 'var(--grey300)'};
`

const BlockHighContrast = styled(Block)`
background: ${props => props.type === 'correct' ? '#E76A29' : props.type === 'present' ? '#78B7FF' : 'var(--grey300)'};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Emoji = styled.label`
  font-size: ${designTokens.fontSizes[2]};
`

const RangeContainer = styled.div`
  display: flex;
`

const RangeItem = styled.div`
  color: ${props => props.state === 'active' ? 'var(--primaryDark)' : 'inherit'};
  opacity: ${props => props.state === 'active' ? '1' : '.5'};
  padding: ${designTokens.space[1]} ${designTokens.space[1]};
  display: inline-flex;
  justify-content: center;
  border-bottom: ${designTokens.space[1]} solid ${props => props.state === 'active' ? 'var(--primaryDark)' : 'var(--grey300)'};
  font-weight: ${props => props.state === 'active' ? designTokens.fontWeights.bold : designTokens.fontWeights.body};
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${designTokens.space[3]};
  ${({ responsive }) => responsive && `
    @media screen and (max-width: ${designTokens.breakpoints[5]}) {
      flex-direction: column;
      align-items: flex-start;
      ${Label} {
        margin-bottom: ${designTokens.space[2]};
      }
    }
  `}
`

const WordleResult = ({contrast, result}) => {

  const getResultContent = (content) => {
    switch (content) {
      case 'absent':
        return 'Incorrect guess 🙃'
        break;
      case 'present':
        return 'Almost there...'
        break;
      case 'correct':
        return 'Correct ✅'
        break;
      default:
        return ''
    }
  }

  return(
    <ResultContainer>
      {
        result.map((item, i) => (
          <Row key={i}>
            {
              item.map((letter, i) => (
                <Tooltip content={getResultContent(letter)} direction="top">
                  {
                    contrast === 'high' ? (
                      <BlockHighContrast type={letter} key={i}/>
                    )
                    :
                    (
                      <BlockDefault type={letter} key={i}/>
                    )
                  }
                </Tooltip>
              ))
            }
          </Row>
        ))
      }
    </ResultContainer>
  )
}

const Range = ({value}) => {

  const options = ['1', '2', '3', '4', '5', '6']

  return(
    <RangeContainer>
      {
        options.map(item => (
          <RangeItem state={value === item ? 'active' : 'default'}>
            <Label>{item}</Label>
          </RangeItem>
        ))
      }
    </RangeContainer>
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
        <Label mb={'2'}>Attempts {getProgress()}</Label>
        <Range value={value} />
      </div>
    )
  }
}

const Wordle = ({contrast, wordle}) => {

  const formatDate = (input) => {
    const date = new Date(input).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return date
  }

  return(
    <ListItem>
      <WordleContainer>
        <Header>
          <div>
            <ItemTitle>Wordle {wordle.matchNumber}</ItemTitle>
            <Label subtle>{formatDate(wordle.date)}</Label>
            <Label mt={'2'}>{wordle.hardMode && <Chip ghost type={'secondary'}>Hard</Chip>}</Label>
          </div>
          <Evaluation value={wordle.eval}/>
        </Header>
        <WordleResult contrast={contrast} result={wordle.result} />
      </WordleContainer>
    </ListItem>
  )
}

export default Wordle