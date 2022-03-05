import Link from 'next/link'
import { TabBar, TabItem } from '@components/Tabs'
import { BarChart, Activity } from 'react-feather'
import { designTokens } from '@components/Theme/designTokens'

const TabNav = ({items, active}) => {

  const getIcon = (type) => {
    switch (type) {
      case 'Activity':
        return <Activity size={'16'}/>
        break;
      case 'Statistics':
        return <BarChart size={'16'}/>
        break;
      default:
        return null
    }
  }

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
                href={`/wordle/${item.toLowerCase()}`}
              >
                <a>
                  <>
                    <span style={{  
                      marginRight: designTokens.space[2]
                    }}>
                      {item}
                    </span>
                    {getIcon(item)}
                  </>
                </a>
              </Link>
            </TabItem>
          ))
        }
      </TabBar>
    </>
  )
}

export default TabNav