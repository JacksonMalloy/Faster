import { useQuery } from '@apollo/client'
import { Header } from 'components/common/Header'
import { MainLayout } from 'components/common/layout/MainLayout'
import Dashboard from 'components/Dashboard'
import Login from 'components/Login'
import { ACTIVE_USER_CUSTOMER } from '../graphql/queries/active-user/activeUserCustomer'

const LoginPage = () => {
  const { loading: userLoading, data: userData } = useQuery(ACTIVE_USER_CUSTOMER, {
    fetchPolicy: 'network-only',
  })

  if (userLoading) {
    return (
      <MainLayout>
        <p>loading</p>
      </MainLayout>
    )
  }

  if (userData.activeUserCustomer) {
    return (
      <MainLayout permissions={userData.activeUserCustomer.permissions}>
        <Header />
        {userData && userData.activeUserCustomer && <Dashboard userData={userData} />}
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Header />
      <Login />
    </MainLayout>
  )
}

export default LoginPage
