import { Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>!~HomePage~!</h1>
      <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    <Typography variant="h3" component="div" marginTop="3rem" marginBottom="1rem">
        Sorry, not yet implemented
      </Typography>
    </div>
  )
}

export default Home
