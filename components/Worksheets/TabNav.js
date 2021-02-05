import Link from 'next/link'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import colorContrast from 'color-contrast'

const TabBar = styled.nav`
  display: flex;
  margin-bottom: ${designTokens.space[4]};
  overflow-x: scroll;
`

const TabItem = styled.div`
  text-align: center;
  width: 100%;
  font-size: ${designTokens.fontSizes[1]};
  border-bottom: 2px solid var(--grey200);
  a {
    color: var(--grey600);
    display: block;
    padding: calc(${designTokens.space[2]} + ${designTokens.space[1]}) ${designTokens.space[2]};
    width: 100%;
    transition: all 120ms ease-out;
    &:hover, &:focus {
      color: var(--grey900);
      background: var(--grey100);
      text-decoration: none;
    }
  }
  &.active {
    border-bottom: 4px solid var(--primary);
    font-weight: ${designTokens.fontWeights.bold};
    a {
      color: var(--grey900);
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