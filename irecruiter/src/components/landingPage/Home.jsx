import './Landing.css'
import React from 'react' 
import hr from '../../images/hr.png'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
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
 

  const textAnimation = {
    hidden: {
      x: -200,
      opacity:0,
    },
    visible: custom =>( {
      x: 0,
      opacity: 1,
      transition:{delay:custom * 0.2}
    }),

  }




  return (
    <div className='allContainer'
    >
        <div className='container'>
        <motion.h1 
          initial={textAnimation.hidden}
          animate={textAnimation.visible}
          custom={1}
        >Recruiting software <br /> that helps you hire faster.</motion.h1>
        <motion.p
          initial={textAnimation.hidden}
          animate={textAnimation.visible}
          custom={2}
          className='homepagetext'> Recruitment website which will  help you to find top talents for your business,
               as well as the best job for your future career. </motion.p>
            <div className='leftbuttons'>
              <Link to='/signup' className='recruiterbutton'onClick={() => {setUserType("recruiter") }}>Start as Recruiter</Link>
          <Link to='/signup' className='employeebutton' onClick={() => {setUserType("employee") }}>Start as Employee</Link>
            </div>

            
        </div>
        
        

    </div>
  )
}

export default Home