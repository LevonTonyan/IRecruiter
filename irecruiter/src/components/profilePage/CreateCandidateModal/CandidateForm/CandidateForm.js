import "./CandidateForm.css"
import React, { useState } from 'react'
import Cities from "../../CreateJob/Cities.json"
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { db } from "../../../../db/firebase";
import { addDoc, collection } from "firebase/firestore";




function CandidateForm({setShowCandidateFormModal}) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
        "Candidate Name":"",
        "Candidate Phone Number":"",
        "Candidate Location":"",
        "Email Address":"",
        "Current Position":"",
        "Current Company":"",
        "Current salary":"",
        "Expected salary":"",
    },

    validationSchema: Yup.object({
        "Candidate Name": Yup.string().required("Necessary"),
        "Candidate Phone Number": Yup.string().required("Necessary").phone(null,true,'Invalid phone number'),
        "Candidate Location": Yup.string().required("Necessary"),
        "Email Address": Yup.string().email("Invalid email").required("Necessary"),
        "Current Position": Yup.string().required("Necessary"),
    }),  
    
    onSubmit: (values) => {
       createNewCandidate(values);
    },
    
  });

  const createNewCandidate = () => {
    addDoc(collection(db, "employee"), formik.values)
      .then(() => navigate("/candidates"))
      .catch((e) => setErrorMessage(e.message));
  };

  return (
    <div className="modal">
    <div className='candidate-form-main'>
        <div className='candidate-form-container'>
            <div className='candidate-form-title'>
            <h3>Create Form</h3>{" "}
            <button
            className="btn btn-close"
            onClick={() => setShowCandidateFormModal((prev) => !prev)}
          >
            X
          </button>
            </div>

            <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="input">
                <TextField
                    name="Candidate Name"
                    onChange={formik.handleChange}
                    value={formik.values["Candidate Name"]}
                    error={formik.errors["Candidate Name"] && true}
                    helperText={formik.errors["Candidate Name"]}
                    sx={{ width: "500px" }}
                    size="small"
                    label="Name*"
                    variant="outlined"
                />
                </div>

                <div className="input">
                <TextField
                    name="Candidate Phone Number"
                    onChange={formik.handleChange}
                    value={formik.values["Candidate Phone Number"]}
                    error={formik.errors["Candidate Phone Number"] && true}
                    helperText={formik.errors["Candidate Phone Number"]}
                    sx={{ width: "500px" }}
                    type="number"
                    size="small"
                    label="Phone Number"
                    variant="outlined"
                />
                </div>

                <div className="input">
                <TextField
                    name="Candidate Location"
                    onChange={formik.handleChange}
                    value={formik.values["Candidate Location"]}
                    error={formik.errors["Candidate Location"] && true}
                    helperText={formik.errors["Candidate Location"]}
                    sx={{ width: "500px" }}
                    size="small"
                    id="select"
                    select
                    label="Add Location*"
                    variant="outlined"
                >
                 {Cities.map(
                  (item, index) =>
                    item.population > 10000 && (
                      <MenuItem key={index} value={item.city}>
                        {item.city}
                      </MenuItem>
                    )
                )}
                </TextField>
                </div>

                <div className="input">
                <TextField
                    name="Email Address"
                    onChange={formik.handleChange}
                    value={formik.values["Email Address"]}
                    error={formik.errors["Email Address"] && true}
                    helperText={formik.errors["Email Address"]}
                    sx={{ width: "500px" }}
                    size="small"
                    label="Email Address*"
                    variant="outlined"
                />
                </div>

                <div className="input">
                <TextField
                    name="Current Position"
                    onChange={formik.handleChange}
                    value={formik.values["Current Position"]}
                    error={formik.errors["Current Position"] && true}
                    helperText={formik.errors["Current Position"]}
                    sx={{ width: "500px" }}
                    size="small"
                    label="Current Position*"
                    variant="outlined"
                />
                </div>

                <div className="input">
                <TextField
                    name="Current salary"
                    onChange={formik.handleChange}
                    value={formik.values["Current salary"]}
                    error={formik.errors["Current salary"] && true}
                    helperText={formik.errors["Current salary"]}
                    sx={{ width: "500px" }}
                    size="small"
                    type="number"
                    label="Current salary"
                    variant="outlined"
                />
                </div>

                <div className="input">
                <TextField
                    name="Expected salary"
                    onChange={formik.handleChange}
                    value={formik.values["Expected salary"]}
                    error={formik.errors["Expected salary"] && true}
                    helperText={formik.errors["Expected salary"]}
                    sx={{ width: "500px" }}
                    size="small"
                    type="number"
                    label="Expected salary"
                    variant="outlined"
                />
                </div>

                <div className="candidate-button">
              <Box sx={{ "& button": { m: 1 } }}>
                <Button
                  color="secondary"
                  onClick={() => setShowCandidateFormModal((prev) => !prev)}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  {" "}
                  Create
                </Button>
              </Box>
            </div>

            
            </form>
            </div>
            </div>                
        </div>
    </div>
  )
}

export default CandidateForm