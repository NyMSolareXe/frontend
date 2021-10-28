import { Typography } from '@mui/material'

import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getAllOrganizations } from '../../features/solarity/solarity-slice'
import './Organization.scss'
import AddIcon from '@mui/icons-material/Add'

const Organization = () => {
  const organizationListRedux = useAppSelector((state) => state.solarity.organizations)

  return (
    <div className="Organization_Parent">
      {organizationListRedux &&
        organizationListRedux.map((element,index) => (
          <Link to={`/manage/${index}`} style={{ textDecoration: 'none' }} key={element.id}>
            <div className="Organization_Boxes">
              <Typography variant="h3" marginTop="3rem" marginBottom="3rem">
                {element.name}
              </Typography>
            </div>
          </Link>
        ))}
      <Link to={`/manage/new`} style={{ textDecoration: 'none' }}>
        <div className="Organization_Boxes">
          <Typography variant="h3" marginTop="3rem" marginBottom="3rem">
            Create New
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AddIcon sx={{ fontSize: '3.75rem' }} />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Organization
