import {
   Box, Divider, IconButton, Toolbar
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HelpIcon from "@mui/icons-material/Help";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./HeaderStyles.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));








const Header = ({ setShowSignOutDrop, showSignOutDrop }) => {
 

  const [openDrawer, setOpenDrawer] = useState(false)  
  const { logout, currentUserData, settingUser, user, setIsSidebarOpen } = UserAuth()

  const navigate = useNavigate()
  const usersName = Object.keys(currentUserData).length && currentUserData['Candidate Name'][0];
  const organisation = Object.keys(currentUserData).length ? currentUserData.organisation : "Self-employed"
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)


  const handleClose = () => { 
    setAnchorEl(null)
  }

  const handleClick = (e) => { 
    setAnchorEl(e.currentTarget)
  }

  /////////////HANDLING REFRESH TO RELOAD USER DETAILS///////////////////////
  useEffect(() => { 
    if (Object.keys(user).length && !Object.keys(currentUserData).length) { 
      settingUser(user.uid)
    }
  })



const handleLogout = async () => {
  try { 
    await logout()
    navigate('/login')
  } catch(e) {
    console.log(e.message)
   }
  }
  
  const styles = {
    menuItem: {
      height: "25px",
      fontSize: 15,
    },
    menuIcon: {
      marginRight: "10px",
      fontSize: 20
    }  
  }
    
  
return (
  <>
   <Box>
    <AppBar position="sticky">
      <Box className="navbar">
        <Toolbar className="toolbar">
          <div>
              <IconButton onClick={() => {
                setOpenDrawer(prev => !prev)
                setIsSidebarOpen(prev => !prev)
              }}>
                <MenuIcon fontSize="large" sx={{ color: "white" }} />
                        </IconButton>
                        <span><Link to="/dashboard
                        "className="home_link">{organisation}</Link></span>
                    </div>
                 
          <input
            className="search_input"
            type="text"
            placeholder="Search by Name, Job, Email or Client"
          ></input>
          <div>
            <IconButton>
              <AddCircleIcon sx={{ color: "white" }} />
            </IconButton>
            {/* <IconButton className="help_icon">
              <HelpIcon sx={{ color: "white"}} />
            </IconButton> */}
              <div className="cont"
                id='avatar-btn'
                onClick={handleClick}
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open?true:undefined}
              >
                
                <div className="user_avatar" >{usersName[0]}</div>
            </div>
              <Menu id='menu'
                
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{'aria-labelledby':'avatar-btn'}}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Link to='settings'>
                <MenuItem sx={styles.menuItem} divider alignitems='true'>
                  <SettingsIcon sx={styles.menuIcon}/>Settings</MenuItem>
                </Link> 
                
                <MenuItem onClick={handleLogout} sx={styles.menuItem}>
                  <PowerSettingsNewIcon sx={styles.menuIcon} /> Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Box>
    </AppBar>
    </Box>
    {openDrawer?<Sidebar/>:null}
  <Outlet/>
  </>
 
);
};

export default Header;
