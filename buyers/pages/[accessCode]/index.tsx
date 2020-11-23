import Home from 'components/Home'
import { useRouter } from 'next/router'
import { Header } from '../../components/common/Header'
import Organization from '../../components/Organization'

const HomePage = () => {
  const {
    query: { accessCode },
  } = useRouter()

  return (
    <>
      <Header />
      <Organization accessCode={accessCode} />
    </>
  )
}

export default HomePage
