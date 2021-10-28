import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const ListCustomers = () => {
  const customersForAllOrganizationRedux = useAppSelector((state) => state.solarity.customersForAllOrganization)

  return (
    <div>
      <Typography style={{ color: '#1976D2', fontWeight: 700 }} variant="h3" marginTop="1rem" marginBottom="1rem">
        Customer List
        <Link to={`/customers/new`} style={{ textDecoration: 'none' }}>
          <Button sx={{ width: '7rem', marginLeft: '1rem', height: '3rem', marginBottom: '0.35rem' }} variant="contained">
            Create
          </Button>
        </Link>
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Organization</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersForAllOrganizationRedux.map((row, index) => (
              <StyledTableRow key={row.customer_id}>
                <StyledTableCell align="right">{row.customer_id}</StyledTableCell>
                <StyledTableCell align="right">{row.customer_Name}</StyledTableCell>
                <StyledTableCell align="right">{row.customer_Location}</StyledTableCell>
                <StyledTableCell align="right">{row.organization_Name}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/customers/${index}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" variant="contained">
                      Edit
                    </Button>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListCustomers
