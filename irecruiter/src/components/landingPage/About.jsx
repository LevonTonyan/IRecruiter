import './Landing.css'

function About(){
    return(
        <div className='about'>
            <div className="about-header">
                <h1>About</h1>
            </div>
            <div className="about-text">
                <p>This application was created using React library. Authentication, data storage and hosting implemented via Google Firebase.
                    Technologies used: Formik, Yup, AGgrid, Axios, Recharts, Framer Motion, Material UI etc. 
                </p>
            </div>
        </div>
    )
}

export default About