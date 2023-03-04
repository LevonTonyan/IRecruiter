import "./DashboardStyles.css";
import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import CreateJob from "./CreateJob/CreateJob";
import { UserAuth } from "../../context/AuthContext";
import Loader from "./../loader/Loader";
import CreateClient from "./CreateClient/CreateClient";
import CandidateForm from "./CreateCandidateModal/CandidateForm/CandidateForm";
import { motion } from 'framer-motion'
import crCan from '../../images/createCandidates.png'
import crDep from '../../images/createDepartment.png';
import crJob from '../../images/createJob.png';


const boxAnimation = {
  hidden: {
    x: -100,
    opacity:0,
  },
  visible: custom => ({
    x: 0,
    opacity:1,
    transition:{delay:custom * 0.2}
  }),

}



const Dashboard = () => {
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showClientFormModal, setShowClientFormModal] = useState(false);
  const [showJobFormModal, setShowJobFormModal] = useState(false);
  const {currentUserData, settingUser, user, loading, isSidebarOpen } =
    UserAuth();

  /////////////HANDLING REFRESH TO RELOAD USER DETAILS///////////////////////
  useEffect(() => {
    if (Object.keys(user).length && !Object.keys(currentUserData).length) {
      settingUser(user.uid);
    }
  });

  /////////////CREATE CANDIDATE HANDLER////////////////////////

  const usersName =
    Object.keys(currentUserData).length && currentUserData["Candidate Name"];



  /////////////CREATE CANDIDATE HANDLER////////////////////////

  const createCandidate = () => {
    setShowCandidateModal((prev) => !prev);
  };

   /////////////CREATE CLIENT HANDLER////////////////////////
   const createClient = () => {
    setShowClientFormModal((prev) => !prev);
  };

  /////////////CREATE JOB HANDLER////////////////////////
  const createJob = () => {
    setShowJobFormModal((prev) => !prev);
  };

  ///////////////rendering Loader if still loadings
  if (loading) return <Loader />;

  return (
    <div
      className={
        isSidebarOpen ? "profile-container sideBarOpen" : "profile-container"
      }
    >
      {showCandidateModal && (
        <CandidateForm setShowCandidateFormModal={setShowCandidateModal} />
      )}
      {showClientFormModal && (
        <CreateClient setShowClientFormModal={setShowClientFormModal} />
      )}
      {showJobFormModal && (
        <CreateJob setShowJobFormModal={setShowJobFormModal} />
      )}

      <div>
        <div className="greething-username">Hello {usersName},</div>
        <div className="greething">
          <motion.span  animate={{fontSize:20} }>Here are three steps to get you started.</motion.span>
        </div>

        <div className="create-candidate-box-container">
          <motion.div className="box"
            onClick={createCandidate}
            initial={boxAnimation.hidden}
            animate={boxAnimation.visible}
            custom={3}
          >
            <div className="box-header">
              <img
                src={crCan}
                alt="na"
              />
            </div>
            <h4>Create a Candidate</h4>
            <span>
              Let's start by creating your
              <br /> first candidate.
            </span>
            <Box>
              <Button variant="contained" className="mui-btn" size="small">
                Create a Candidate
              </Button>
            </Box>
          </motion.div>

          <motion.div className="box" onClick={createClient}
        
            initial={boxAnimation.hidden}
            animate={boxAnimation.visible}
            custom={2}
          >
            <div className="box-header">
              <img
                src={crDep}
                alt="na"
              />
            </div>

            <h4>Create a Client</h4>

            <span>
              Clients host the different jobs under your agency's account.
            </span>
            <Box>
              <Button variant="contained" className="mui-btn" size="small">
                Create a Client
              </Button>
            </Box>
          </motion.div>

          <motion.div className="box" onClick={createJob}
               initial={boxAnimation.hidden}
               animate={boxAnimation.visible}
               custom={1}
          >
            <div className="box-header">
              <img
                src={crJob}
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
              <Button variant="contained" className="mui-btn" size="small">
                Create a Job
              </Button>
            </Box>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
