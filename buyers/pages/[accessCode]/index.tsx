import Home from 'components/Home'
import { useRouter } from 'next/router'
import { Header } from '../../components/common/Header'
import Tenant from '../../components/Tenant'

const HomePage = () => {
  const {
    query: { accessCode },
  } = useRouter()

  return (
    <>
      <Header />
      <Tenant accessCode={accessCode} />
    </>
  )
}

export default HomePage
