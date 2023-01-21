import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import Loader from "../../loader/Loader";
import CandidateForm from "./CandidateForm/CandidateForm";
import "./CreateCandidateStyles.css";


const CreateCandidate = ({setShowCreateMd}) => {
  const [showCandidateFormModal, setShowCandidateFormModal] = useState(false);
  const { loading} = UserAuth();

  
  const candidateForm = () => {
    setShowCandidateFormModal((prev) => !prev);  
  };

  if (loading) return <Loader/>;

  return (
    <div>
    <div className="modal">
      

    <div className="upload-box">
        <div className="upload-box-title">
          Create Candidate
          <button
              className="btn btn-close"
              onClick={() => setShowCreateMd((prev) => !prev)}
            >
              X
            </button>
        </div>
  
        
        {showCandidateFormModal && (
        <CandidateForm setShowCandidateFormModal={setShowCandidateFormModal} />
          )}
        <div className="box-container">
          <div className="modal-box" onClick={candidateForm}>
            <div className="image-title-container">
              <img
                src="https://app.manatal.com/img/create-candidate-form.2e829055.svg"
                alt="na"
              />
              <h6>Complete a Form</h6>
            </div>
          </div>

          <div className="modal-box" >
            <div className="image-title-container">
              <img
                src="https://app.manatal.com/img/create-candidate-resume.60d676d2.svg"
                alt="na"
              />
              <h6>Upload a Resume</h6>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      </div>
    </div>
  );
};

export default CreateCandidate;
