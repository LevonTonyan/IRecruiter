import { ClickAwayListener } from "@mui/material";
import React from "react";
import "./CreateCandidateStyles.css";

const CreateCandidate = ({setShowCandidateModal}) => {
  return (
    <div className="modal">
      <ClickAwayListener onClickAway={() => setShowCandidateModal(false)}>

<div className="upload-box">
        <div className="upload-box-title">
          Create Candidate
        </div>

        <div className="box-container" >
          <div className="modal-box">
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
      </ClickAwayListener>
      
    </div>
  );
};

export default CreateCandidate;
