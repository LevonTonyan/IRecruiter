import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserAuth } from "../../context/AuthContext";
import { useState } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import "yup-phone";
import { doc, updateDoc  } from "firebase/firestore";
import { db } from '../../db/firebase';
import { getAuth, updateEmail, updatePassword} from "firebase/auth";






function Settings(path) {
  const auth = getAuth();
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const { currentUserData,  user,settingUser } = UserAuth()
  

  let changing = path.prop
 
  function ButtonWrapper() {

    const context = useFormikContext()


    function updateUserProfilePassword(newPass) { 
      const user = auth.currentUser;
      const newPassword = newPass
      updatePassword(user, newPassword)
        .then(() => setMessage(`password has been successfully changed`))
        .catch((e) => setMessage(e))
      .then(() => settingUser(user.uid))
      .then(()=> navigate('/settings'))
      
    }

    function updateUserProfile(target, value) { 
        const profileRef = doc(db, currentUserData.type, user.uid);
        updateDoc(profileRef, {
          [target]: value
        }).then(() => setMessage(`${target} has been successfully changed`))
        .catch((e) => setMessage(e))
          .then(() => settingUser(user.uid))
          .then(()=> navigate('/settings'))
         
    }

    function updateUserProfileEmail(newEmail) { 
      updateEmail(auth.currentUser, newEmail)
        .then(() => setMessage(`email hase been successfully changed`))
        .catch((e) => setMessage(e))
      .then(() => settingUser(user.uid))
      .then(()=> navigate('/settings'))
    
    }


    function handleChange() {
      const target = Object.keys(context.values)[0];
      const value = Object.values(context.values)[0];
      switch (target) {
        case "Candidate Name":
          updateUserProfile(target, value);
          break;
          case "phone":
            updateUserProfile(target, value);
            break;
        case "email":
          updateUserProfileEmail(value);
          break;
        case "password":
          updateUserProfilePassword(value);
          break;
        default:
          return;
      }
    }
    

  
  
    return (<Button
      sx={{
        width: "100px",
        borderRadius: "5px",
        float: 'right'
      }}
      variant="contained"
      color="primary"
      disabled={!context.isValid}
      onClick = {handleChange}> Change </Button>
      )}


  function TextFieldWrapper({ ...props }) {
    const [field, mata] = useField(props.name);

    if (mata && mata.touched && mata.error) {
      field.error = true;
      field.helperText = mata.error;
    }
    return <TextField {...props} {...field} />;
  }


  return (
    <div >
      
      <div className='route'>
        <div className='inputWrapper'>

          <div className='textWrapper'><h4>Enter new {changing}</h4></div>
          <Formik
            initialValues={changing === 'full name' ? {
              'Candidate Name': "",
            } : changing === 'email' ? { email: '', } : changing === 'phone number' ? { phone: '' } : { password: '', }}

            validationSchema={
              changing === 'full name' ? yup.object().shape({
                'Candidate Name': yup.string().required("Necessary"),
              }) :
                changing === 'email' ? yup.object().shape({
                  email: yup.string().email("Invalid email").required("Necessary"),
                }) :
                  changing === 'phone number' ? yup.object().shape({
                    phone: yup.string()
                      .required('Neccessary')
                      .phone(null, true, 'invalid phone number')
                    ,
                  }) :
                    yup.object().shape({
                      password: yup.string().min(6).required("Necessary"),
                    })
            }
            validateOnMount

          >

            <Form>
              <div className='textFieldWrapper'>
                <div style={{"alignItems":'center'}}><span style={{'color':'green'}}>{message}</span></div>  
                <TextFieldWrapper
                name={changing === 'full name' ? 'Candidate Name' : changing === 'email' ? 'email' : changing === 'phone number' ? 'phone' : 'password'}
                fullWidth
                size="small"
                className="outlined-basic"
                label=""
                variant="outlined" /></div>
                
              <div className='buttonWrapperChange' > <ButtonWrapper
              /></div>

              <div className='buttonWrapperDiscart'> <Button
                sx={{
                  width: "100px",
                  borderRadius: "5px",
                  float: 'right'
                }}
                variant="contained"
                color="primary"
                onClick={() => navigate('/settings')}
              >
                Discart
              </Button></div>
            </Form>
          </Formik>

        </div>

      </div>
    </div>
  )
}

export default Settings