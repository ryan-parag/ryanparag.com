import Link from 'next/link'
import { TabBar, TabItem } from '@components/Tabs'

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
                href={`/listening/${item.toLowerCase()}`}
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