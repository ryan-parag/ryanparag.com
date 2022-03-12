import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import styled from 'styled-components'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import { designTokens } from '@components/Theme/designTokens'
import { Label, ItemTitle } from '@components/Typography'
import { Title } from '@components/Wordle'
import { motion } from 'framer-motion'
const Block = styled.div`
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
  padding: ${designTokens.space[3]};
  grid-column: span ${props => props.wide ? '2' : '1'};
  width: 100%;
  @media screen and (max-width: ${designTokens.breakpoints[5]}) {
    grid-column: span 3;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: ${designTokens.space[3]};
  grid-column-gap: ${designTokens.space[3]};
  @media screen and (max-width: ${designTokens.breakpoints[5]}) {
    grid-template-columns: 1fr;
  }
`

const ProgressContainer = styled.div`
  background: var(--grey100);
  height: ${designTokens.space[3]};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${designTokens.space[1]};
`

const RowContainer = styled.div`
  display:grid;
  grid-template-columns: ${designTokens.space[8]} auto;
  margin-top: ${designTokens.space[2]};
`

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${designTokens.breakpoints[5]}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const Progress = ({ value, max }) => {

  const getValue = () => {
    const percent = ((value/max).toFixed(2)*100)
    return parseFloat(percent).toFixed(2)+"%"
  }

  return(
    <ProgressContainer>
      <motion.div
        style={{
          width: '0%',
          background: 'var(--primary)',
          borderRadius: designTokens.space[1],
          height: '100%',
          opacity: '0'
        }}
        animate={{ width: getValue(), opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      />
      <small style={{ marginLeft: designTokens.space[1] }}>
        <strong>{value}&nbsp;</strong>
       ({getValue()})
      </small>
    </ProgressContainer>
  )
}

const StatCard = ({ label, value }) => {
  return(
    <Block>
      <StatContainer>
        <Label subtle>{label}</Label>
        <h4 style={{ marginTop: designTokens.space[2], marginBottom: 0 }}>{value}</h4>
      </StatContainer>
    </Block>
  )
}

const GuessRow = ({ label, max, value }) => {
  return(
    <RowContainer>
      <Label>{label}</Label>
      <Progress value={value} max={max} />
    </RowContainer>
  )
}
 
const Stats = () => {

  const { data, error } = useSWR('/api/wordle/stats', fetcher)

  const formatDate = (input) => {
    const date = new Date(input).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return date
  }

  return(
    <>
      {
          error && (<Error/>)
        }
      {
        data ? (
          <>
            <Title responsive>
              <Label><strong>Stats from {data.stats.numOfMatches} Wordles</strong></Label>
              <Label subtle>{formatDate(data.stats.firstDate)} - {formatDate(data.stats.lastDate)}</Label>
            </Title>
            <Container>
              <StatCard label={'Total Wins'} value={data.stats.winPercentage} />
              <StatCard label={'Current Streak'} value={data.stats.numOfMatches} />
              <StatCard label={'Avg. Attempts'} value={data.stats.average} />
              <StatCard label={'Avg. 1st Try'} value={data.stats.prediction + ' / 5 letters'} />
              <Block wide>
                <Label subtle>Guess Distribution</Label>
                <GuessRow label={'1 Guess'} max={data.stats.numOfMatches} value={data.stats.guesses.one} />
                <GuessRow label={'2 Guesses'} max={data.stats.numOfMatches} value={data.stats.guesses.two} />
                <GuessRow label={'3 Guesses'} max={data.stats.numOfMatches} value={data.stats.guesses.three} />
                <GuessRow label={'4 Guesses'} max={data.stats.numOfMatches} value={data.stats.guesses.four} />
                <GuessRow label={'5 Guesses'} max={data.stats.numOfMatches} value={data.stats.guesses.five} />
                <GuessRow label={'6 Guesses'} max={data.stats.numOfMatches} value={data.stats.guesses.six} />
              </Block>
            </Container>
          </>
        )
        :
        (
          <LoadingBox/>
        )
      }
    </>
  )
}

export default Stats