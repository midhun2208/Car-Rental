import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { message } from "antd";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

// const pages = ["Products", "Pricing", "Blog"];

function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    message.error("LoggedOut");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="sticky" className="navbar-user">
        <Container fluid maxWidth="3xl" >
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "White",
                textDecoration: "none",
              }}
            >
              WheelsOnDemand
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="White"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem className="">
                  <Link to={"/"}>
                    <Typography
                      textAlign="center "
                      className="navbar-lists-in "
                    >
                      Home
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Listing</Typography>
                </MenuItem>
                <Link>
                  <MenuItem>
                    <Typography textAlign="center">Payment_Rental</Typography>
                  </MenuItem>
                </Link>
                <MenuItem>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to={"/"}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "White", display: "block" }}
                >
                  <MenuItem>
                    <Typography textAlign="center" className="navbar-lists">
                      Home
                    </Typography>
                  </MenuItem>
                </Button>
              </Link>

              <MDBDropdown>
                <MDBDropdownToggle className="btn btn-dark mt-3 bg-black fs-6">
                  Listing
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to={"/"}>
                    <MDBDropdownItem className="mx-4">
                      Rental-Cars
                    </MDBDropdownItem>
                  </Link>
                  <Link to={"/UsedCars"}>
                    <a href="#UsedCarslists">
                      <MDBDropdownItem className="mx-4">
                        Used Cars
                      </MDBDropdownItem>
                    </a>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>

              <Link to={"/userRentalPayment"}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "White", display: "block" }}
                >
                  <MenuItem>
                    <Typography textAlign="center">Rental-Payment</Typography>
                  </MenuItem>
                </Button>
              </Link>
              <Link to={"/UsedCar/userPayment"}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "White", display: "block" }}
                >
                  <MenuItem>
                    <Typography textAlign="center">UsedCar-Payment</Typography>
                  </MenuItem>
                </Button>
              </Link>
              {/* <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "White", display: "block" }}
              >
                <MenuItem>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "White", display: "block" }}
              >
                <MenuItem>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Button> */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
