import { useQuery } from '@apollo/client'

import Login from 'components/Login'
import { MainLayout } from 'components/common/layout/MainLayout'
import MainNavigation from 'components/MainNavigation'
import { Dashboard } from 'components/Dashboard/Dashboard'

import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'

const DashboardPage = () => {
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
    return (
      <MainNavigation permissions={userData.activeUserAdmin.permissions}>
        {userData && userData.activeUserAdmin && <Dashboard userData={userData} />}
      </MainNavigation>
    )
  }

  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export default DashboardPage
