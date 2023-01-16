import "./CreateJob.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import Cities from "./Cities.json";
import { db } from "../../../db/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

function CreateJob({ setShowJobFormModal }) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [ErrorMessage, setErrorMessage] = useState("");
  const [remote, setRemote] = useState(false);

  const formik = useFormik({
    initialValues: {
      Category: "",
      "Position Name": "",
      Client: "",
      Location: "",
      remote: null,
      "Contract Details": "",
      MinSalary: "",
      MaxSalary: "",
      "Job Description": "",
    },

    validationSchema: Yup.object({
      Category: Yup.string().required("Necessary"),
      "Position Name": Yup.string().required("Necessary"),
      Client: Yup.string().required("Necessary"),
      Location: Yup.string().required("Necessary"),
    }),

    onSubmit: (values) => {
      createNewJob(values);
    },
  });

  const createNewJob = () => {
    addDoc(collection(db, "jobs"), formik.values)
      .then(() => navigate("/jobs"))
      .catch((e) => setErrorMessage(e.message));
  };

  return (
    <div className="job-modal">
      <div className="job-main">
        <div className="job-container">
          <div className="job-title">
            <h3>Create Job</h3>{" "}
            <button
              className="btn btn-close"
              onClick={() => setShowJobFormModal((prev) => !prev)}
            >
              X
            </button>
          </div>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="job-input">
                <TextField
                  name="catagory"
                  onChange={formik.handleChange}
                  value={formik.values.catagory}
                  error={formik.errors.catagory && true}
                  helperText={formik.errors.catagory}
                  sx={{ width: "500px" }}
                  size="small"
                  label="Catagory*"
                  variant="outlined"
                />
              </div>

              <div className="job-input">
                <TextField
                  name="positionName"
                  onChange={formik.handleChange}
                  value={formik.values.positionName}
                  error={formik.errors.positionName && true}
                  helperText={formik.errors.positionName}
                  sx={{ width: "500px" }}
                  size="small"
                  label="Position name*"
                  variant="outlined"
                />
              </div>

              <div className="job-input">
                <TextField
                  id="select"
                  name="selectClient"
                  value={formik.values.selectClient}
                  onChange={formik.handleChange}
                  error={formik.errors.selectClient && true}
                  helperText={formik.errors.selectClient}
                  label="Select client"
                  select
                  sx={{ width: "500px" }}
                  size="small"
                >
                  <MenuItem value="ServiceTitan">ServiceTitan</MenuItem>
                  <MenuItem value="Digitain">Digitain</MenuItem>
                  <MenuItem value="SoftConstruct">SoftConstruct</MenuItem>
                  <MenuItem value="Krisp">Krisp</MenuItem>
                  <MenuItem value="Renderforest">Renderforest</MenuItem>
                </TextField>
              </div>

              <div className="job-location">
                <TextField
                  id="select"
                  select
                  name="addLocation"
                  value={formik.values.addLocation}
                  onChange={formik.handleChange}
                  error={formik.errors.addLocation && true}
                  helperText={formik.errors.addLocation}
                  label="Add location"
                  sx={{ width: "300px" }}
                  size="small"
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
                <FormControlLabel
                  control={<Checkbox />}
                  sx={{ mr: 13 }}
                  label="Remote"
                />
              </div>

              <div className="job-input">
                <TextField
                  name="contractDetails"
                  onChange={formik.handleChange}
                  value={formik.values.contractDetails}
                  error={formik.errors.contractDetails && true}
                  helperText={formik.errors.contractDetails}
                  sx={{ width: "500px" }}
                  size="small"
                  select
                  label="Contract details (full time/ part time)"
                  variant="outlined"
                >
                  <MenuItem value="full time">full time</MenuItem>
                  <MenuItem value="part time">part time</MenuItem>
                </TextField>
              </div>

              <div className="job-salary">
                <TextField
                  name="minSalary"
                  id="outlined-number"
                  label="Add minimum salary"
                  type="number"
                  size="small"
                  sx={{ width: "250px" }}
                  onChange={formik.handleChange}
                  value={formik.values.minSalary}
                  error={formik.errors.minSalary && true}
                />
                <TextField
                  name="maxSalary"
                  id="outlined-number"
                  label="Add maximum salary"
                  type="number"
                  size="small"
                  sx={{ width: "250px" }}
                  onChange={formik.handleChange}
                  value={formik.values.maxSalary}
                  error={formik.errors.maxSalary && true}
                />
              </div>
              <div className="job-input">
                <TextField
                  name="jobDescription"
                  id="outlined-multiline-static"
                  label="Job description*"
                  multiline
                  sx={{ width: "500px" }}
                  rows={2}
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.jobDescription}
                  error={formik.errors.jobDescription && true}
                  helperText={formik.errors.jobDescription}
                />
              </div>

              <div className="job-button">
                <Box sx={{ "& button": { m: 1 } }}>
                  <Button
                    color="secondary"
                    onClick={() => setShowJobFormModal((prev) => !prev)}
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

          <div className="job-salary">
            <TextField
              name="MinSalary"
              id="outlined-number"
              label="Add minimum salary"
              type="number"
              size="small"
              sx={{ width: "250px" }}
              onChange={formik.handleChange}
              value={formik.values.MinSalary}
              error={formik.errors.MinSalary && true}
            />
            <TextField
              name="MaxSalary"
              id="outlined-number"
              label="Add maximum salary"
              type="number"
              size="small"
              sx={{ width: "250px" }}
              onChange={formik.handleChange}
              value={formik.values.MaxSalary}
              error={formik.errors.MaxSalary && true}
            />
          </div>
          <div className="job-input">
            <TextField
              name="Job Description"
              id="outlined-multiline-static"
              label="Job description*"
              multiline
              sx={{ width: "500px" }}
              rows={2}
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values["Job Description"]}
              error={formik.errors["Job Description"] && true}
              helperText={formik.errors["Job Description"]}
            />
          </div>

          <div className="job-button">
            <Box sx={{ "& button": { m: 1 } }}>
              <Button
                color="secondary"
                onClick={() => setShowForm((prev) => !prev)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                {" "}
                Create
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
