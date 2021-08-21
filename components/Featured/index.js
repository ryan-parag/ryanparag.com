import { ProjectItem } from '@components/Projects'
import List, { ListItem } from '@components/List'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { LoadingSmall } from '@components/LoadingBox'
import Error from '@components/Error'

const Featured = () => {

  const { data, error } = useSWR('/api/featured', fetcher);

  return(
    <List>
      {
        error && (<Error/>)
      }
      {
        data ? (
          data.items.map(project => (
            <ListItem key={project.name}>
              <ProjectItem project={project}/>
            </ListItem>
          ))
        )
        :
        <LoadingSmall/>
      }
    </List>
  )
}

export default Featured