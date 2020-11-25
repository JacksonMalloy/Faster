import styled from 'styled-components'
import { useQuery } from '@apollo/client'

// Components
import { Menu } from 'components/Dashboard/Menu'

// GraphQL
import { MENUS_BY_TENANT } from 'graphql/queries/menu/menusByTenant'
import Tenant from '../Tenant'
import Entry from '../Entry'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
`

const Dashboard = () => {
  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <StyledGrid>
        Need to filter for published in the future
        {/* {data && data.menusByTenant && data.menusByTenant.length
          ? data.menusByTenant
              .filter((menu) => menu.published)
              .map((menu) => <Menu menu={menu} key={menu.menuId} image={menu.image} />)
          : null} */}
        {/* <Tenant /> */}
        <Entry />
      </StyledGrid>
    </>
  )
}

export default Dashboard
