import { useState } from 'react'
import './ReposrtPageStyles.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { UserAuth } from '../../context/AuthContext';


function CandidatesCard(){
  return (
    <div className='card-layout'>
      <div className='card'>
        <div className='card-img'>
          <img src='https://app.manatal.com/img/candidates-one.44c46d67.svg' alt=''/>
        </div>
        <div className='card-text-wrap'>
          <div><h3>Candidates</h3></div>
          <div><p> View all reports related to your<br/> candidates.</p></div>
        </div>
        <div className='card-arrow'>
          <span className='arrow'><ArrowForwardIosIcon/></span>
        
        </div>
      </div>
    </div>
  )
}


function JobsCard(){
  return (
    <div className='card-layout'>
      <div className='card'>
        <div className='card-img'>
          <img src='https://app.manatal.com/img/jobs-one.71fff1c9.svg' alt=''/>
        </div>
        <div className='card-text-wrap'>
          <div><h3>Jobs</h3></div>
          <div><p>  View all reports related to your jobs.</p></div>
        </div>
        <div className='card-arrow'>
          <span className='arrow'><ArrowForwardIosIcon/></span>
        
        </div>
      </div>
    </div>
  )
}



function HiringPerformanceCard (){
  return (
    <div className='card-layout'>
      <div className='card'>
        <div className='card-img'>
          <img src='https://app.manatal.com/img/hiring-performance.a47ddc74.svg' alt=''/>
        </div>
        <div className='card-text-wrap'>
          <div><h3> Hiring Performance </h3></div>
          <div><p>View all reports related to your <br/>matches and hiring performance.</p></div>
        </div>
        <div className='card-arrow'>
          <span className='arrow'><ArrowForwardIosIcon/></span>
        
        </div>
      </div>
    </div>
  )
}


const ReportsPage = () => {
    const {isSidebarOpen} = UserAuth()


  return (
    <div className={isSidebarOpen?'main sideBarOpen':"main"}>
        <div className="reports-container">
          <CandidatesCard/>
          <HiringPerformanceCard/>
          <JobsCard/>
        </div>
    </div>
   
  );
};


export default ReportsPage;