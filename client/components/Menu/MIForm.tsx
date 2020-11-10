// GraphQL
import { useQuery } from '@apollo/client'
import { useUI } from 'components/Context'
import { MENU_HEADERS_BY_MENU } from 'graphql/queries/menu-header/menuHeadersByMenu'
import { MENU_SELECTIONS_BY_ORGANIZATION } from 'graphql/queries/menu-selection/menuSelectionsByOrganization'

// Components
// import { CreateItem } from '../Form/CreateItem'
// import { Edit } from './EditItem'

type RootProps = {
  item?: {
    base_price: string
    description: string
    menu_id: number
    menu_item_id: number
    name: string
    image?: {
      image_id: number
      image_url: string
      menu_id?: number
      menu_item_id?: number
      organization_id: number
      uploaded_at: number
    }
  }
  setIsOpen?: (b: boolean) => void
  menu_id: number
  menu_item_id?: number
}

const MenuItemForm = ({ item, setIsOpen, menu_id, menu_item_id }: RootProps) => {
  const { organizationId } = useUI()
  const { data: headerData, loading: headerDataLoading, error: headerDataError } = useQuery(MENU_HEADERS_BY_MENU, {
    variables: { menu_id: menu_id },
  })

  const { data: selectionData, loading: selectionDataLoading, error: selectionDataError } = useQuery(
    MENU_SELECTIONS_BY_ORGANIZATION,
    {
      variables: {
        organization_id: organizationId,
      },
    }
  )

  return (
    <>
      MIForm
      {/* {item ? (
        // EDIT ITEM
        <Edit
          setIsOpen={setIsOpen}
          item={item}
          headerData={headerData}
          selectionData={selectionData}
          menu_item_id={menu_item_id}
        />
      ) : (
        // CREATE ITEM
        <CreateItem setIsOpen={setIsOpen} headerData={headerData} menu_id={menu_id} selectionData={selectionData} />
      )} */}
    </>
  )
}

export default MenuItemForm
