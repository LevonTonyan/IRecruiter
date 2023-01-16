import React, { useEffect } from "react";
import './DashboardStyles.css'
import { Box, Button } from "@mui/material";
import { useState } from 'react';
import CreateCandidate from "./CreateCandidateModal/CreateCandidate";
import CreateJob from "./CreateJob/CreateJob";
import { UserAuth } from "../../context/AuthContext";
import Loader from './../loader/Loader';


const Dashboard = () => {
  const [showCandidateModal, setShowCandidateModal] = useState(false)
    
  const [showJobFormModal, setShowJobFormModal]=useState (false) 
  const { currentUserData, settingUser, user, loading,isSidebarOpen } = UserAuth()



  /////////////HANDLING REFRESH TO RELOAD USER DETAILS///////////////////////
  useEffect(() => { 
    if (Object.keys(user).length && !Object.keys(currentUserData).length) { 
      settingUser(user.uid)
    }
  })


  /////////////CREATE CANDIDATE HANDLER////////////////////////
  const usersName = Object.keys(currentUserData).length&&currentUserData["Candidate Name"]

  // if (showModal) return (<CreateCandidate setShowModal={setShowModal} />)
  // if (showForm) return (<CreateJob setShowForm={setShowForm} />)



  /////////////CREATE CANDIDATE HANDLER////////////////////////
  const createCandidate = () => { 
    setShowCandidateModal((prev) => !prev)
  } 


  /////////////CREATE JOB HANDLER////////////////////////
  const createJob =()=>{
    setShowJobFormModal((prev) => !prev)
  }  
  

///////////////rendering Loader if still loadings
  if (loading) return <Loader />
  

  return (
    <div className={isSidebarOpen?"profile-container sideBarOpen":'profile-container'}>
      {showCandidateModal&&<CreateCandidate setShowCandidateModal={setShowCandidateModal}/>}
      {showJobFormModal&&<CreateJob setShowJobFormModal={setShowJobFormModal}/>}

      <div>
    <div className="greething-username">Hello {usersName},</div>
        <div className="greething">
          Here are three steps to get you started.
        </div>
      
      <div className="create-candidate-box-container">
        <div className="box" onClick={createCandidate}>
          <div>
            <img
              src="https://app.manatal.com/img/createCandidates.0cff4784.png"
              alt="na"
            />
          </div>
          <h4>Create a Candidate</h4>
          <span>
            Let's start by creating your
            <br /> first candidate.
          </span>
          <Box>
            <Button variant="contained"
              className="mui-btn"
              size="small">Create a Candidate
            </Button>
          </Box>
        </div>

        <div className="box">
          <div>
            <img
              src="https://app.manatal.com/img/createDepartment.a226c27a.png"
              alt="na"
            />
          </div>

          <h4>Create a Client</h4>

          <span>
            Clients host the different jobs under your agency's account.
          </span>
          <Box>
            <Button variant="contained"
              className="mui-btn"
              size="small">Create a Candidate
            </Button>
          </Box>
        </div>

        <div className="box" onClick={createJob}>
          <div>
            <img
              src="https://app.manatal.com/img/createJob.9530d415.png"
              alt="na"
            />
          </div>

          <h4>Create a Job</h4>

          <span>
            A new position opened up?
            <br />
            Let's add it to the job list.
          </span>
          <Box>
            <Button variant="contained"
              className="mui-btn"
              size="small">Create a Candidate
            </Button>
          </Box>
        </div>
      </div>
    </div>
      
      
    </div>
  );
};

export default Dashboard;
