import styled from 'styled-components'
import { useQuery } from '@apollo/client'

// Components
import { Menu } from 'components/Dashboard/Menu'

// GraphQL
import { MENUS_BY_ORGANIZATION } from 'graphql/queries/menu/menusByOrganization'
import Organization from '../Organization'
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
        {/* {data && data.menusByOrganization && data.menusByOrganization.length
          ? data.menusByOrganization
              .filter((menu) => menu.published)
              .map((menu) => <Menu menu={menu} key={menu.menu_id} image={menu.image} />)
          : null} */}
        {/* <Organization /> */}
        <Entry />
      </StyledGrid>
    </>
  )
}

export default Dashboard
