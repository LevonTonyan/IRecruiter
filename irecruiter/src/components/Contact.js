import React, { Component } from 'react'
// import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import phone from "../images/call.png"
import location from "../images/location.png"
import mail from "../images/mail.png"

class Contact extends Component {
  render(){
    return (  
      <>
        <section>
          <div className='contact-heading'>
            <h2>Contact Us</h2>
          </div>
          <div className='contacts-container'>
              <div className='text'>
              <img src={location} alt='call.png' className='icon'></img>
                <h4>Address</h4>
                <p>3 Hakob Hakobyan St, Yerevan, Armenia</p>
              </div>
              <div className='text'>
              <img src={phone} alt='call.png' className='icon'></img>
                <h4>Contact Us</h4>
                <p>+374 77857885, +374 77858585, </p>
              </div>
              <div className='text'>
              <img src={mail} alt='call.png' className='icon'></img>
                <h4>Mail</h4>
                <p>irecruit.support@gmail.com</p>
              </div>
          </div>

      
        {/* <div className='map'>
            <Map
              google={this.props.google}
              style={{width:"50%", height:"70%"}}
              zoom={10}
              initialCenter={
                {
                  lat: 40.198892,
                  lng: 44.490525,
                }
              }
            >
              <Marker position={
                {
                  lat: 40.198892,
                  lng: 44.490525, 
                }
              }/>
            </Map>   
         </div> */}
        </section>
      </>  
    );
  }
}

export default Contact

// export default GoogleApiWrapper({
//   apiKey:process.env.REACT_APP_API_KEY
// })(Contact)