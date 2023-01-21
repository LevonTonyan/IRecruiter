
import './SettingsPage.css'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Link } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";
import { useState } from 'react';
import defAvatar from '../../images/defAvatar.png'
import { getAuth, updateProfile } from "firebase/auth";
import { Button } from '@mui/material';




function SettingsPage() {

  const { currentUserData, user, isSidebarOpen, upload } = UserAuth()

  const [photo, setPhoto] = useState(null)


const owner = {
  image:'https://cdn-icons-png.flaticon.com/512/2521/2521826.png',
  fullName:currentUserData['Candidate Name'],
  email:user.email,
  phoneNumber: currentUserData.phone,
  photoURL:user.photoURL?user.photoURL:defAvatar
  }
  
  const handleChange = (e) => { 
    if(e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }

  function handleUpload() {
    upload(photo, user)
    setPhoto(null)
  }


  return (
    <div >
      <div className = {isSidebarOpen?"wrapper sideBarOpen":"wrapper"} >
    <div className='changes'>
      <div style={{margin:"40px"}}>
        <h2> Profile</h2>
        <p className='p'> Manage your user profile and contact details. Changes will affect how other users see you within IRecuiter. </p>
      </div>
      <div className='ProfilePicture' >
            <div className='command-info'> Profile picture
            <input accept="image/*" type="file" onChange={handleChange}/>
            </div>
            
            <div className='user-info'>
            <Button  variant='contained' disabled={photo?false:true} size ='small' onClick={handleUpload}>upload</Button>
           
            </div>
            
             
              
        
      </div>
      <Link to = 'fullName' >
      <div className='chenge' >
        <div className='command-info'>Full Name</div>
        <div className='user-info'> {owner.fullName}</div>
        <div > <ArrowForwardIosRoundedIcon style={{width:'100px',float:'right'}}/></div>
      </div>
      </Link>
      <Link to='email'>
      <div className='chenge' >
        <div className='command-info'> Email</div>
        <div className='user-info'> {owner.email}</div>
        <div> <ArrowForwardIosRoundedIcon style={{width:'100px',float:'right'}}/></div>
      </div>
      </Link>
      <Link to = 'number'>
      <div className='chenge' >
        <div className='command-info'> Phone Number</div>
        <div className='user-info'> {owner.phoneNumber}</div>
        <div> <ArrowForwardIosRoundedIcon style={{width:'100px',float:'right'}}/></div>
      </div>
      </Link>
      <Link to = 'password'>
      <div className='chenge' >
        <div className='command-info'> Password</div>
        <div className='user-info'> change your password</div>
        <div > <ArrowForwardIosRoundedIcon style={{width:'100px',float:'right'}}/></div>
      </div>
      </Link>
      </div>
    </div>
    
  
    </div>
   
  );
}

export default SettingsPage;
