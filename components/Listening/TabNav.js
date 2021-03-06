import Link from 'next/link'
import { TabBar, TabItem } from '@components/Tabs'
import { Mic, Music, List } from 'react-feather'
import { designTokens } from '@components/Theme/designTokens'

const TabNav = ({items, active}) => {

  const getIcon = (type) => {
    switch (type) {
      case 'Music':
        return <Music size={'16'}/>
        break;
      case 'Podcasts':
        return <Mic size={'16'}/>
        break;
      case 'Playlists':
        return <List size={'16'}/>
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
                href={`/listening/${item.toLowerCase()}`}
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