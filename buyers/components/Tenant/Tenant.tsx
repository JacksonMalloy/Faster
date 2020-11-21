import { useQuery } from '@apollo/client'
import { TENANT_BY_ACCESS_CODE } from '../../graphql/queries/tenant/tenantByAccessCode'
import { Info } from './Info'
import { Menus } from './Menus'
import { useRouter } from 'next/router'

const Tenant = ({ accessCode }) => {
  console.log({ accessCode })

  const { loading, error, data } = useQuery(TENANT_BY_ACCESS_CODE, { variables: { access_code: accessCode } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  if (data && data.tenantByAccessCode) {
    return (
      <>
        {/* <Header /> */}
        <Info data={data.tenantByAccessCode} />
        <Menus menus={data.tenantByAccessCode.menus} accessCode={accessCode} />
        {/*
        <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </>
    )
  }

  return <>No data</>
}

export default Tenant
