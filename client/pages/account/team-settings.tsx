import { useQuery } from '@apollo/client'
import MainNavigation from 'components/MainNavigation'
import TeamSettings from 'components/Account/TeamSettings'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'

// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'

const TeamSettingsPage = () => {
  const { loading: userLoading, data: userData } = useQuery(ACTIVE_USER_ADMIN, {
    fetchPolicy: 'network-only',
  })

  if (userLoading) {
    return (
      <MainNavigation>
        <p>loading</p>
      </MainNavigation>
    )
  }

  if (userData.activeUserAdmin) {
    return <TeamSettings permissions={userData.activeUserAdmin.permissions} />
  }

  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export default TeamSettingsPage
