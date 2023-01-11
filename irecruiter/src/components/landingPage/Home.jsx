import './Landing.css'
import React from 'react' 
import hr from '../../images/hr.png'
import { Link,useNavigate } from 'react-router-dom'

import { UserAuth } from '../../context/AuthContext'
import {useEffect} from 'react'

function Home() {

  const { user, setUserType } = UserAuth() 
  const navigate = useNavigate()
 const isLoggedIn = user && Object.keys(user).length

  /////IF LOGGEDIN REDIRECT TO DASHBOARD/////////////
  useEffect(() => { 
    if (isLoggedIn) { 
      navigate('/dashboard')
    }
  },[])
 

  return (
    <div className='allContainer'>
        <div className='container'>
            <h1>Recruiting software <br/> that helps you hire faster.</h1>
            <p className='homepagetext'> Recruitment website which will  help you to find top talents for your business,
               as well as the best job for your future career. </p>
            <div className='leftbuttons'>
              <Link to='/signup' className='recruiterbutton'onClick={() => {setUserType("recruiter") }}>Start as Recruiter</Link>
          <Link to='/signup' className='employeebutton' onClick={() => {setUserType("employee") }}>Start as Employee</Link>
            </div>

            
        </div>
        <img src={hr} alt='hr.png' className='main-picture'></img>
        

    </div>
  )
}

export default Home