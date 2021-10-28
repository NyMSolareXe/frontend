import { useEffect } from 'react'
import { getAllCustomersWithOrganization } from '../features/solarity/solarity-slice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Switch, Route } from 'react-router-dom'
import ListCustomers from '../components/Customers/ListCustomers'
import CreateCustomer from '../components/Customers/CreateCustomer'
import EditCustomer from '../components/Customers/EditCustomer'
import ModalError from '../components/ModalError/ModalError'

const Customers = () => {
  const dispatch = useAppDispatch()
  const customersForAllOrganizationRedux = useAppSelector((state) => state.solarity.customersForAllOrganization)
  useEffect(() => {
    if (customersForAllOrganizationRedux.length === 0) {
      dispatch(getAllCustomersWithOrganization())
    }
  }, [])

  return (
    <div>
      <Switch>
        <Route exact path="/customers/new">
          <CreateCustomer />
        </Route>
        <Route exact path="/customers/:id">
          <EditCustomer />
        </Route>

        <Route exact path="/customers">
          <ListCustomers />
        </Route>
      </Switch>
      <ModalError />
    </div>
  )
}

export default Customers
