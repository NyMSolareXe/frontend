import { useEffect } from 'react'
import { Typography } from '@mui/material'
import Organization from '../components/Organization/Organization'
import OrganizationDetails from '../components/Organization_Details/OrganizationDetails'
import { Switch, Route } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getAllOrganizations } from '../features/solarity/solarity-slice'
import CreateOrganization from '../components/Organization_Create/Create'
import EditOrganization from '../components/Organization_Create/Edit'
import ModalError from '../components/ModalError/ModalError'

const Manage = () => {

  return (
    <div>
      <Switch>
        <Route exact path="/manage/new">
          <CreateOrganization />
        </Route>
        <Route exact path="/manage/:id/edit">
          <EditOrganization />
        </Route>
        <Route exact path="/manage/:id">
          <OrganizationDetails />
        </Route>

        <Route exact path="/manage">
          <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="3rem" marginBottom="3rem">
            Select An Organization
          </Typography>
          <Organization />
        </Route>
      </Switch>
      <ModalError />
    </div>
  )
}

export default Manage
