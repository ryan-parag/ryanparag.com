import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import colorContrast from 'color-contrast'

const TabBar = styled.nav`
  display: flex;
  padding: ${designTokens.space[1]};
  border-radius: ${designTokens.space[2]};
  background: var(--grey100);
  border: 1px solid var(--grey200);
  margin-bottom: ${designTokens.space[4]};
  box-shadow: inset 0px 0px 1px rgba(0,0,0,0.12), inset 0px 0px 4px rgba(0,0,0,0.2);
  overflow-x: scroll;
`

const TabItem = styled.div`
  text-align: center;
  width: 100%;
  font-size: ${designTokens.fontSizes[1]};
  &:not(:last-of-type) {
    margin-right: ${designTokens.space[1]};
  }
  a {
    color: var(--grey700);
    display: block;
    padding: calc(${designTokens.space[2]} + ${designTokens.space[1]}) ${designTokens.space[2]};
    border-radius: ${designTokens.space[2]};
    width: 100%;
    transition: all 120ms ease-out;
    &:hover, &:focus {
      color: var(--grey900);
      background: var(--grey200);
      text-decoration: none;
    }
  }
  &.active {
    border-radius: ${designTokens.space[2]};
    background: var(--primary);
    font-weight: ${designTokens.fontWeights.bold};
    box-shadow: 0px 2px 4px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.08);
    a {
      color: var(--grey0);
      &:hover, &:focus {
        color: var(--grey0);
        background: var(--primary);
        text-decoration: none;
      }
    }
  }
`

const TabNav = ({items, active}) => {

  return(
    <>
      <TabBar>
        {
          items.map((item, i) => (
            <TabItem
              className={item.toLowerCase() === active ? 'active' : 'inactive' }
              key={i}
            >
              <Link
                href={`/worksheets/${item.toLowerCase()}`}
              >
                <a>{item}</a>
              </Link>
            </TabItem>
          ))
        }
      </TabBar>
    </>
  )
}

export default TabNav