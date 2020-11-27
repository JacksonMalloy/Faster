import MainNavigation from 'components/Navigation'

import { useQuery } from '@apollo/client'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'
// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'
import Account from 'components/Account'

const AccountPage = () => {
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
        <Account tenantId={userData.activeUserAdmin.tenantId} />
      </MainNavigation>
    )
  }

  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export default AccountPage
