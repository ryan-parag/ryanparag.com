import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'

const TabBar = styled.nav`
  display: flex;
  padding: ${designTokens.space[1]};
  border-radius: ${designTokens.space[2]};
  background: var(--grey100);
  border: 1px solid var(--grey200);
  margin-bottom: ${designTokens.space[4]};
  box-shadow: 0px 1px 2px rgba(0,0,0,0.12);
`

const TabItem = styled.div`
  text-align: center;
  width: 100%;
  font-size: ${designTokens.fontSizes[1]};
  a {
    color: var(--grey700);
    display: block;
    padding: ${designTokens.space[2]};
    border-radius: ${designTokens.space[1]};
    width: 100%;
    transition: all 120ms ease-out;
    &:hover, &:focus {
      color: var(--grey900);
    }
  }
  &.active {
    border-radius: ${designTokens.space[1]};
    background: var(--primary);
    font-weight: ${designTokens.fontWeights.bold};
    a {
      color: var(--grey0);
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