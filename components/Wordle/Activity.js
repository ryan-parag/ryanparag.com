import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Wordle from '@components/Wordle'
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'

const Activity = () => {

  const { data, error } = useSWR('/api/wordle', fetcher)

  return(
    <>
      {
          error && (<Error/>)
        }
      {
        data ? (
          <>
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