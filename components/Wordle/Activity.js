import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Wordle from '@components/Wordle'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import { Title } from '@components/Wordle'
import { Label, ItemTitle } from '@components/Typography'

const Activity = () => {

  const { data, error } = useSWR('/api/wordle', fetcher)

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
            <Title>
              <ItemTitle>Data from {data.wordles.length} Wordles</ItemTitle>
              <Label subtle>{formatDate(data.wordles[data.wordles.length - 1].date)} - {formatDate(data.wordles[0].date)}</Label>
            </Title>
            {
              data.wordles.map(item => (
                <Wordle
                  key={item.id}
                  wordle={item}
                />
              ))
            }
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

export default Activity