import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography>SquardSearch</Typography>
          <Typography>
            <Link to="/"> Home </Link>
          </Typography>
          <Typography>
            <Link to="/test"> Test </Link>
          </Typography>
          <Typography>
            <Link to="/Messages">
              <img
                src="https://i.pinimg.com/originals/e7/31/5f/e7315f2424c3248b0fe1f3cedf2802df.jpg"
                width="30px"
              />
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
