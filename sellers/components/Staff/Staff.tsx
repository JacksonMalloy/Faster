import styled from 'styled-components'
import { ADMINS_BY_TENANT } from 'graphql/queries/admin/adminsByTenant'
import { useQuery, useMutation } from '@apollo/client'

const StyledContainer = styled.section`
  padding-left: calc(300px + 1rem);
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  position: absolute;
  top: 0;
  /* display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
grid-template-rows: auto;
grid-gap: 1rem; */
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
    padding: 5rem;
  }
`

const Staff = ({ tenantId }) => {
  const { data, loading, error } = useQuery(ADMINS_BY_TENANT, {
    variables: {
      tenantId: tenantId,
    },
  })

  return (
    <StyledContainer>
      <h1>Tenant Staff Members</h1>
      {data && data.adminsByTenant
        ? data.adminsByTenant.map((admin) => {
            return (
              <div style={{ padding: '2rem' }} key={admin.adminId}>
                <h3>{admin.name}</h3>
                <span>{admin.email}</span>
                <p>{admin.permissions}</p>
                <p>{admin.phone}</p>
              </div>
            )
          })
        : null}
    </StyledContainer>
  )
}

export default Staff
