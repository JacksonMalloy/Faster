import React from 'react'
import { Header } from '../common/Header'
import { Landing } from './Landing'
import Login from '../common/Login'
import Entry from './Entry'
import { useQuery } from '@apollo/client'
// GraphQL
import { ACTIVE_USER_CUSTOMER } from '../../graphql/queries/active-user/activeUserCustomer'

const Home = () => {
  const { loading: userLoading, data: userData } = useQuery(ACTIVE_USER_CUSTOMER, {
    fetchPolicy: 'network-only',
  })

  if (userLoading) {
    return (
      <section>
        <div>Loading...</div>
      </section>
    )
  }

  if (userData.activeUserCustomer) {
    return (
      <section permissions={userData.activeUserCustomer.permissions}>
        <div>
          <Entry />
        </div>
      </section>
    )
  }

  return (
    <>
      <Login />
    </>
  )
}

export default Home
