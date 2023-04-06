import * as React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginForm from '../pages/login-form'
import Layout from '../pages/layout'
import PersonalPage from '../pages/personal-page'

export default function RouterComponent() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/">
          <Layout>
            <LoginForm />
          </Layout>
        </Route>
        <Route exact path="/personal">
          <PersonalPage />
        </Route>
      </Switch>
    </Router>
  )
}
