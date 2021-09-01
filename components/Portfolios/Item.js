import React, { useState } from 'react'
import { format } from 'timeago.js'
import styled from 'styled-components'
import { SmallButton, ButtonPrimary, Button, SmallButtonDanger } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import { User, Key, Check, XCircle, ArrowRight } from 'react-feather'
import Avatar from '@components/Avatar'
import Switch from '@components/Switch'
import Accordion from '@components/Accordion'
import Chip from '@components/Chip'
import { Label, ItemTitle, Body } from '@components/Typography'

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

const TagInput = styled.div`
  position: relative;
  input {
    padding: ${designTokens.space[3]};
  }
  ${SmallButton} {
    position: absolute;
    right: ${designTokens.space[2]};
    top: 50%;
    transform: translateY(-50%);
  }
`

const IconButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  margin-left: ${designTokens.space[1]};
  margin-top: 2px;
`

const PortfolioLink = styled.a`
  display: inline-block;
  color: var(--grey700);
  border-radius: calc(${designTokens.space[1]}/2);
  box-shadow: 0px 0px 0px 0 var(--grey200);
  background: transparent;
  .hover-icon {
    opacity: 0;
    transform: scale(.5);
    transition: all 120ms ease-out;
  }
  &:hover, &:focus {
    color: var(--grey900);
    background: var(--grey200);
    box-shadow: 0px 0px 0px ${designTokens.space[2]} var(--grey200);
    .hover-icon {
      opacity: 1;
      transform: scale(1);
    }
  }
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    margin-bottom: ${designTokens.space[2]};
  }
`

const PortfolioTitle = styled.h6`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
`

const PortfolioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: calc(${designTokens.space[2]} + ${designTokens.space[1]});
  margin-bottom: ${designTokens.space[2]};
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
    align-items: flex-start
  }
`

const PortfolioPassword = styled.span`
  font-size: ${designTokens.sizing._sm};
  display: inline-flex;
  align-items: center;
  color: var(--secondaryDark);
  margin: 0 0 0 ${designTokens.space[2]};
`

const PortfolioTags = styled.div`
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    margin: ${designTokens.space[2]} 0 0;
  }
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
      tags: item.tags
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

export const Portfolio = ({pending, item}) => {

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
      tags: item.tags
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
                    <ItemTitle small>
                      <strong>{item.name}</strong>
                    </ItemTitle>
                    <Body>
                      <small>
                        <a
                          style={{ textDecoration: 'underline' }}
                          href={item.link}
                          target="_blank"
                          rel="noopener"
                        >
                          {item.link}
                        </a>
                      </small>
                    </Body>
                    {
                      item.description.length > 0 ? (
                        <Body>
                        <small>
                          <span style={{ color: 'var(--grey700)'}}>Description:</span> {item.description}
                        </small>
                        </Body>
                      )
                      :
                      null
                    }
                    <Body>
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
                    </Body>
                    <Body>
                    <small style={{ color: 'var(--grey700)'}}>Tags:</small>&nbsp;
                      {
                        item.tags.length > 0 ? (
                          item.tags.map(tag => (
                            <Chip ghost key={tag} type={'secondary'}>{tag}</Chip>
                          ))
                        )
                        :
                        (
                          <>
                            <small style={{ color: 'var(--grey500)'}}>None</small>
                          </>
                        )
                      }
                    </Body>
                    <Label small mb={2} mt={2}>
                      Submitted {format(item.created)}
                    </Label>
                  </div>
                  <div style={{ paddingTop: designTokens.space[2] }}>
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
              <Avatar
                icon={<User size={20}/>}
                type={'default'}
              />
            </div>
            <NewContent>
              <Content>
                <PortfolioHeader>
                  <PortfolioLink
                    href={item.link}
                    target="_blank"
                    rel="noopener"
                  >
                    <PortfolioTitle>
                      <span>
                        {item.name}
                      </span>
                      {
                        item.password && (
                          <PortfolioPassword>
                            <Key
                              size={'16'}
                            />
                          </PortfolioPassword>
                        )
                      }
                      <ArrowRight size={'16'} style={{ marginLeft: designTokens.space[1] }} className="hover-icon"/>
                    </PortfolioTitle>
                  </PortfolioLink>
                  <PortfolioTags>
                    {
                      item.tags.map(tag => (
                        <Chip ghost mr={designTokens.space[1]} key={tag} type={'secondary'}>{tag}</Chip>
                      ))
                    }
                  </PortfolioTags>
                </PortfolioHeader>
                {
                  item.description && (
                    <p style={{ marginBottom: '0', marginTop: designTokens.space[1], color: 'var(--grey700)' }}>
                      <small>{item.description}</small>
                    </p>
                  )
                }
                <Label mt={2}>
                  <span style={{ position: 'relative', display: 'inline-block', transform: `translateY(-${designTokens.space[1]})`, marginRight: designTokens.space[2]}}>
                    Added {format(item.created)}
                  </span>
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

export const Form = () => {
  const [edit, setEdit] = useState(false)
  const [portfolioLink, setPortfolioLink] = useState('')
  const [portfolioName, setPortfolioName] = useState('')
  const [portfolioDesc, setPortfolioDesc] = useState('')
  const [portfolioPassword, setPortfolioPassword] = useState(false)
  const [portfolioTags, setPortfolioTags] = useState([])
  const [sent, setSent] = useState(false)

  const [currentTag, setCurrentTag] = useState('')

  const clearForm = () => {
    setPortfolioLink('')
    setPortfolioName('')
    setPortfolioDesc('')
    setPortfolioPassword(false)
    setEdit(false)
    setCurrentTag('')
    setPortfolioTags([])
  }

  const addTag = (e) => {
    e.preventDefault()
    setPortfolioTags(portfolioTags => [...portfolioTags, currentTag])
    setCurrentTag('')
  }

  const onEnterPress = (e) => {
    if(e.key == 'Enter') {
      e.preventDefault();
      setPortfolioTags(portfolioTags => [...portfolioTags, currentTag])
      setCurrentTag('')
    }
  }

  const removeTag = (name) => {
    const updated = portfolioTags.filter(item => item !== name)
    setPortfolioTags(updated)
   };

  const handleClick = async () => {

    const portfolio = {
      name: portfolioName,
      link: portfolioLink,
      description: portfolioDesc,
      password: portfolioPassword,
      archived: false,
      tags: portfolioTags
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
              <Label>Tags</Label>
              <TagInput>
                <input
                  type="text"
                  placeholder="eg. Current company, type of designer, etc."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => onEnterPress(e)}
                />
                {currentTag && (<SmallButton onClick={(e) => addTag(e)}>Add tag</SmallButton>)}
              </TagInput>
              <div style={{ marginBottom: designTokens.space[3] }}>
                {
                  portfolioTags.map((tag,i) => (
                    <Chip mr={designTokens.space[1]} ghost key={i} type={'secondary'}>
                      {tag}
                      <IconButton onClick={() => removeTag(tag)}>
                        <XCircle
                          size={'16'}
                        />
                      </IconButton>
                    </Chip>
                  ))
                }
                {
                  currentTag.length > 0 && (
                    <Chip ghost>
                      {currentTag}
                      <IconButton onClick={() => setCurrentTag('')}>
                        <XCircle
                          size={'16'}
                        />
                      </IconButton>
                    </Chip>
                  )
                }
              </div>
              <Label>Additional information</Label>
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