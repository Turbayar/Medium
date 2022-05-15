import * as React from "react";
import { Link } from "react-router-dom";
import MenuListComposition from "../components/SidebarMenu";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { auth } from "../firebase";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <MenuListComposition />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Postloy
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>

              <Link
                style={{
                  background: "white",
                  color: "#0077b6",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                to={auth.currentUser ? "/writing" : "/login"}
              >
                Write an Article
                <RateReviewIcon sx={{ marginLeft: 0.5 }} />
               
              </Link>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
