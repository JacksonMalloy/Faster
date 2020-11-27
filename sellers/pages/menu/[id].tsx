import { useQuery } from '@apollo/client'
import MainNavigation from 'components/Navigation'
import Menu from 'components/Menu'
import { useRouter } from 'next/router'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'

// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'
import Skeleton from 'components/UI/Skeleton'
import { Container, Form, Grid } from 'components/UI'
import DashboardHeader from 'components/common/DashboardHeader'

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
      </MainNavigation>
    )
  }

  if (userData.activeUserAdmin) {
    return (
      <MainNavigation permissions={userData.activeUserAdmin.permissions}>
        <Menu id={id} tenantId={userData.activeUserAdmin.tenantId} />
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
