import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { SxProps, Theme } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ClearErrorModal } from '../../features/solarity/solarity-slice'
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
  const errorModalListRedux = useAppSelector((state) => state.solarity.errorModal)

  const [open, setOpen] = React.useState(false)
  // const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch = useAppDispatch()

  const confirm = async () => {
    await dispatch(
      ClearErrorModal({
        show: false,
        title: '',
        message: '',
        time: '',
      })
    )
  }

  return (
    <div>
      <Modal open={errorModalListRedux.show} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#1976D2', fontWeight: 700 }}>
            {errorModalListRedux.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}>
            {errorModalListRedux.message}
          </Typography>
          <Stack direction="row" spacing="1rem" marginTop="1.5rem" display="flex" justifyContent="center" textAlign="center">
            <Button size="small" variant="contained" onClick={confirm}>
              Close
            </Button>
          </Stack>
          <Typography style={{ color: '#1976D2', fontWeight: 700, fontSize: '1rem', marginTop: '2rem' }}>{errorModalListRedux.time}</Typography>
        </Box>
      </Modal>
    </div>
  )
}
