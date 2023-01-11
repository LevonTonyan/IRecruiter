import "./Landing.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Button } from "@mui/material";


function Layout() {



  return (
    <>
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
                          Sign In
                          </Button>
            </Link>
          
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
