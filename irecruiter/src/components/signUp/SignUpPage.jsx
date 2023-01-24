import HandshakeIcon from "@mui/icons-material/Handshake";
import TextField from "@mui/material/TextField";
import "./SignUpStyles.css";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as yup from "yup";
import "yup-phone"
import { UserAuth } from "../../context/AuthContext"; 
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { db } from "../../db/firebase";
import { doc, setDoc } from "firebase/firestore"; 


function SignUp() {
  
  const { createUser, setUserType, userType, settingUser, currentUserData } = UserAuth()
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const changeUserType = (event) => {
    setUserType(event.target.value);
  };

  function TextFieldWrapper({ ...props }) {
    const [field, mata] = useField(props.name);

    if (mata && mata.touched && mata.error) {
      field.error = true;
      field.helperText = mata.error;
    }
    return <TextField {...props} {...field} />;
  }

  function ButtonWrapper() {
    const context = useFormikContext();
    context.values.userType = userType;
    return (
      <Button
        onClick={() => createNewUser(context.values)}
        sx={{
          width: "300px",
          borderRadius: "20px",
        }}
        variant="contained"
        color="primary"
        disabled = {!context.isValid}
      >
        {" "}
        SIGN UP
      </Button>
    );
  }

  function Organisation(){
    if(userType === 'recruiter') return(
      <div className="input">
                <TextFieldWrapper
                  name="organisation"
                  sx={{ width: "500px" }}
                  size="small"
                  className="outlined-basic"
                  label="Organisation*"
                  variant="outlined"
                />
              </div>
    )
  }


  const createNewUser = (data) => {
    if (!data.name || !data.phoneNumber) {
      console.log(data.name, data.phoneNumber);
      setError("All fields marked * should be filled up");
      return;
    }

    createUser(data.email, data.password)
      .then((cred) => {
        let object =
          userType === "employee"
            ? {
                "Candidate Name":
                  data.name[0].toUpperCase() + data.name.slice(1),
                "Candidate Phone Number": data.phoneNumber,
                Diploma: null,
                University: null,
                "Current Company": null,
                Gender: null,
                Birthdate: null,
                "Candidate Address": null,
                "Candidate Location": null,
                expectedSalary: null,
                createdBy: cred.user.uid,
                id: cred.user.uid,
                created: new Date().toLocaleString(),
                location: null,
                skills: [],
                jobs: [],
                type: userType,
              }
            : {
                "Candidate Name":data.name[0].toUpperCase() + data.name.slice(1),
                "Candidate Phone Number": data.phoneNumber,
                organisation: data.organisation,
                type: userType,
              };
        setDoc(doc(db, userType, cred.user.uid), object);
        return cred.user.uid;
      })
      .then((id) => settingUser(id))
      .then(() => navigate(userType === "recruiter" ? "/dashboard" : "/jobs"))
      .catch((e) => setError(e.message));
  };


  
  
  return (
    <div className="main">
       <div className="signup-container">
        <div className="logo">
          <Link to='/'><HandshakeIcon
            sx={{ width: "80px", height: "80px" }}
            color="primary"
          /></Link>
          <p>IRecruiter</p>
        </div>
        <div>
          <Formik
          validateOnMount
            initialValues={{
              name: "",
              organisation:"",
              phoneNumber: "",
              email: "",
              password: "",
            }}
            validationSchema={
              userType === 'recruiter'?
              yup.object().shape({
              name: yup.string().required("Necessary"),
              organisation: yup.string().required("Necessary"),
              phoneNumber: yup.string().required("Necessary").phone(null,true,'Invalid phone number'),
              email: yup.string().email("Invalid email").required("Necessary"),
              password: yup.string().min(6).required("Necessary"),
            }):
            yup.object().shape({
              name: yup.string().required("Necessary"),
              phoneNumber: yup.string().required("Necessary").phone(null,true,'Invalid phone number'),
              email: yup.string().email("Invalid email").required("Necessary"),
              password: yup.string().min(6).required("Necessary"),
            })
          }
          >
            <Form>
              <div className="input">
                <TextFieldWrapper
                  name="name"
                  sx={{ width: "500px" }}
                  size="small"
                  className="outlined-basic"
                  label="Name*"
                  variant="outlined"
                />
              </div>
              <div className="input">
                <div className="checkBox">
                  <p style={{ opacity: 0.7 }}>I am a *</p>

                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="recruiter"
                      control={<Radio />}
                      label="Recruiter"
                      checked={userType === "recruiter"}
                      onChange={changeUserType}
                    />

                    <FormControlLabel
                      value="employee"
                      control={<Radio />}
                      label="Employee"
                      checked={userType === "employee"}
                      onChange={changeUserType}
                    />
                  </RadioGroup>
                </div>
              </div>

              <Organisation/>

              <div className="input">
                <TextFieldWrapper
                  name="phoneNumber"
                  sx={{ width: "500px" }}
                  size="small"
                  className="outlined-basic"
                  label="Phone Number*"
                  variant="outlined"
                />
              </div>

              <div className="input">
                <TextFieldWrapper
                  name="email"
                  sx={{ width: "500px" }}
                  size="small"
                  className="outlined-basic"
                  label="Email Address*"
                  variant="outlined"
                />
              </div>

              <div className="input">
                <TextFieldWrapper
                  name="password"
                  sx={{ width: "500px" }}
                  size="small"
                  className="outlined-password-input"
                  label="Password*"
                  type="password"
                  autoComplete="current-password"
                />
              </div>

              <ButtonWrapper />
            </Form>
          </Formik>
          <div className="input" style={{ marginButtom: "40px" }}></div>
        </div>
            <div style={{color:"red"}}>{error}</div>
        <div className="input">
          
          <p>Already have an account?</p>
          <Link to="/login" style={{margin:"15px 0 0 3px"}}>Login</Link>
        </div>
      </div>
    </div>
     
   
  );
}

export default SignUp;