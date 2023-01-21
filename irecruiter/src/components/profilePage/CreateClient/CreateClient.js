import { useFormik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import React, { useState } from 'react';
import "./CreateClient.css";
import Cities from "../CreateJob/Cities.json"
import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField, ClickAwayListener } from '@mui/material';
import { useNavigate } from 'react-router';
import { db } from "../../../db/firebase";
import { addDoc, collection } from "firebase/firestore";

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


function CreateClient({ setShowClientFormModal }) {
    const navigate = useNavigate();
   
    const [ErrorMessage, setErrorMessage]=useState("");
    

    const formik=useFormik({
        initialValues:{
            "Client Name":"",
            "Company Name":"",
            "Job Count":"",
            "Position Name":"",
            Location:"",
            Salary:"",
            "Job Stage":"",
        },

        validationSchema:Yup.object({
            "Client Name": Yup.string().required("Necessary"),
            "Company Name": Yup.string().required("Necessary"),
            "Position Name": Yup.string().required("Necessary"),
            Location: Yup.string().required("Necessary"),
            Salary: Yup.string().required("Necessary"),
        }),

        onSubmit: (values) => {
           createNewClient(values);
        },
    });

    const createNewClient = () => {
        addDoc(collection(db, "clients"), formik.values)
          .then(() => navigate("/clients"))
          .catch((e) => setErrorMessage(e.message));
      };

        return (
            <div className='modal'>
            <div className='client-main'>
                <div className='client-container'>
                <div className='client-title'>
                    <h3>Create Client</h3>{" "}
                    <button
                    className="btn btn-close"
                    onClick={() => setShowClientFormModal((prev) => !prev)}
                    >
                    X
                    </button>
                    </div>
                    <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="client-input">
                        <TextField
                            name="Client Name"
                            onChange={formik.handleChange}
                            value={formik.values["Client Name"]}
                            error={formik.errors["Client Name"] && true}
                            helperText={formik.errors["Client Name"]}
                            sx={{ width: "500px" }}
                            size="small"
                            label="Name*"
                            variant="outlined"
                        />
                        </div>

                        <div className="client-input">
                        <TextField
                            name="Company Name"
                            onChange={formik.handleChange}
                            value={formik.values["Company Name"]}
                            error={formik.errors["Company Name"] && true}
                            helperText={formik.errors["Company Name"]}
                            sx={{ width: "500px" }}
                            size="small"
                            label="Company Name*"
                            variant="outlined"
                        />
                        </div>

                        <div className="client-input">
                            <TextField
                            name="Job Count"
                            id="outlined-number"
                            label="Job Count"
                            type="number"
                            size="small"
                            sx={{ width: "500px" }}
                            onChange={formik.handleChange}
                            value={formik.values["Job Count"]}
                            error={formik.errors["Job Count"] && true}
                            />
                        </div>

                        <div className="client-input">
                            <TextField
                                name="Position Name"
                                onChange={formik.handleChange}
                                value={formik.values["Position Name"]}
                                error={formik.errors["Position Name"] && true}
                                helperText={formik.errors["Position Name"]}
                                sx={{ width: "500px" }}
                                size="small"
                                label="Position name*"
                                variant="outlined"
                            />
                        </div>

                        <div className="client-location">
                            <TextField
                                id="select"
                                select
                                name="Location"
                                value={formik.values["Location"]}
                                onChange={formik.handleChange}
                                error={formik.errors["Location"] && true}
                                helperText={formik.errors["Location"]}
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

                        <div className="client-salary">
                            <TextField
                            name="Salary"
                            id="outlined-number"
                            label="Salary"
                            type="number"
                            size="small"
                            sx={{ width: "500px" }}
                            onChange={formik.handleChange}
                            value={formik.values.Salary}
                            error={formik.errors.Salary && true}
                            />
                        </div>

                        <div className="client-input">
                            <TextField
                                name="Job Stage"
                                onChange={formik.handleChange}
                                value={formik.values["Job Stage"]}
                                error={formik.errors["Job Stage"] && true}
                                helperText={formik.errors["Job Stage"]}
                                sx={{ width: "500px" }}
                                size="small"
                                select
                                label="Job Stage"
                                variant="outlined"
                            >
                                <MenuItem value="open">open</MenuItem>
                                <MenuItem value="close">close</MenuItem>
                            </TextField>
                        </div>

                    <div className="client-button">
                        <Box sx={{ "& button": { m: 1 } }}>
                        <Button
                            color="secondary"
                            onClick={() => setShowClientFormModal((prev) => !prev)}
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

export default CreateClient