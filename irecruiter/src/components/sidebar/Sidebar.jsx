import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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
import { UserAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import uuid from "react-uuid";

const IconsForEmployee = [
  {
    text: "Dashboard",
    description: "icon",
    icon: DashboardIcon,
  },
  {
    text: "Companies",
    description: "icon",
    icon: GroupsIcon,
  },
  {
    text: "Jobs",
    description: "icon",
    icon: WorkIcon,
  },
];
const DividerIconsForEmployee = [
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

const IconsForRecruiter = [
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

const DividerIconsForRecruiter = [
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

const drawerWidth = 190;

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
  const { currentUserData, recentlyVisited } = UserAuth();
  const openDrawer = true;
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Drawer variant="permanent" open={true}>
        <List sx={{ marginTop: "60px" }}>
          {(currentUserData.type === "recruiter"
            ? IconsForRecruiter
            : IconsForEmployee
          ).map((item, index) => (
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
                  minHeight: 20,
                  justifyContent: openDrawer ? "initial" : "center",
                  px: 1.5,
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
          {(currentUserData.type === "recruiter"
            ? DividerIconsForRecruiter
            : DividerIconsForEmployee
          ).map((item, index) => (
            <ListItem
              key={index}
              onClick={() => navigate(`/${item.text.toLowerCase()}`)}
              sx={{
                paddingBottom: "1px",
                paddingTop: "1px",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 20,
                  justifyContent: openDrawer ? "initial" : "center",
                  px: 1.5,
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
        <h5>Recently visited</h5>
        {recentlyVisited.length &&
          recentlyVisited.map((el) => (
            <div style={{ fontSize: "10px", margin: "5px auto" }} key={uuid()}>
              {" "}
              <Link key={uuid()} to={el}>
                {el?.slice(1)[0].toUpperCase() + el.slice(2)}
              </Link>
            </div>
          ))}
      </Drawer>
    </React.Fragment>
  );
}

export default Sidebar;
