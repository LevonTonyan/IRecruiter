import "./HeaderStyles.css";
import { Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Searching from "../searching/Searching";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.jsx";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CreateJob from "../profilePage/CreateJob/CreateJob";
import CreateClient from "../profilePage/CreateClient/CreateClient";
import CandidateForm from "../profilePage/CreateCandidateModal/CandidateForm/CandidateForm";

const drawerWidth = 190;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showJobFormModal, setShowJobFormModal] = useState(false);
  const [showClientFormModal, setShowClientFormModal] = useState(false)

  const {
    logout,
    currentUserData,
    settingUser,
    user,
    isSidebarOpen,
    setIsSidebarOpen,
    handleAddRecentlyVis,
  } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const usersName = Object.keys(currentUserData).length && currentUserData["Candidate Name"][0];
  const organisation = Object.keys(currentUserData).length
    ? currentUserData.organisation
    : "";
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const [anchor, setAnchor] = useState(null);

  const opened = Boolean(anchor);

  const close = () => {
    setAnchor(null);
  };

  const click = (e) => {
    setAnchor(e.currentTarget);
  };

  const createCandidate = () => {
    setShowCandidateModal((prev) => !prev);
  };

  /////////////CREATE JOB HANDLER////////////////////////
  const createJob = () => {
    setShowJobFormModal((prev) => !prev);
  };

  const createClient = () => {
    setShowClientFormModal((prev) => !prev);
  };


  useEffect(() => {
    handleAddRecentlyVis(location.pathname);
  }, [location]);

  /////////////HANDLING REFRESH TO RELOAD USER DETAILS///////////////////////
  useEffect(() => {
    if (Object.keys(user).length && !Object.keys(currentUserData).length) {
      settingUser(user.uid);
    }
  },[]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  const styles = {
    menuItem: {
      height: "25px",
      fontSize: 15,
    },
    menuIcon: {
      marginRight: "10px",
      fontSize: 20,
    },
  };

  return (
    <>
      {showCandidateModal && (
        <CandidateForm setShowCandidateFormModal={setShowCandidateModal} />
      )}
      {showJobFormModal && (
        <CreateJob setShowJobFormModal={setShowJobFormModal} />
      )}
         {showClientFormModal && (
        <CreateClient setShowClientFormModal={setShowClientFormModal} />
      )}
      <Box>
        <AppBar position="fixed">
          <Box className="navbar">
            <Toolbar className="toolbar">
              <div>
                <IconButton
                  onClick={() => {
                    setIsSidebarOpen((prev) => !prev);
                  }}
                >
                  <MenuIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
                <span>
                  <Link
                    to="/dashboard
                        "
                    className="home_link"
                  >
                    {organisation}
                  </Link>
                </span>
              </div>

              <ClickAwayListener onClickAway={() => setIsSearching(false)}>
                <div className="search-wrap">
                  <div className="search-input">
                    <input
                      value={searchInputValue}
                      onChange={(e) => setSearchInputValue(e.target.value)}
                      onFocus={() => setIsSearching(true)}
                      type="text"
                      placeholder="Search by Name, Job, Email or Client"
                    />
                    <button className="search-btn">
                      <SearchIcon />
                    </button>
                  </div>
                  <Searching
                    isSearching={isSearching}
                    searchInputValue={searchInputValue}
                    setSearchInputValue={setSearchInputValue}
                  />
                </div>
              </ClickAwayListener>

              <div>
                <div
                  className={currentUserData.type==='employee'?"cont hidden":"cont"}
                  onClick={click}
                  aria-controls={opened ? "menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={opened ? true : undefined}
                >
                  <IconButton>
                    <AddCircleIcon sx={{ color: "white" }} />
                  </IconButton>
                </div>
                <Menu
                  id="menu"
                  anchorEl={anchor}
                  open={opened}
                  MenuListProps={{ "aria-labelledby": "avatar-btn" }}
                  onClose={close}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    sx={styles.menuItem}
                    alignitems="true"
                    onClick={() => createCandidate()}
                  >
                    <PersonIcon sx={styles.menuIcon} />
                    Create Canditate
                  </MenuItem>

                  <MenuItem sx={styles.menuItem} onClick={() => createJob()}>
                    <WorkIcon sx={styles.menuIcon} />
                    Create Job
                  </MenuItem>

                  <MenuItem sx={styles.menuItem} onClick={() => createClient()}>
                    <PersonPinIcon sx={styles.menuIcon} />
                    Create Client
                  </MenuItem>
                </Menu>

                <div
                  className='cont'
                  id="avatar-btn"
                  onClick={handleClick}
                  aria-controls={open ? "menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? true : undefined}
                >
                  <div className="user_avatar">{user.photoURL?<img src={user.photoURL} alt=''/>:usersName[0]}</div>
                </div>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{ "aria-labelledby": "avatar-btn" }}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Link to="settings">
                    <MenuItem sx={styles.menuItem} divider alignitems="true">
                      <SettingsIcon sx={styles.menuIcon} />
                      Settings
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={handleLogout} sx={styles.menuItem}>
                    <PowerSettingsNewIcon sx={styles.menuIcon} /> Sign out
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </Box>
        </AppBar>
      </Box>
      {isSidebarOpen ? <Sidebar /> : null}
      <Outlet />
    </>
  );
};

export default Header;
