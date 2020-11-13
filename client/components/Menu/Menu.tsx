import { useState, useEffect } from 'react'

// GraphQL
import { useQuery } from '@apollo/client'
import { MENU_ITEMS_BY_MENU } from 'graphql/queries/menu-item/menuItemsByMenu'

// Components
import { ItemCard } from 'components/Menu/ItemCard'
import Form from 'components/Form'

// Common Components
import DashboardHeader from 'components/common/DashboardHeader'

// SVG
import { QAtools } from 'components/QAtools'
import { useRouter } from 'next/router'
import { useUI } from '../Context'
import { Container, Grid } from 'components/UI'
import Skeleton from 'components/UI/Skeleton'

type MenuProps = {
  id: number
  organization_id: number
}

type ItemTypes = {
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

const Menu = ({ id, organization_id }: MenuProps) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const { selectedMenuName, setOrganizationId, setMenuId, setFormView } = useUI()

  useEffect(() => {
    setFormView('CREATE_ITEM_VIEW')
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!selectedMenuName) {
      router.push(`/menus`)
    }

    setOrganizationId(organization_id)
    setMenuId(id)
    // eslint-disable-next-line
  }, [organization_id, router, selectedMenuName])

  const { data, loading, error } = useQuery(MENU_ITEMS_BY_MENU, {
    variables: { menu_id: id },
    fetchPolicy: 'cache-first',
  })

  if (loading)
    return (
      <>
        <DashboardHeader setSearch={setSearch} search={search} />
        <Container>
          <Grid>
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
            <Skeleton width="100%" height="10rem" />
          </Grid>
          <Form menu_id={id} />
        </Container>
      </>
    )

  if (error) return <p>ERROR</p>

  if (!data) return <p>Not found</p>

  return (
    <>
      <QAtools />
      <DashboardHeader />
      <Container>
        <Grid>
          {data && data.menuItemsByMenu
            ? data.menuItemsByMenu.map((item: ItemTypes) => <ItemCard item={item} key={item.menu_item_id} />)
            : null}
        </Grid>
        <Form menu_id={id} />
      </Container>
    </>
  )
}

export default Menu
