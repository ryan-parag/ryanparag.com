import React, { useState } from 'react'
import { Button } from '@components/Button'
import { Label } from '@components/Typography'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import LoadingBox from '@components/LoadingBox'
import Error from '@components/Error'
import { CheckCircle } from 'react-feather'
import Link from 'next/link'

const FormInput = () => {

  const { data, error } = useSWR('/api/wordle', fetcher)

  const [result, setResult] = useState('')
  const [sent, setSent] = useState(false)

  const handleClick = async () => {

    const message = {
      result: result
    }
    
    const response = await fetch('/api/wordle/new', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    setSent(true)
    setResult('')
  }

  return(
    <>
      {
        sent ? (
          <div>
            <Label>Wordle Result</Label>
            <Button onClick={setSent(false)}>Send Another</Button>
          </div>
        )
        :
        (
          <div>
            <Label>Wordle Result</Label>
            <textarea
              placeholder="Paste result from Wordle..."
              onChange={e => setResult(e.target.value)}
              value={result}
            />
            {
              result.length > 0 && (
                <Button onClick={() => handleClick()}>Submit Result</Button>
              )
            }
          </div>
        )
      }
    </>
  )
}

const Form = () => {

  const { data, error } = useSWR('/api/wordle', fetcher)

  const formatDate = (input) => {
    const date = new Date(input).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return date
  }

  const today = new Date()

  return(
    <>
      {
          error && (<Error/>)
        }
      {
        data ? (
          <>
           {
             formatDate(data.wordles[0].date) === formatDate(today) ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center'
              }}>
               <CheckCircle size={'32'} style={{ color: 'var(--primaryDark)' }} />
               <Label mt={'3'} mb={'3'}>Already Submitted for {formatDate(today)}</Label>
               <Link href={'/wordle/activity'}>
                 <a className="link">View in Activity</a>
               </Link>
              </div>
             )
             :
             (
               <FormInput/>
             )
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

export default Form