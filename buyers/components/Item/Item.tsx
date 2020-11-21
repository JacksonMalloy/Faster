import { useQuery } from '@apollo/client'
import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'
import React from 'react'

const Item = ({ accessCode, menuId, itemId }) => {
  console.log(accessCode, menuId, itemId)

  const { loading, error, data } = useQuery(MENU_ITEM, { variables: { menu_item_id: itemId } })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <>ITEM</>
      <div> {accessCode}</div>

      <div> {menuId}</div>

      <div> {itemId}</div>

      <pre style={{ fontSize: '0.8rem' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Item
