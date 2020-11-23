import { useRouter } from 'next/router'
import Menu from '../../../../components/Menu'

const MenuPage = () => {
  const {
    query: { accessCode, menuId },
  } = useRouter()

  return (
    <>
      <Menu accessCode={accessCode} menuId={menuId} />
    </>
  )
}

export default MenuPage
