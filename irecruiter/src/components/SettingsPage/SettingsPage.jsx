
import './SettingsPage.css'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Header from '../header/Header';
import { Link } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from 'react';





function SettingsPage() {

  const { currentUserData, user ,settingUser } = UserAuth()
  useEffect(() => { 
    if (Object.keys(user).length && !Object.keys(currentUserData).length) { 
      settingUser(user.uid)
    }
  })

const owner = {
  image:'https://cdn-icons-png.flaticon.com/512/2521/2521826.png',
  fullName:currentUserData.name,
  email:user.email,
  phoneNumber:currentUserData.phone

}

  return (
    <div >
      <Header/>
      <div className = "wrapper">
    <div className='changes'>
      <div style={{margin:"40px"}}>
        <h2> Profile</h2>
        <p className='p'> Manage your user profile and contact details. Changes will affect how other users see you within IRecuiter. </p>
      </div>
      <div className='ProfilePicture' >
        <div className='command-info'> Profile picture</div>
        <div className='user-info'> Update your profile picture</div>
        <div className = 'iconWrapper' onClick={()=>{console.log('hello')}}>
        </div>
      </div>
      <Link to = '/fullName' >
      <div className='chenge' >
        <div className='command-info'> Full Name</div>
        <div className='user-info'> {owner.fullName}</div>
        <div > <ArrowForwardIosRoundedIcon style={{width:'100px',float:'right'}}/></div>
      </div>
      </Link>
      <Link to = '/email'>
      <div className='chenge' >
        <div className='command-info'> Email</div>
        <div className='user-info'> {owner.email}</div>
        <div> <ArrowForwardIosRoundedIcon style={{width:'100px',float:'right'}}/></div>
      </div>
      </Link>
      <Link to = '/number'>
      <div className='chenge' >
        <div className='command-info'> Phone Number</div>
        <div className='user-info'> {owner.phoneNumber}</div>
        <div> <ArrowForwardIosRoundedIcon style={{width:'100px',float:'right'}}/></div>
      </div>
      </Link>
      <Link to = '/password'>
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
