import { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

// Components
import { Menu } from 'components/Dashboard/Menu'

// GraphQL
import { MENUS_BY_TENANT } from 'graphql/queries/menu/menusByTenant'

const StyledContainer = styled.section`
  padding-left: calc(300px + 1rem);
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  position: absolute;
  top: 0;
  background-color: white;
  min-height: 100%;
  width: 100%;

  a {
    text-transform: none;
    text-decoration: none;
    color: black;
  }

  h1 {
    text-align: center;
  }

  .page-title {
    font-size: 4rem;
    font-weight: 900;
  }
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
`

export const Dashboard = ({ userData }) => {
  const {
    activeUserAdmin: { tenant_id },
  } = userData

  const { data, loading, error } = useQuery(MENUS_BY_TENANT, {
    variables: { tenant_id: tenant_id },
  })

  return (
    <StyledContainer>
      <h1 className="page-title">Dashboard</h1>
      <StyledGrid>
        {/* Need to filter for published in the future */}
        {data && data.menusByTenant && data.menusByTenant.length
          ? data.menusByTenant
              .filter((menu) => menu.published)
              .map((menu) => <Menu menu={menu} key={menu.menu_id} image={menu.image} />)
          : null}
      </StyledGrid>
    </StyledContainer>
  )
}
