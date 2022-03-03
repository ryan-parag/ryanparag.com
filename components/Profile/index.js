import { useUser } from '@auth0/nextjs-auth0'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import Card from '@components/Card'
import { LoadingSmall } from '@components/LoadingBox'
import Link from 'next/link'

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    margin-bottom: ${designTokens.space[3]};
  }
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${designTokens.breakpoints[4]}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ProfileAvatar = styled.div`
  width: ${designTokens.space[6]};
  height: ${designTokens.space[6]};
  border-radius: 999px;
  margin-right: ${designTokens.space[3]};
  background: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
`

const Profile = () => {
  const { user, isLoading } = useUser()
  return(
    <Card>
      {
        isLoading && (<LoadingSmall/>)
      }
      {
        user && (
          <ProfileContainer>
            <ProfileInfo>
              <ProfileAvatar bg={user.picture}/>
              <div>
                <h5 style={{ marginTop: '0', marginBottom: designTokens.space[1] }}>{user.name}</h5>
                <small>{user.email}</small>
              </div>
            </ProfileInfo>
            <Link href="/api/auth/logout">
              <a className="link">Logout</a>
            </Link>
          </ProfileContainer>
        )
      }
      {
        !user && (
          <span>No profile</span>
        )
      }
    </Card>
  )
}

export default Profile