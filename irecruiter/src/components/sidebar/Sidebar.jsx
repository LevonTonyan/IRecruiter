import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";


import { useNavigate } from "react-router-dom";

const Icons = [
  {

    text: "Dashboard",
    description: "icon",
    icon: DashboardIcon,
  },
  {

    text: "Clients",
    description: "icon",
    icon: GroupsIcon,
  },
  {

    text: "Jobs",
    description: "icon",
    icon: WorkIcon,
  },
  {

    text: "Candidates",
    description: "icon",
    icon: PeopleAltIcon,
  },
];

const DividerIcons = [
  {

    text: "Reports",
    description: "icon",
    icon: AssessmentIcon,
  },
  {

    text: "Placements",
    description: "icon",
    icon: HowToRegIcon,
  },
  {

    text: "Calendar",
    description: "icon",
    icon: EventNoteIcon,
  },
  {

    text: "Settings",
    description: "icon",
    icon: SettingsIcon,
  },
];

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});


const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const navigate = useNavigate();

  return (
    <React.Fragment>
     
      
      
        <Drawer variant="permanent" open={openDrawer}>
          <List sx={{ marginTop: "60px" }}>
            {Icons.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => navigate(`${item.text.toLowerCase()}`)}
                sx={{
                  paddingBottom: "1px",
                  paddingTop: "1px",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openDrawer ? "initial" : "center",
                    px: 2.5,
                    color: "#708090",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#4169E1",
                      minWidth: 0,
                      mr: openDrawer ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <div key={index}>
                      <item.icon />
                    </div>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: "14px" }}
                    sx={{ opacity: openDrawer ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {DividerIcons.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => navigate(`${item.text.toLowerCase()}`)}
                sx={{
                  paddingBottom: "1px",
                  paddingTop: "1px",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openDrawer ? "initial" : "center",
                    px: 2.5,
                    color: "#708090",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#4169E1",
                      minWidth: 0,
                      mr: openDrawer ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <div key={index}>
                      <item.icon />
                    </div>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: "14px" }}
                    sx={{ opacity: openDrawer ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
    

    </React.Fragment>
  );
}

export default Sidebar;
