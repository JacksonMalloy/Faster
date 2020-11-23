import { useQuery } from '@apollo/client'
import { ORGANIZATION_BY_ACCESS_CODE } from '../../graphql/queries/organization/organizationByAccessCode'
import { Info } from './Info'
import { Menus } from './Menus'
import { useRouter } from 'next/router'

const Organization = () => {
  const router = useRouter()

  console.log({ router })

  // const { loading, error, data } = useQuery(ORGANIZATION_BY_ACCESS_CODE, { variables: { access_code: accessCode } })

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error :(</p>

  // if (data && data.organizationByAccessCode) {
  //   return (
  //     <>
  //       {/* <Header /> */}
  //       <Info data={data.organizationByAccessCode} />
  //       <Menus menus={data.organizationByAccessCode.menus} accessCode={accessCode} />
  //       {/*
  //       <pre>{JSON.stringify(data, null, 2)}</pre> */}
  //     </>
  //   )
  // }

  return <>No data</>
}

export default Organization
