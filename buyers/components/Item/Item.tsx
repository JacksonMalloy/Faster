import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Item = () => {
  const { accessCode, menuId, itemId } = useParams()

  console.log(accessCode, menuId, itemId)
  return (
    <div>
      <>ITEM</>
    </div>
  )
}

export default Item
