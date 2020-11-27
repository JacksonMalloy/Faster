import MainNavigation from 'components/Navigation'
import MenuItem from 'components/MenuItem'
import { useQuery } from '@apollo/client'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'
// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'

const MenuItemPage = () => {
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
      <MainLayout>
        <MenuItem />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export default MenuItemPage
