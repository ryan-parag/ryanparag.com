import React, { useState } from 'react'
import { format } from 'timeago.js'
import styled from 'styled-components'
import { ButtonPrimary, Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import List, { ListItem } from '@components/List'
import { Question } from './Item'
import { Box } from '@components/Box'
import { Inbox, Check } from 'react-feather'
import { ItemTitle, Body } from '@components/Typography'

export const Questions = ({ editable, questions }) => {
  return(
    <List>
      {
        editable && questions.questions.waiting.length > 0 ? (
          <>
            <h4>Pending Questions ({questions.questions.waiting.length})</h4>
            {
              questions.questions.waiting.map((item) => (
                <ListItem key={item.id}>
                  <Question
                    id={item.id}
                    question={item.question}
                    answer={item.answer}
                    likes={item.likes}
                    edited={format(item.edited)}
                    created={format(item.created)}
                    editable={editable}
                  />
                </ListItem>
              ))
            }
            <h4>Answered Questions ({questions.questions.answered.length})</h4>
          </>
        )
        :
        null
      }
      {
        questions.questions.answered.length > 0 ? (
          questions.questions.answered.map((item) => (
            <ListItem key={item.id}>
              <Question
                id={item.id}
                question={item.question}
                answer={item.answer}
                likes={item.likes}
                edited={format(item.edited)}
                created={format(item.created)}
                editable={editable}
              />
            </ListItem>
          ))
        )
        :
        (
          <Box
            center
            border={'transparent'}
            bg={'transparent'}
          >
            <Inbox
              size={'24'}
            />
            <div style={{ padding: `${designTokens.space[3]} 0`}}>
              <ItemTitle small>No questions to show</ItemTitle>
              <Body small>Submit a question to add to the list</Body>
            </div>
          </Box>
        )
      }
    </List>
  )
}

export const Form = () => {

  const [formVal, setFormVal] = useState('')
  const [sent, setSent] = useState(false)

  const handleClick = async () => {

    const message = {
      text: formVal
    }
    setSent(true)
    
    const response = await fetch('api/ama/asked', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setFormVal('')
  }

  return(
    <div>
      {
        !sent ? (
          <>
            <textarea
              rows="3"
              style={{ height: 'auto' }}
              value={formVal}
              placeholder="Ask me anything..."
              onChange={e => setFormVal(e.target.value)}
            />
            {
              formVal.length > 0 ? (
                <div>
                  <Button onClick={() => setFormVal('')}>
                    Clear
                  </Button>
                  &nbsp;&nbsp;
                  <ButtonPrimary onClick={() => handleClick()}>
                    Send your question! 
                  </ButtonPrimary>
                </div>
              )
              :
              null
            }
          </>
        )
        :
        (
          <>
            <Button onClick={() => setSent(false)}>
              Send another question
            </Button>
            <br/>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: designTokens.space[3],
                background: 'var(--primaryTransparent)',
                padding: `${designTokens.space[1]} ${designTokens.space[2]}`,
                borderRadius: designTokens.space[1]
              }}
            >
              <Check
                size={24}
                style={{ marginRight: designTokens.space[2], color: 'var(--primaryDark)' }}
              />
              <small>Thanks - once I've answered your question, it'll show up in the list</small>
            </div>
          </>
        )
      }
    </div>
  )
}