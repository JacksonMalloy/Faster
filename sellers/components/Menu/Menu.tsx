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
import SecondaryForm from 'components/Form/SecondaryForm'

type MenuProps = {
  id: number
  tenantId: number
}

type ItemTypes = {
  basePrice: string
  description: string
  menuId: number
  itemId: number
  name: string
  image?: {
    imageId: number
    imageUrl: string
    menuId?: number
    itemId?: number
    tenantId: number
    uploadedAt: number
  }
}

const Menu = ({ id, tenantId }: MenuProps) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const { selectedMenuName, setTenantId, setMenuId, setFormView } = useUI()

  useEffect(() => {
    setFormView('CREATE_ITEM_VIEW')
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!selectedMenuName) {
      router.push(`/menus`)
    }

    setTenantId(tenantId)
    setMenuId(id)
    // eslint-disable-next-line
  }, [tenantId, router, selectedMenuName])

  const { data, loading, error } = useQuery(MENU_ITEMS_BY_MENU, {
    variables: { menuId: id },
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
          <Form menuId={id} />
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
            ? data.menuItemsByMenu.map((item: ItemTypes) => <ItemCard item={item} key={item.itemId} />)
            : null}
        </Grid>
        <Form menuId={id} />
        <SecondaryForm menuId={id} />
      </Container>
    </>
  )
}

export default Menu
