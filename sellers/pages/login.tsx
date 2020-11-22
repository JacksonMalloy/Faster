import { Header } from 'components/common/Header'
import { MainLayout } from 'components/common/layout/MainLayout'
import Login from 'components/Login'

const LoginPage = () => {
  return (
    <MainLayout>
      <Header />
      <Login />
    </MainLayout>
  )
}

export default LoginPage
