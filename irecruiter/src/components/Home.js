import React from 'react' 
import hr from '../images/hr.png'

function Home() {
  return (
    <div>
        <div className='container'>
            <h1>Recruiting software <br/> that helps you hire faster.</h1>
            <p className='homepagetext'> Recruitment website which will  help you to find top talents for your business,
               as well as the best job for your future career. </p>
            <div className='leftbuttons'>
              <a href='#signin' className='recruiterbutton'>Start as Recruiter</a>
              <a href='#signin' className='employeebutton'>Start as Employee</a>
            </div>
        </div>
        <img src={hr} alt='hr.png' className='main-picture'></img>

    </div>
  )
}

export default Home