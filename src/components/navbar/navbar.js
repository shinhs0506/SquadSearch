import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography>
                        SquardSearch
                    </Typography>
                    <Typography>
                        <Link to="/"> Home </Link>
                    </Typography>
                    <Typography>
                        <Link to="/test"> Test </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
