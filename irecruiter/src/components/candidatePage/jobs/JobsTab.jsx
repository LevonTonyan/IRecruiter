
import './BlankJobsPageStyles.css'
import React from 'react'

const JobsTab = () => {
  return (
    <div>
      <JobBlankPage/>
    </div>
  )
}

export default JobsTab

function JobBlankPage (){
  return (
    <div className='JobBlankPage-container'>
      <div className='content'>
         <div className='img-container'><img src='https://app.manatal.com/img/jobs.61ecfcaf.svg'alt=''/>
      </div>
      <div><h3>You have not created any jobs yet</h3>
      </div>
      <div><h4>A Job represents a new job opening, an open position or vacancy listing. Creating a job will allow you to start adding candidates to that job, publish the job onto your career page, post the job to job boards and much more.</h4></div>
        <div><button>+ Create Job</button></div>
        
      </div>
       
     </div>
  )
}
