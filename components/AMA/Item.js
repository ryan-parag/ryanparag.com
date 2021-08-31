import React, { useState } from 'react'
import { format } from 'timeago.js'
import styled from 'styled-components'
import { SmallButton, ButtonPrimary, Button, SmallButtonDanger } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import { MessageCircle, Edit2 } from 'react-feather'
import Avatar from '@components/Avatar'
import { Label, Body, ItemTitle } from '@components/Typography'

const AskedQuestion = styled(ItemTitle)`

`

const Answer = styled(Body)`
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

export const Question = ({id, editable, question, answer, likes, edited, created }) => {

  const [edit, setEdit] = useState(false)
  const [editableAnswer, setAnswer] = useState(answer)
  const [editableQuestion, setQuestion] = useState(question)

  const handleClick = async (e) => {
    e.preventDefault()

    const message = {
      title: editableQuestion,
      description: editableAnswer,
      id: id,
      likes: likes,
      delete: false
    }

    setEdit(false)
    
    const response = await fetch('api/ama/question-update', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

  }

  const handleDelete = async (e) => {
    e.preventDefault()

    const message = {
      title: '',
      description: '',
      id: id,
      likes: likes,
      delete: true
    }

    setEdit(false)

    const response = await fetch('api/ama/question-update', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
  }
  
  return(
    <>
      <Flex>
        <div>
          {
            editableAnswer && editableAnswer.length > 0 ? (
              <Avatar
                icon={<MessageCircle size={20}/>}
                type={'primary'}
              />
            )
            :
            (
              <Avatar
                icon={<MessageCircle size={20}/>}
                type={'default'}
              />
            )
          }
        </div>
        <FlexCol>
          {
            edit ? (
              <div>
                <Label>
                  Question
                  <small style={{ color: 'var(--grey700)', marginLeft: designTokens.space[2], color: 'var(--grey700)' }}>
                    (Asked {created})
                  </small>
                </Label>
                <textarea
                  rows="3"
                  style={{ height: 'auto' }}
                  value={editableQuestion}
                  placeholder="Edit the question..."
                  onChange={e => setQuestion(e.target.value)}
                />
                <Label>Answer</Label>
                <textarea
                  rows="5"
                  value={editableAnswer}
                  placeholder="Enter an answer to the question..."
                  onChange={e => setAnswer(e.target.value)}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                  }}
                >
                  <SmallButtonDanger
                    onClick={handleDelete}
                  >
                    Delete Question
                  </SmallButtonDanger>
                  &nbsp;&nbsp;
                  {
                    editableAnswer && editableAnswer.length > 0 ? (
                      <SmallButton
                        onClick={handleClick}
                      >
                        Save
                      </SmallButton>
                    )
                    :
                    null
                  }
                </div>
              </div>
            )
            :
            (
              <>
                <AskedQuestion smakk>{editableQuestion}</AskedQuestion>
                <Answer>{editableAnswer}</Answer>
              </>
            )
          }
          {
            !edit ? (
              <div style={{ marginTop: designTokens.space[3], display: 'flex', alignItems: 'center' }}>
                <small style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Like id={id} likes={likes}/>&nbsp;&nbsp;
                  {
                    editable ? (
                      <>
                        <SmallButton onClick={() => setEdit(true)}>
                          <Edit2 size={16}/>&nbsp;
                          Edit
                        </SmallButton>
                        &nbsp;&nbsp;
                      </>
                    )
                    :
                    null
                  }
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