import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom' // Router can access history outside a React component, BrowserRouter cannot
import Home from './components/Home'
import Menu from './components/Menu'
import Organization from './components/Organization'
import Item from './components/Item'

// Context
import UserContext from './stores/UserContext'
import { initialUserState } from './stores/userReducer'
import { updateToken } from './stores/userActions'

const Routes = () => {
  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      dispatch(updateToken(token))
    }
  }, [state.token])

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/:accessCode'
          render={(props) => {
            return <Organization {...props} />
          }}
        />
        <Route
          exact
          path='/:accessCode/menu/:menuId'
          render={(props) => {
            return <Menu {...props} />
          }}
        />
        <Route
          exact
          path='/:accessCode/menu/:menuId/item/:itemId'
          render={(props) => {
            return <Item {...props} />
          }}
        />
        {/* <Route>
          <Redirect to='/' />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default Routes
