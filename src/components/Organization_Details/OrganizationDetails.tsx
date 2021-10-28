import { Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateCurrentOrganization, getAllCustomerForOrganization } from '../../features/solarity/solarity-slice'
import Customer from '../Customers/Customer'
import ModalRemove from '../Modal/ModalRemove'

const OrganizationDetails = () => {
  const { id }: any = useParams()

  const organizationListRedux = useAppSelector((state) => state.solarity.organizations)
  const currentOrganizationRedux = useAppSelector((state) => state.solarity.currentOrganization)
  const customersForOrganizationRedux = useAppSelector((state) => state.solarity.customersForOrganization)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (organizationListRedux) {
      dispatch(updateCurrentOrganization(organizationListRedux[id]))
    }
  }, [organizationListRedux])

  useEffect(() => {
    if (organizationListRedux[id]) {
      dispatch(getAllCustomerForOrganization())
    }
  }, [organizationListRedux])

  if (!currentOrganizationRedux) {
    return (
      <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="3rem" marginBottom="3rem">
        404 Not Found
      </Typography>
    )
  }

  return (
    <div>
      <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="1rem" marginBottom="1rem">
        {currentOrganizationRedux.name}
        <Link to={`/manage/${id}/edit`} style={{ textDecoration: 'none' }}>
          <Button sx={{ width: '7rem', marginLeft: '1rem', height: '3rem', marginBottom: '0.35rem' }} variant="contained">
            Update
          </Button>
        </Link>
      </Typography>

      <Customer customers={customersForOrganizationRedux} />
      <ModalRemove />
    </div>
  )
}

export default OrganizationDetails
