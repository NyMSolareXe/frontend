import { Button, Stack, TextField, Typography } from '@mui/material'
import { width } from '@mui/system'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateEditOrganizationFields, getAllOrganizations, updateOrganization, deleteOrganization, getAllCustomersWithOrganization } from '../../features/solarity/solarity-slice'
import { useHistory, useParams } from 'react-router-dom'

const Edit = () => {
  const { id }: any = useParams()
  const history = useHistory()

  const organizationListRedux = useAppSelector((state) => state.solarity.organizations)
  const editOrganizationRedux = useAppSelector((state) => state.solarity.editOrganization)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (organizationListRedux.length !== 0) {
      dispatch(updateEditOrganizationFields(organizationListRedux[id]))
    }
  }, [organizationListRedux])

  const setFields = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      updateEditOrganizationFields({
        ...editOrganizationRedux,
        [e.target.id]: e.target.value,
      })
    )
  }

  const confirm = async () => {
    const response: any = await dispatch(updateOrganization())
    if (response.payload.success) {
      await dispatch(getAllOrganizations())
      history.push('/manage')
    }
  }

  const deleteIt = async () => {
    const response: any = await dispatch(deleteOrganization())
    if (response.payload.success) {
      await dispatch(getAllOrganizations())
      await dispatch(getAllCustomersWithOrganization())
      history.push('/manage')
    }
  }


  if (!editOrganizationRedux) {
    return (
      <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="3rem" marginBottom="3rem">
        404 Not Found
      </Typography>
    )
  }

  return (
    <div>
      <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="3rem" marginBottom="3rem">
        Update Organization
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField onChange={setFields} value={editOrganizationRedux.name} label="Name" id="name" sx={{ m: 1, width: '35rem' }} rows="1" />
        <TextField onChange={setFields} value={editOrganizationRedux.address} label="Address" id="address" sx={{ m: 1, width: '35rem' }} rows="1" />
        <TextField onChange={setFields} value={editOrganizationRedux.phone} label="Phone Number" id="phone" sx={{ m: 1, width: '35rem' }} rows="1" />
        <Stack direction="row" spacing="1rem" marginTop="1.5rem" display="flex" justifyContent="center" textAlign="center">
          <Button sx={{ width: '7rem' }} variant="contained" onClick={confirm}>
            Update
          </Button>
          <Button sx={{ width: '7rem' }} variant="contained" color="error" onClick={deleteIt}>
            Delete
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default Edit
