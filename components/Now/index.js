import React, { useState } from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { ListItem } from '@components/List'
import { SmallButton, SmallButtonDanger } from '@components/Button'
import { Label } from '@components/Typography'

export const CreateItem = ({ type }) => {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = async () => {

    const message = {
      title: title,
      description: description,
      type: type
    }

    setEdit(false)
    
    const response = await fetch('api/profile/now-create', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    setTitle('')
    setDescription('')
  }

  const cancelClick = () => {
    setTitle('')
    setDescription('')
    setEdit(false)
  }

  return(
    <>
      {
        !edit ? (
          <ListItem>
            <div style={{ padding: `${designTokens.space[3]} 0` }}>
              <SmallButton onClick={() => setEdit(true)}>Create new item</SmallButton>
            </div>
          </ListItem>
        )
        :
        (
          <div
            style={{
              borderLeft: `${designTokens.space[1]} solid var(--primary)`,
              padding: `${designTokens.space[3]} 0 ${designTokens.space[3]} ${designTokens.space[3]}`
            }}
          >
            <h4>Create new item: <span style={{ color: 'var(--secondaryDark)'}}>{type}</span></h4>
            <Label mb={2}>Title</Label>
            <input
              type="text"
              placeholder="Enter the primary value..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Label mb={2}>Description</Label>
            <textarea
              placeholder="Enter a description..."
              value={description}
              style={{ height: designTokens.space[8] }}
              onChange={e => setDescription(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SmallButton onClick={() => cancelClick()}>Cancel</SmallButton>
              &nbsp;&nbsp;
              {
                title.length > 0 && description.length > 0 ? (
                  <SmallButton onClick={() => handleClick()}>Add Item</SmallButton>
                )
                :
                null
              }
            </div>
          </div>
        )
      }
    </>
  )
}
