import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { getAllCustomersWithOrganization, getAllOrganizations, reseedDatabase } from '../features/solarity/solarity-slice'

export default function ButtonAppBar() {
  const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#fff',
  }
  const dispatch = useAppDispatch()
  const history = useHistory()

  const confirm = async () => {
    const response: any = await dispatch(reseedDatabase())
    if (response.payload.success) {
      await dispatch(getAllOrganizations())
      await dispatch(getAllCustomersWithOrganization())
      history.push('/login')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Avanti Systems
          </Typography>
          <Link to="/" style={navLinkStyle}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/login" style={navLinkStyle}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/manage" style={navLinkStyle}>
            <Button color="inherit">Organization</Button>
          </Link>
          <Link to="/customers" style={navLinkStyle}>
            <Button color="inherit">Customers</Button>
          </Link>
          <Button variant="contained" color="error" onClick={confirm}>
            ReSeed
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
