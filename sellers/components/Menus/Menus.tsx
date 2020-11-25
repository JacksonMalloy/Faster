import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { MenuCard } from 'components/Menus/MenuCard'
import Form from 'components/Form'
import { MENUS_BY_TENANT } from 'graphql/queries/menu/menusByTenant'
import { Alert } from 'components/common/Alert'
import DashboardHeader from 'components/common/DashboardHeader'
import { QAtools } from 'components/QAtools'
import { Container, Grid } from '../UI'
import { useUI } from '../Context'
import Skeleton from 'components/UI/Skeleton'

type MenusProps = {
  tenantId: number
}

interface MenuTypes {
  menuId: any
  image?: any
  published?: boolean
  title?: string
  tenantId?: number
}

const Menus = ({ tenantId }: MenusProps) => {
  const [search, setSearch] = useState('')
  const [isRouting, setIsRouting] = useState(false)
  const { setTenantId, setSelectedMenuName, setFormView } = useUI()

  useEffect(() => {
    setSelectedMenuName(null)
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setFormView('CREATE_MENU_VIEW')
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setTenantId(tenantId)
    //eslint-disable-next-line
  }, [tenantId])

  const { data, loading, error } = useQuery(MENUS_BY_TENANT, {
    variables: { tenantId: tenantId },
    fetchPolicy: 'cache-and-network',
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
          <Form />
        </Container>
      </>
    )

  if (error)
    return (
      <>
        <DashboardHeader setSearch={setSearch} search={search} />

        <Container>
          <Grid>ERROR</Grid>
          <Form />
        </Container>
      </>
    )

  if (!data)
    return (
      <>
        <DashboardHeader setSearch={setSearch} search={search} />

        <Container>
          <Grid>Not Found</Grid>
          <Form />
        </Container>
      </>
    )

  return (
    <>
      <QAtools />
      <DashboardHeader setSearch={setSearch} search={search} />
      <Alert />
      <Container>
        <Grid>
          {!isRouting && (
            <>
              {data.menusByTenant ? (
                data.menusByTenant.map((menu: MenuTypes) => (
                  <MenuCard menu={menu} key={menu.menuId} image={menu.image} setIsRouting={setIsRouting} />
                ))
              ) : (
                <>
                  <Skeleton width="100%" height="10rem" />
                  <Skeleton width="100%" height="10rem" />
                  <Skeleton width="100%" height="10rem" />
                  <Skeleton width="100%" height="10rem" />
                  <Skeleton width="100%" height="10rem" />
                </>
              )}
            </>
          )}
        </Grid>
        <Form />
      </Container>
    </>
  )
}

export default Menus
