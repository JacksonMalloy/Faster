import MainNavigation from 'components/MainNavigation'
import MenuItem from 'components/MenuItem'
import { useQuery } from '@apollo/client'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'
// GraphQL
import { ACTIVE_USER_CUSTOMER } from '../../../graphql/queries/active-user/activeUserCustomer'

const MenuItemPage = () => {
  const { loading: userLoading, data: userData } = useQuery(ACTIVE_USER_CUSTOMER, {
    fetchPolicy: 'network-only',
  })

  if (userLoading) {
    return (
      <MainNavigation>
        <p>loading</p>
      </MainNavigation>
    )
  }

  if (userData.activeUserCustomer) {
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
