import './Landing.css'
import phone from "../../images/call.png"
import location from "../../images/location.png"
import mail from "../../images/mail.png"
import {MapContainer,TileLayer,Marker, Popup,} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'



function Contact () {
  const containerStyle = {
    width: '500px',
    height: '50vh'
  };
  
  const center = {
    lat: 40.198892,
    lng: 44.490525
  };
  

  const position= {
    lat: 40.198892,
    lng: 44.490525, 
  }

  const markerIcon= new L.Icon({
    iconUrl: require('../../images/marker.png'),
    iconSize:[30,30],
  });

  return (  
        <section>
          <div className='contact-heading'>
            <h2>Contact Us</h2>
          </div>
<div className='allContainer'>

        <MapContainer style={containerStyle} center={position} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={markerIcon} position={position}/>
          
        </MapContainer>
        
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
    )
  }

export default Contact