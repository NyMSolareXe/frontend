import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Manage from './pages/Manage'
import Navbar from './components/Navbar'
import Customers from './pages/Customers'
import { useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { getAllOrganizations } from './features/solarity/solarity-slice'

const App = () => {


  const organizationListRedux = useAppSelector((state) => state.solarity.organizations)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (organizationListRedux.length === 0) {
      dispatch(getAllOrganizations())
    }
  }, [])

  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/manage">
            <Manage />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
