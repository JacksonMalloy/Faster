import { useQuery } from '@apollo/client'

import { useUI } from 'components/Context'
import { Container } from 'components/UI'
import Skeleton from 'components/UI/Skeleton'
import { TENANT } from 'graphql/queries/tenant/tenant'
import styled from 'styled-components'
import { Info } from './Info'

const StyledAccountWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 600px;

  hr {
    color: black;
    width: 100%;
    margin: 2rem;
  }

  .btns {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
  }

  h1 {
    text-align: left;
    width: 100%;
    padding: 1rem;
  }
`

const Account = ({ tenantId }) => {
  const { data, loading, error } = useQuery(TENANT, { variables: { tenant_id: tenantId } })

  if (loading) {
    return <Skeleton width="100%" height="3rem" />
  }

  if (error) {
    return <>ERROR </>
  }

  return (
    <Container paddingRight={'1rem'}>
      <StyledAccountWrapper>
        <Info data={data.tenant} />
      </StyledAccountWrapper>
    </Container>
  )
}

export default Account
