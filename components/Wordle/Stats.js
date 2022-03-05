import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import styled from 'styled-components'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import { designTokens } from '@components/Theme/designTokens'
import { Label, ItemTitle, Body } from '@components/Typography'

const Block = styled.div`
  border: 1px solid var(--grey200);
  border-radius: ${designTokens.space[2]};
  padding: ${designTokens.space[3]};
  grid-column: span ${props => props.wide ? '3' : '1'};
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: ${designTokens.space[3]};
  grid-column-gap: ${designTokens.space[3]};
`

const ProgressContainer = styled.div`
  background: var(--grey200);
  height: ${designTokens.space[3]};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-radius: ${designTokens.space[1]};
`

const RowContainer = styled.div`
  display:grid;
  grid-template-columns: ${designTokens.space[8]} auto ${designTokens.space[5]};
  margin-top: ${designTokens.space[2]};
`

const Progress = ({ value, max }) => {

  const getValue = () => {
    const percent = ((value/max).toFixed(2)*100) + '%'
    return percent
  }

  return(
    <ProgressContainer>
      <div
        style={{
          width: getValue(),
          background: 'var(--primary)',
          borderRadius: designTokens.space[1]
        }}
      />
    </ProgressContainer>
  )
}

const StatCard = ({ label, value }) => {
  return(
    <Block>
      <Label subtle>{label}</Label>
      <h4 style={{ marginTop: designTokens.space[2], marginBottom: 0 }}>{value}</h4>
    </Block>
  )
}

const GuessRow = ({ label, max, value }) => {
  return(
    <RowContainer>
      <Label>{label}</Label>
      <Progress value={value} max={max} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <small>
          <strong>{value}</strong>
        </small>
      </div>
    </RowContainer>
  )
}
 
const Stats = () => {

  const { data, error } = useSWR('/api/wordle/stats', fetcher)

  return(
    <>
      {
          error && (<Error/>)
        }
      {
        data ? (
          <Container>
            <StatCard label={'Total Wins'} value={data.stats.winPercentage} />
            <StatCard label={'Current Streak'} value={data.stats.numOfMatches} />
            <StatCard label={'Avg. Attempts'} value={data.stats.average} />
            <Block wide>
              <Label subtle>Guess Distribution</Label>
              <GuessRow label={'1 Guess'} max={data.stats.numOfMatches} value={data.stats.one} />
              <GuessRow label={'2 Guesses'} max={data.stats.numOfMatches} value={data.stats.two} />
              <GuessRow label={'3 Guesses'} max={data.stats.numOfMatches} value={data.stats.three} />
              <GuessRow label={'4 Guesses'} max={data.stats.numOfMatches} value={data.stats.four} />
              <GuessRow label={'5 Guesses'} max={data.stats.numOfMatches} value={data.stats.five} />
              <GuessRow label={'6 Guesses'} max={data.stats.numOfMatches} value={data.stats.six} />
            </Block>
          </Container>
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