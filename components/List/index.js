import { designTokens } from '@components/Theme/designTokens'
import styled from 'styled-components'

export const ListItem = styled.li`
  display: block;
  padding-bottom: 0;
  margin-bottom: 0;
  a {
    margin-bottom: 0;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid var(--grey200);
  }
`

const List = styled.ul`
  margin: 0 0 ${designTokens.space[4]};
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
`

export default List