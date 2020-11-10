import { useQuery } from '@apollo/client'
import MainNavigation from 'components/MainNavigation'
import Menu from 'components/Menu'
import { useRouter } from 'next/router'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'

// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'

const MenuPage = () => {
  const {
    query: { id },
  } = useRouter()

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
        <Menu id={id} organization_id={userData.activeUserAdmin.organization_id} />
      </MainNavigation>
    )
  }

  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export default MenuPage
