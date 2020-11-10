import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { ORGANIZATION_BY_ACCESS_CODE } from '../../graphql/queries/organization/organizationByAccessCode'
import { useHistory } from 'react-router-dom'
import { Header } from '../common/Header'
import { Info } from './Info'
import { Menus } from './Menus'

const Organization = () => {
  const history = useHistory()
  const accessCode = history.location.pathname.replace('/', '')

  const { loading, error, data } = useQuery(ORGANIZATION_BY_ACCESS_CODE, { variables: { access_code: accessCode } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  if (data && data.organizationByAccessCode) {
    return (
      <>
        {/* <Header /> */}
        <Info data={data.organizationByAccessCode} />
        <Menus menus={data.organizationByAccessCode.menus} accessCode={accessCode} />
        {/*
        <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </>
    )
  }

  return <>No data</>
}

export default Organization
