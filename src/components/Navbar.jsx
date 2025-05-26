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
import { useAuth } from "../context/authContext/useAuth";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import Timer from "./Timer";
import { NavLink, useLocation, useNavigate } from "react-router";
import { signOut } from "../config/auth";
import { useRecording } from "../context/recordingContext/useRecording";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "@mui/material";
function Navbar() {
  const { currentUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { recordingStatus, setRecordingStatus } = useRecording();
  const location = useLocation();
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#F5F5F5" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {location.pathname === "/dashboard" ? (
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={currentUser.displayName.split("")} src={currentUser.photoURL} />
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
                {currentUser && <Button onClick={() => signOut()}>Logout</Button>}
              </Menu>
            </Box>
          ) : (
            <Link
              color="primary"
              underline="none"
              display="flex"
              alignItems="center"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <ArrowBackIosIcon />
              Home
            </Link>
          )}

          <Box margin="0 auto">
            {recordingStatus === "active" ? (
              <Timer />
            ) : (
              <Typography
                variant="h5"
                noWrap
                component="a"
                textAlign={"center"}
                sx={{
                  mr: 2,
                  // display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: "#004B75",
                }}
                onClick={() => navigate("/dashboard")}
              >
                TwinMind
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
