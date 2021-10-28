import { Button, Stack, TextField, Typography } from '@mui/material'
import { width } from '@mui/system'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateCreateOrganizationFields, createOrganization, getAllOrganizations } from '../../features/solarity/solarity-slice'
import { useHistory } from 'react-router-dom'

const Create = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const createOrganizationRedux = useAppSelector((state) => state.solarity.createOrganization)

  const setFields = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      updateCreateOrganizationFields({
        ...createOrganizationRedux,
        [e.target.id]: e.target.value,
      })
    )
  }

  const confirm = async () => {
    const response: any = await dispatch(createOrganization())
    if (response.payload.success) {
      await dispatch(getAllOrganizations())
      history.push('/manage')
    }
  }

  return (
    <div>
      <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="3rem" marginBottom="3rem">
        Create New Organization
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField onChange={setFields} value={createOrganizationRedux.name} label="Name" id="name" sx={{ m: 1, width: '35rem' }} rows="1" />
        <TextField onChange={setFields} value={createOrganizationRedux.address} label="Address" id="address" sx={{ m: 1, width: '35rem' }} rows="1" />
        <TextField
          onChange={setFields}
          value={createOrganizationRedux.phone}
          label="Phone Number"
          id="phone"
          sx={{ m: 1, width: '35rem' }}
          rows="1"
        />
        <Stack direction="row" spacing="1rem" marginTop="1.5rem" display="flex" justifyContent="center" textAlign="center">
          <Button sx={{ width: '7rem' }} variant="contained" onClick={confirm}>
            Create
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default Create
