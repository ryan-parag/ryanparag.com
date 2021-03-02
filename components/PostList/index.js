import { format } from 'timeago.js'
import List, { ListItem } from '@components/List'
import { truncateString } from '@utils/text'
import { ProjectItem } from '@components/Projects'

const PostItem = ({post}) => {

  const item = {
    name: post?.frontmatter?.title,
    description: post.frontmatter.description,
    bgImage: post.frontmatter.hero_image,
    link: `/notes/${post.slug}`,
    label: `Updated ${format(post.frontmatter.date)}`,
    outbound: false
  }

  return(
    <ProjectItem project={item}/>
  )
}

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <>
      <div>
        {!posts && <div>No posts!</div>}
        <List>
          {
            posts && posts.map(post => (
              <ListItem key={post.slug}>
                <PostItem post={post}/>
              </ListItem>
            ))
          }
        </List>
      </div>
    </>
  )
}
