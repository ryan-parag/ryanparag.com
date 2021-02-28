import { ProjectItem } from '@components/Projects'
import List, { ListItem } from '@components/List'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Box } from '@components/Box'

const Featured = () => {

  const { data } = useSWR('/api/featured', fetcher);

  if (!data) {
    return (
      <Box center>
        Something went wrong
      </Box>
    )
  }

  return(
    <List>
      {
        data.items.map(project => (
          <ListItem key={project.name}>
            <ProjectItem project={project}/>
          </ListItem>
        ))
      }
    </List>
  )
}

export default Featured