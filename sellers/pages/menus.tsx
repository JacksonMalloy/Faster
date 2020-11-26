import MainNavigation from 'components/MainNavigation'
import Menus from 'components/Menus'

import { useQuery } from '@apollo/client'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'
// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'
import { useEffect, useState } from 'react'
import Skeleton from 'components/UI/Skeleton'
import DashboardHeader from 'components/common/DashboardHeader'
import { Container, Form, Grid } from 'components/UI'

const MenusPage = () => {
  const { loading: userLoading, data: userData } = useQuery(ACTIVE_USER_ADMIN, {
    fetchPolicy: 'network-only',
  })

  console.log({ userData })

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
        <Menus tenantId={userData.activeUserAdmin.tenantId} />
      </MainNavigation>
    )
  }

  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export default MenusPage
