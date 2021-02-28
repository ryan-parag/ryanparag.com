import Link from 'next/link'
import { TabBar, TabItem } from '@components/Tabs'
import { Search, Zap, MessageSquare, CheckCircle, AlertTriangle } from 'react-feather'
import { designTokens } from '@components/Theme/designTokens'

const TabNav = ({items, active}) => {

  const getIcon = (type) => {
    switch (type) {
      case 'Research':
        return <Search size={'16'}/>
        break;
      case 'Behavioral':
        return <Zap size={'16'}/>
        break;
      case 'Testing':
        return <CheckCircle size={'16'}/>
        break;
      case 'Feedback':
        return <MessageSquare size={'16'}/>
        break;
      case 'Critique':
        return <AlertTriangle size={'16'}/>
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
                href={`/worksheets/${item.toLowerCase()}`}
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