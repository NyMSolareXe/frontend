import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, BrowserRouter as Router } from 'react-router-dom'

export default function ButtonAppBar() {
  const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#fff',
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
        </Toolbar>
      </AppBar>
    </Box>
  )
}
