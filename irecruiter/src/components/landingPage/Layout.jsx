import "./Landing.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Button } from "@mui/material";


function Layout() {



  return (
    <div>
      <nav className="landing-navbar">
        <div className="navbar-logo">
          <Link to="/">
            <HandshakeIcon
              sx={{ width: "60px",height: "80px" }}
              color="primary"
            />
          </Link>
        </div>
        <div className="navlink">
         
            <Link  to="/home">
              Home
            </Link>

            <Link  to="/about">
              About
            </Link>

            <Link to="/contact">
              Contact
            </Link>
            <Link to="login" >
                          <Button variant="contained" sx={{backgroundColor:"#1ebd53"}}>
                          Log In
                          </Button>
            </Link>
          
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
