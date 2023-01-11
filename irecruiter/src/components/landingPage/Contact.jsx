import './Landing.css'
import phone from "../../images/call.png"
import location from "../../images/location.png"
import mail from "../../images/mail.png"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'



function Contact () {
  const containerStyle = {
    width: '400px',
    height: '50vh'
  };
  
  const center = {
    lat: 40.198892,
    lng: 44.490525
  };
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })


  return isLoaded ? (  
        <section>
          <div className='contact-heading'>
            <h2>Contact Us</h2>
          </div>
<div className='allContainer'>
  
<GoogleMap
              mapContainerStyle={containerStyle}  
              zoom={10}  
              center={center}>
             <Marker position={
                {
                  lat: 40.198892,
                  lng: 44.490525, 
                }}/>
            </GoogleMap>  

          <div className='contacts-container'>
              <div className='contact'>
              <img src={location} alt='call.png' className='icon'></img>
                <div className='text'>
                <h4>Address</h4>
                <p>3 Hakob Hakobyan St, Yerevan, Armenia</p>
                </div>
              </div>
              <div className='contact'>
              <img src={phone} alt='call.png' className='icon'></img>
              <div className='text'>
                <h4>Contact Us</h4>
                <p>+374 77857885, +374 77858585, </p>
                </div>
              </div>
              <div className='contact'>
              <img src={mail} alt='call.png' className='icon'></img>
              <div className='text'>
                <h4>Mail</h4>
                <p>irecruit.support@gmail.com</p>
                </div>
              </div>
          </div>
   
            
            </div>  
        </section> 
    ): <></>
  }

export default Contact