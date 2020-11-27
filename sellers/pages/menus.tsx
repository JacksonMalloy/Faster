import Navigation from 'components/Navigation'
import Menus from 'components/Menus'

import { useQuery } from '@apollo/client'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'
// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'
import Skeleton from 'components/UI/Skeleton'
import DashboardHeader from 'components/common/DashboardHeader'
import { Container, Form, Grid } from 'components/UI'
import { Alert } from '../components/common/Alert'

const MenusPage = () => {
  const { loading: userLoading, data: userData } = useQuery(ACTIVE_USER_ADMIN, {
    fetchPolicy: 'network-only',
  })

  // WARNING: Bugs when adding stateful components when loading.
  // Dispatching state to the provider is asyncronous which may lead
  // to object type errors inside of the stateful components.
  if (userLoading) {
    return (
      <Navigation>
        <DashboardHeader />
        <Container>
          <Grid>
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
          </Grid>
          <Form>
            <div style={{ margin: '2rem 1rem 1rem 1rem' }}>
              <Skeleton width="100%" height="10rem" />
              <Skeleton width="100%" height="30rem" />
            </div>
          </Form>
        </Container>
      </Navigation>
    )
  }

  if (userData.activeUserAdmin) {
    return (
      <Navigation permissions={userData.activeUserAdmin.permissions}>
        <Alert />
        <Menus tenantId={userData.activeUserAdmin.tenantId} />
      </Navigation>
    )
  }

  return (
    <MainLayout>
      <Alert />
      <Login />
    </MainLayout>
  )
}

export default MenusPage
