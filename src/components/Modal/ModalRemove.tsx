import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { SxProps, Theme } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteCustomerFromOrganization, getAllCustomerForOrganization, getAllCustomersWithOrganization, ShowModelRemoveCustomerFromOrganization } from '../../features/solarity/solarity-slice'
import { Stack } from '@mui/material'

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default () => {
  const modalRedux = useAppSelector((state) => state.solarity.modal)
  const currentOrganizationRedux = useAppSelector((state) => state.solarity.currentOrganization)

  const [open, setOpen] = React.useState(false)
  // const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch = useAppDispatch()
  const triggerIt = () => {
    dispatch(
      ShowModelRemoveCustomerFromOrganization({
        id: 0,
        name: '',
        location: '',
        show: false,
      })
    )
  }

  const confirm = async () => {
    await dispatch(deleteCustomerFromOrganization())
    await dispatch(getAllCustomersWithOrganization())
    dispatch(getAllCustomerForOrganization())
  }


  return (
    <div>
      <Modal open={modalRedux.show} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1976D2', fontWeight: 700 }}>
            Organization: {currentOrganizationRedux?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}>
            Are you sure you want to remove {'\n'}customer_id: {modalRedux.id}{'\n'} customer_name: {modalRedux.name}{'\n'}from {currentOrganizationRedux?.name}
          </Typography>
          <Stack direction="row" spacing="1rem" marginTop="1.5rem" display="flex" justifyContent="center" textAlign="center">
            <Button size="small" variant="contained" onClick={confirm}>
              Yes
            </Button>
            <Button sx={{ ml: 2 }} variant="contained" color="error" onClick={triggerIt}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
