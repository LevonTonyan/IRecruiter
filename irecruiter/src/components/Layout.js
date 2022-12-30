import React from 'react'
import logo from '../images/logo.png'
import { Outlet, Link } from 'react-router-dom'


function Layout() {
  return (
    <>
        <nav className='navbar'>
            <ul className='navlink'>
            <img src={logo} alt='logo.png' className='logo'></img>
            
            <Link style={{textDecoration: 'none'}} 
                to='/home'>Home</Link>
            
            <Link style={{textDecoration: 'none'}} 
                to='/about'>About</Link> 
              
            <Link style={{textDecoration: 'none'}}
                to='/contact'>Contact</Link>    
            <a href='#signin' className='button'>Sign In</a>
            </ul>
        </nav>
        <Outlet/>
    </>
  )
}

export default Layout