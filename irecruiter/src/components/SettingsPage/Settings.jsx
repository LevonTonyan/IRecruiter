import Header from '../header/Header'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import "yup-phone";

function Settings(path) {

  const navigate = useNavigate()

  const { currentUserData, settingUser, user } = UserAuth()
  useEffect(() => {
    if (Object.keys(user).length && !Object.keys(currentUserData).length) {
      settingUser(user.uid)
    }
  })

  

  let changing = path.prop
 
  function ButtonWrapper() {

    const context = useFormikContext()

function Click(){
  changing === 'full name' ? alert('full name is  ' + context.values.name ) :
  changing === 'email' ? alert('email is  ' + context.values.email ):
  changing === 'phone number' ? alert('phone number is  ' + context.values.phoneNumber):
  alert('password is  ' +context.values.password)
  
  return navigate('/settings')
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
      onClick = {() => Click()}> Change </Button>
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
    <div> <Header />
      <div className='route'>
        <div className='inputWrapper'>

          <div className='textWrapper'><h4>Enter new {changing}</h4></div>
          <Formik
            initialValues={changing === 'full name' ? {
              name: "",
            } : changing === 'email' ? { email: '', } : changing === 'phone number' ? { phoneNumber: '' } : { password: '', }}

            validationSchema={
              changing === 'full name' ? yup.object().shape({
                name: yup.string().required("Necessary"),
              }) :
                changing === 'email' ? yup.object().shape({
                  email: yup.string().email("Invalid email").required("Necessary"),
                }) :
                  changing === 'phone number' ? yup.object().shape({
                    phoneNumber: yup.string()
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
              <div className='textFieldWrapper'><TextFieldWrapper
                name={changing === 'full name' ? 'name' : changing === 'email' ? 'email' : changing === 'phone number' ? 'phoneNumber' : 'password'}
                fullWidth
                size="small"
                className="outlined-basic"
                label=""
                variant="outlined" /></div>

              <div className='buttonWrapperChange'> <ButtonWrapper
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