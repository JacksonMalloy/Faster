import React, { useReducer } from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './lib/apollo'
import UserContext from './stores/UserContext'
import { GlobalStyle } from './components/GlobalStyle'
import Routes from './Routes'
import { userReducer, initialUserState } from './stores/userReducer'

function App() {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={[state, dispatch]}>
        <Routes state={state} />
        <GlobalStyle />
      </UserContext.Provider>
    </ApolloProvider>
  )
}

export default App
