import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { width } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateEditCustomerFields, updateCustomer, getAllCustomersWithOrganization, updateCreateCustomerOrganizationFields, addCustomerOrganization, deleteCustomerHTTP } from '../../features/solarity/solarity-slice'
import { useHistory, useParams } from 'react-router-dom'
import Divider from '@mui/material/Divider'

const EditCustomer = () => {
  const { id: urlID }: any = useParams()
  const history = useHistory()
  const dispatch = useAppDispatch()

  const customersForAllOrganizationRedux = useAppSelector((state) => state.solarity.customersForAllOrganization)
  const editCustomerRedux = useAppSelector((state) => state.solarity.editCustomer)

  const organizationListRedux = useAppSelector((state) => state.solarity.organizations)

  const createCustomerOrganizationRedux = useAppSelector((state) => state.solarity.createCustomerOrganization)

  useEffect(() => {
    if (customersForAllOrganizationRedux.length !== 0) {
      const { customer_id, customer_id: id, customer_Name: name, customer_Location: location, organization_id } = customersForAllOrganizationRedux[urlID]
      dispatch(updateEditCustomerFields({ id, name, location }))
      dispatch(updateCreateCustomerOrganizationFields({ customer_id, organization_id }))
    }
  }, [customersForAllOrganizationRedux])

  const setFields = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      updateEditCustomerFields({
        ...editCustomerRedux,
        [e.target.id]: e.target.value,
      })
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      updateCreateCustomerOrganizationFields({
        ...createCustomerOrganizationRedux,
        organization_id: +e.target.value,
      })
    )
  }

  const confirm = async () => {
    const response: any = await dispatch(updateCustomer())
    if (response.payload.success) {
      await dispatch(getAllCustomersWithOrganization())
      history.push('/customers')
    }
  }

  const changeOrg = async () => {
    const response: any = await dispatch(addCustomerOrganization())
    if (response.payload.success) {
      await dispatch(getAllCustomersWithOrganization())
      history.push('/customers')
    }
  }

  const deleteCustomer = async () => {
    const response: any = await dispatch(deleteCustomerHTTP())
    if (response.payload.success) {
      await dispatch(getAllCustomersWithOrganization())
      history.push('/customers')
    }
  }

  return (
    <div>
      <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="3rem" marginBottom="3rem">
        Update Customer
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField onChange={setFields} value={editCustomerRedux.name} label="Name" id="name" sx={{ m: 1, width: '35rem' }} rows="1" />
        <TextField onChange={setFields} value={editCustomerRedux.location} label="Location" id="location" sx={{ m: 1, width: '35rem' }} rows="1" />
        <Stack direction="row" spacing="1rem" marginTop="1.5rem" display="flex" justifyContent="center" textAlign="center">
          <Button sx={{ width: '7rem' }} variant="contained" onClick={confirm}>
            Update
          </Button>
          <Button sx={{ width: '7rem' }} variant="contained" onClick={deleteCustomer} color="error">
            Delete
          </Button>
        </Stack>

        <Divider sx={{ width: '50%', marginTop: '3rem' }} variant="middle" />

        <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="3rem" marginBottom="3rem">
          Change Organization
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={createCustomerOrganizationRedux.organization_id ?? ''}
            sx={{ m: 1, width: '35rem', textAlign: 'left' }}
            onChange={handleChange}
          >
            {organizationListRedux.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing="1rem" marginTop="1.5rem" display="flex" justifyContent="center" textAlign="center">
            <Button sx={{ width: '7rem' }} variant="contained" onClick={changeOrg}>
              Update
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default EditCustomer
