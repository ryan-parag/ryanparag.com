import React, { useState } from 'react'
import { format } from 'timeago.js'
import styled from 'styled-components'
import { SmallButton, ButtonPrimary, Button } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import { MessageCircle, Heart, Edit2, Clock } from 'react-feather'
import List, { ListItem } from '@components/List'
import LoadingBox from '@components/LoadingBox'

const AskedQuestion = styled.p`
  font-size: ${designTokens.fontSizes[2]};
  font-weight: ${designTokens.fontWeights.bold};
`

const Answer = styled.p`
  font-size: ${designTokens.fontSizes[1]};
  color: var(--grey700);
  padding-left: ${designTokens.space[3]};
  border-left: 2px solid var(--primary);
`

const Flex = styled.div`
  display: flex;
  width: 100%;
  padding: ${designTokens.space[5]} 0;
  line-height: ${designTokens.lineHeights.smallHeading};
`

const FlexCol = styled.div`
  flex: 1 1 0%;
  padding-left: ${designTokens.space[3]};
`

const Avatar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: ${designTokens.space[5]};
  width: ${designTokens.space[5]};
  background: ${props => props.waiting ? 'var(--grey200)' : 'var(--primaryTransparent)'};
  font-size: ${designTokens.fontSizes[0]};
  font-weight: ${designTokens.fontWeights.bold};
  color: ${props => props.waiting ? 'var(--grey600)' : 'var(--primaryDark)'};
`

const Like = ({ id, likes }) => {

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleClick = async () => {
    setLiked(true)
    const updatedCount = likeCount + 1

    setLikeCount(updatedCount)
    const likeMessage = {
      likes: updatedCount,
      pageId: id
    }
    
    const response = await fetch('api/ama/like', {
      method: 'POST',
      body: JSON.stringify({ likeMessage }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
  }

  return(
    <SmallButton
      onClick={() => handleClick()}
    >
      <svg
        style={{
          marginRight: designTokens.space[1]
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" width="16" height="16"
      >
        <path fill="none" d="M0 0H24V24H0z"/>
        <path fill={liked ? 'var(--secondary)' : 'var(--grey600)'} d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"/>
      </svg>
      {likeCount}
    </SmallButton>
  )
}

export const Question = ({id, question, answer, likes, edited, created }) => {

  const [edit, setEdit] = useState(false)
  const [editableAnswer, setAnswer] = useState(answer === null ? '' : answer)
  const [editableQuestion, setQuestion] = useState(question)
  
  return(
    <>
      <Flex>
        <div>
          {
            editableAnswer.length > 0 ? (
              <Avatar>
                <MessageCircle size={20}/>
              </Avatar>
            )
            :
            (
              <Avatar waiting>
                <MessageCircle size={20}/>
              </Avatar>
            )
          }
        </div>
        <FlexCol>
          {
            edit ? (
              <div>
                <label>Question</label>
                <textarea
                  rows="3"
                  style={{ height: 'auto' }}
                  value={editableQuestion}
                  placeholder="Edit the question..."
                  onChange={e => setQuestion(e.target.value)}
                />
                <label>Answer</label>
                <textarea
                  rows="5"
                  value={editableAnswer}
                  placeholder="Enter an answer to the question..."
                  onChange={e => setAnswer(e.target.value)}
                />
                <div style={{
                  display: 'inline-flex'
                  }}
                >
                  <SmallButton
                  onClick={() => setEdit(false)}
                  >
                    Save
                  </SmallButton>
                  &nbsp;&nbsp;
                  <SmallButton>
                    Delete Question
                  </SmallButton>
                </div>
              </div>
            )
            :
            (
              <>
                <AskedQuestion>{editableQuestion}</AskedQuestion>
                <Answer>{editableAnswer}</Answer>
              </>
            )
          }
          {
            !edit ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <small style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Like id={id} likes={likes}/>&nbsp;&nbsp;
                  <span style={{ color: 'var(--grey700)' }}>
                    Asked {created}
                  </span>
                </small>
              </div>
            )
            :
            null
          }
        </FlexCol>
      </Flex>
    </>
  )
}

export const Questions = ({ questions }) => {
  return(
    <List>
      {
        questions ? (
          <>
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
                    />
                  </ListItem>
                ))
              )
              :
              (
                <span>No questions</span>
              )
            }
          </>
        )
        :
        (
          <LoadingBox>
            No Questions
          </LoadingBox>
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
          <Button onClick={() => setSent(false)}>
            Send another question
          </Button>
        )
      }
    </div>
  )
}