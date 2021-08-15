import React, { useState } from 'react'
import { format } from 'timeago.js'
import styled from 'styled-components'
import { SmallButton, ButtonPrimary, Button, SmallButtonDanger } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import { User, Key, Check } from 'react-feather'
import List, { ListItem } from '@components/List'
import LoadingBox from '@components/LoadingBox'
import { Box } from '@components/Box'
import Switch from '@components/Switch'
import Accordion from '@components/Accordion'

const Label = styled.div`
  font-size: ${designTokens.fontSizes[0]};
  margin-top: ${designTokens.space[1]};
  display: flex;
  align-items: center;
  color: var(--grey700);
`

const NewPostContainer = styled.div`
  display: flex;
  padding: ${designTokens.space[3]} 0;
`

const Content = styled.div`
  color: ${props => props.subtle ? 'var(--grey400)' : 'inherit'};
  padding-left: ${designTokens.space[3]};
`

const NewContent = styled.div`
  flex: 1 1 0%;
`

const SubmitContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${designTokens.space[2]} ${designTokens.space[2]} ${designTokens.space[2]} ${designTokens.space[3]};
  border-left: ${designTokens.space[1]} solid var(--secondary);
  transition: all 200ms ease-out;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
  }
  &:hover, &:focus {
    background: var(--grey100);
  }
`

const FormContainer = styled.div`
  padding: ${designTokens.space[3]};
  border-left: ${designTokens.space[1]} solid var(--primary);
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

const Like = ({ item }) => {

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes)

  const handleClick = async () => {
    setLiked(true)
    const updatedCount = likeCount + 1

    setLikeCount(updatedCount)

    const portfolio = {
      id: item.id,
      name: item.name,
      link: item.link,
      description: item.description,
      password: item.password,
      likes: updatedCount,
      verified: true,
      archived: false,
    }
    
    const response = await fetch('api/portfolios/update', {
      method: 'POST',
      body: JSON.stringify({ portfolio }),
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

const Portfolio = ({pending, item}) => {

  const updatePortfolio = async (update) => {

    const portfolio = {
      id: item.id,
      name: item.name,
      link: item.link,
      description: item.description,
      password: item.password,
      likes: item.likes,
      verified: update === 'verify' ? true : false,
      archived: update === 'verify' ? false : true,
    }
    
    const response = await fetch('api/portfolios/update', {
      method: 'POST',
      body: JSON.stringify({ portfolio }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
  }

  return(
    <>
      {
        pending ? (
          <NewPostContainer>
            <SubmitContainer>
              <NewContent>
                <Content>
                  <div>
                    <p style={{ marginBottom: '0', marginTop: '0' }}>
                      <strong>{item.name}</strong>
                    </p>
                    <p style={{ marginBottom: '0', marginTop: designTokens.space[1] }}>
                      <small>
                        <a
                          style={{ paddingTop: '0', paddingBottom: '0', textDecoration: 'underline' }}
                          href={item.link}
                          target="_blank"
                          rel="noopener"
                        >
                          {item.link}
                        </a>
                      </small>
                    </p>
                    {
                      item.description.length > 0 ? (
                        <p style={{ marginBottom: '0', marginTop: designTokens.space[1] }}>
                        <small>
                          <span style={{ color: 'var(--grey700)'}}>Description:</span> {item.description}
                        </small>
                        </p>
                      )
                      :
                      null
                    }
                    <p style={{ marginBottom: '0', marginTop: designTokens.space[1] }}>
                      <small>
                      <span style={{ color: 'var(--grey700)'}}>Password-protected:</span> {
                          item.password ? (
                            <strong style={{ color: 'var(--secondaryDark)'}}>Yes</strong>
                          )
                          :
                          (
                            <strong style={{ color: 'var(--grey700)'}}>No</strong>
                          )
                        }
                      </small>
                    </p>
                    <Label>
                      Submitted {format(item.created)}
                    </Label>
                  </div>
                  <div>
                    <SmallButtonDanger onClick={() => updatePortfolio('delete')}>Remove</SmallButtonDanger>&nbsp;&nbsp;
                    <SmallButton onClick={() => updatePortfolio('verify')}>Verify</SmallButton>
                  </div>
                </Content>
              </NewContent>
            </SubmitContainer>
          </NewPostContainer>
        )
        :
        (
          <NewPostContainer>
            <div style={{ marginTop: designTokens.space[2] }}>
              <Avatar>
                <User
                  size={20}
                />
              </Avatar>
            </div>
            <NewContent>
              <Content>
                <h4 style={{ marginTop: designTokens.space[2], marginBottom: designTokens.space[2], display: 'flex', alignItems: 'center' }}>
                  {item.name}
                  {
                    item.password ? (
                      <span style={{
                        fontSize: designTokens.fontSizes[0],
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontWeight: designTokens.fontWeights.body,
                        color: 'var(--secondaryDark)',
                        padding: `0 0 0 ${designTokens.space[2]}`
                      }}>
                        <Key
                          size={'16'}
                          style={{
                            marginRight: designTokens.space[1]
                          }}
                        />
                      </span>
                    )
                    :
                    null
                  }
                </h4>
                <div>
                  <small>
                    <a className="link" href={item.link} target="_blank" rel="noopener">{item.link}</a>
                  </small>
                </div>
                <p style={{ marginBottom: '0', marginTop: designTokens.space[1], color: 'var(--grey700)' }}>
                  <small>{item.description}</small>
                </p>
                <Label>
                  Added {format(item.created)}&nbsp;&nbsp;
                  <Like item={item} />
                </Label>
              </Content>
            </NewContent>
          </NewPostContainer>
        )
      }
    </>
  )
}

export const PortfolioList = ({ filterString, items }) => {

  return(
    <List>
      {
        items ? (
          <>
            {
               items.portfolios.waiting.filter((item) => {
                if(filterString == "") {
                  return item
                } else if(item.name.toLowerCase().includes(filterString.toLowerCase())) {
                  return item
                }
              }).length > 0 ? (
                <>
                  <h4>Pending Portfolios</h4>
                   {
                     items.portfolios.waiting.filter((item) => {
                      if(filterString == "") {
                        return item
                      } else if(item.name.toLowerCase().includes(filterString.toLowerCase())) {
                        return item
                      }
                    }).map(item => (
                       <ListItem key={item.id}>
                         <Portfolio pending item={item}/>
                       </ListItem>
                     ))
                   }
                  <h4>Verified Portfolios</h4>
                </>
              )
              :
              null
            }
          </>
        )
        :
        null
      }
      {
        items ? (
          <>
            {
              items.portfolios.verified.filter((item) => {
                if(filterString == "") {
                  return item
                } else if(item.name.toLowerCase().includes(filterString.toLowerCase())) {
                  return item
                }
              }).length > 0 ? (
                items.portfolios.verified.filter((item) => {
                  if(filterString == "") {
                    return item
                  } else if(item.name.toLowerCase().includes(filterString.toLowerCase())) {
                    return item
                  }
                }).map((item) => (
                  <ListItem key={item.id}>
                    <Portfolio item={item}/>
                  </ListItem>
                ))
              )
              :
              (
                <span>No portfolios</span>
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
  const [edit, setEdit] = useState(false)
  const [portfolioLink, setPortfolioLink] = useState('')
  const [portfolioName, setPortfolioName] = useState('')
  const [portfolioDesc, setPortfolioDesc] = useState('')
  const [portfolioPassword, setPortfolioPassword] = useState(false)
  const [sent, setSent] = useState(false)

  const clearForm = () => {
    setPortfolioLink('')
    setPortfolioName('')
    setPortfolioDesc('')
    setPortfolioPassword(false)
    setEdit(false)
  }

  const handleClick = async () => {

    const portfolio = {
      name: portfolioName,
      link: portfolioLink,
      description: portfolioDesc,
      password: portfolioPassword,
      likes: 0,
      archived: false,
    }
    
    const response = await fetch('api/portfolios/list', {
      method: 'POST',
      body: JSON.stringify({ portfolio }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setSent(true)
    clearForm()
  }

  return(
    <>
      {
        edit ? (
          <FormContainer>
            <h4 style={{ marginTop: '0' }}>Add a design portfolio to the directory:</h4>
            <Label>Portfolio link</Label>
            <input
              type="url"
              value={portfolioLink}
              placeholder="Link to portfolio..."
              onChange={e => setPortfolioLink(e.target.value)}
            />
            <Label>Name</Label>
            <input
              type="text"
              value={portfolioName}
              placeholder="Name of the designer..."
              onChange={e => setPortfolioName(e.target.value)}
            />
            <div style={{ marginBottom: designTokens.space[3] }}>
              <Switch
                endLabel={'This portfolio is password-protected'}
                isOn={portfolioPassword}
                handleToggle={() => setPortfolioPassword(!portfolioPassword)}
              />
            </div>
            <Accordion label={'Any additional info?'}>
              <textarea
                rows="3"
                value={portfolioDesc}
                style={{ height: 'auto' }}
                placeholder="Add a description..."
                onChange={e => setPortfolioDesc(e.target.value)}
              />
            </Accordion>
            <div style={{ paddingTop: designTokens.space[3] }}>
              <Button onClick={() => clearForm()}>Cancel</Button>
              &nbsp;&nbsp;
              {
                portfolioLink.length > 0 &&
                portfolioName.length > 0 ? (
                  <ButtonPrimary onClick={() => handleClick()}>Submit Portfolio</ButtonPrimary>
                )
                :
                null
              }
            </div>
          </FormContainer>
        )
        :
        (
          <>
            <Button onClick={() => setEdit(true)}>{sent ? 'Submit another portfolio' : 'Add a portfolio'}</Button>
            <br/>
            {
              sent ? (
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
                  <small>Thanks - once it's verified, it'll show up in the list</small>
                </div>
              )
              :
              null
            }
          </>
        )
      }
    </>
  )
}