import React from 'react'
import { EditForms } from './EditForms'
import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'
import { useQuery } from '@apollo/client'

import styled from 'styled-components'

const StyledCreateMenuForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
`

export const EditItem = ({ setIsOpen, item, headerData, selectionData, menu_item_id }) => {
  const { data, loading, error } = useQuery(MENU_ITEM, {
    variables: { menu_item_id: menu_item_id },
    fetchPolicy: 'cache-first',
  })

  if (loading) {
    return (
      <StyledCreateMenuForm>
        <p>loading</p>
      </StyledCreateMenuForm>
    )
  }

  if (data && data.menuItem) {
    return (
      <EditForms
        item={data.menuItem}
        headerData={headerData}
        selectionData={selectionData}
        menu_item_id={menu_item_id}
        setIsOpen={setIsOpen}
      />
    )
  }

  return (
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}
