import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SmallButton } from '@components/Button'
import { designTokens } from '@components/Theme/designTokens'
import List, { ListItem } from '@components/List'
import { Portfolio } from './Item'
import { Box } from '@components/Box'
import { Search } from 'react-feather'
import NotionLogo from '@components/Logo/NotionLogo'

const SearchFilter = styled.div`
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

const Portfolios = ({ verified, waiting }) => {

  const [verifiedList, setVerifiedList] = useState(verified)
  const [waitingList, setWaitingList] = useState(waiting)

  const [filterString, setFilterString] = useState('')

  const filterData = value => {
    const lowerCaseValue = value.toLowerCase().trim()
    if(!lowerCaseValue) {
      setVerifiedList(verified)
      setWaitingList(waiting)
    } else {
      const filteredVerified = verified.filter(item => {
        return Object.keys(item).some(key => {
          return item[key].toString().toLowerCase().includes(lowerCaseValue)
        })
      })
      const filteredWaiting = waiting.filter(item => {
        return Object.keys(item).some(key => {
          return item[key].toString().toLowerCase().includes(lowerCaseValue)
        })
      })
      setVerifiedList(filteredVerified)
      setWaitingList(filteredWaiting)
    }
  }

  const handleChange = value => {
    setFilterString(value)
    filterData(value)
  }

  useEffect(() => {

  }, [waitingList, verifiedList])

  return(
    <>
      <NotionLogo/>
      <SearchFilter>
        <input
          type="text"
          value={filterString}
          placeholder="Filter by a name or tag..."
          onChange={e => handleChange(e.target.value)}
        />
        {
          filterString.length > 0 ? (
            <SmallButton
              onClick={() => handleChange('')}
            >
              Clear
            </SmallButton>
          )
          :
          null
        }
      </SearchFilter>
      <List>
        {
          waitingList.length > 0 && (
            <>
              <h4>Pending Portfolios</h4>
              {
                waitingList.map(item => (
                  <ListItem key={item.id}>
                    <Portfolio pending item={item}/>
                  </ListItem>
                ))
              }
              <h4>Verified Portfolios</h4>
            </>
          )
        }
        {
          verifiedList.length > 0 ? (
            verifiedList.map((item) => (
              <ListItem key={item.id}>
                <Portfolio item={item}/>
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
              <Search
                size={'24'}
              />
              <>
                {
                  filterString.length > 0 ? (
                    <>
                      <p style={{ marginTop: designTokens.space[3], marginBottom: designTokens.space[3] }}>
                        <strong>No portfolios matched the search <span style={{ color: 'var(--secondaryDark)'}}>{filterString}</span></strong>
                        <br/>
                        <small>Try searching for a different name or tag to help land on a result</small>
                      </p>
                      <SmallButton
                        onClick={() => handleChange('')}
                      >
                        Try again
                      </SmallButton>
                    </>
                  )
                  :
                  (
                    <p style={{ marginTop: designTokens.space[3], marginBottom: designTokens.space[3] }}>
                      <strong>No portfolios to show</strong>
                      <br/>
                      <small>Submit a portfolio to add to the list</small>
                    </p>
                  )
                }
              </>
            </Box>
          )
        }
      </List>
    </>
  )
}

export default Portfolios