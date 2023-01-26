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
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

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
      .then(() => setShowJobFormModal(false))
      .catch((e) => setErrorMessage(e.message));
  };

  return (

    <div className="modal">
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
                name="Category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Category}
                sx={{ width: "500px" }}
                size="small"
                label="Category*"
                variant="outlined"
              />
            </div>
            {formik.errors.Category && formik.touched.Category ?<p className="job-error">{formik.errors.Category}</p>:null}


            <div className="job-input">
              <TextField
                name="Position Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values["Position Name"]}
                sx={{ width: "500px" }}
                size="small"
                label="Position name*"
                variant="outlined"
              />
            </div>
            {formik.errors["Position Name"] && formik.touched["Position Name"] ?<p className="job-error">{formik.errors["Position Name"]}</p>:null}

            <div className="job-input">
              <TextField
                id="select"
                name="Client"
                value={formik.values.Client}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            {formik.errors.Client && formik.touched.Client ?<p className="job-error">{formik.errors.Client}</p>:null}

            <div className="job-location">
              <TextField
                id="select"
                select
                name="Location"
                value={formik.values["Location"]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            {formik.errors["Location"] && formik.touched["Location"] ?<p className="job-error">{formik.errors["Location"]}</p>:null}

            <div className="job-input">
              <TextField
                name="Contract Details"
                onChange={formik.handleChange}
                value={formik.values["Contract Details"]}
                error={formik.errors["Contract Details"] && true}
                helperText={formik.errors["Contract Details"]}
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
      </div>
    </div>
    </div>
  );
}

export default CreateJob
