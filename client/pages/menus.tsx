import MainNavigation from 'components/MainNavigation'
import Menus from 'components/Menus'

import { useQuery } from '@apollo/client'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'
// GraphQL
import { ACTIVE_USER_ADMIN } from 'graphql/queries/active-user/activeUserAdmin'
import { useEffect, useState } from 'react'

const MenusPage = () => {
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
        <Menus organization_id={userData.activeUserAdmin.organization_id} />
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
