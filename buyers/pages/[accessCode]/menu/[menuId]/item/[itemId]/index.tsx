import { useRouter } from 'next/router'
import Item from '../../../../../../components/Item'

const ItemPage = () => {
  const {
    query: { accessCode, menuId, itemId },
  } = useRouter()

  return (
    <>
      <Item accessCode={accessCode} menuId={menuId} itemId={itemId} />
    </>
  )
}

export default ItemPage
