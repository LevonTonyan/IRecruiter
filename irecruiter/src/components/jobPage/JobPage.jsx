import './JobPageStyles.css'
import { doc, onSnapshot  } from "firebase/firestore";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../db/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { UserAuth } from "../../context/AuthContext";
import ListWithButtons from '../candidatePage/summaryPage/ListWithButtons/ListWithButtons';


const JobPage = () => {
  const { isSidebarOpen } = UserAuth();
  const { id } = useParams()
  const jobRef = doc(db, 'jobs', id)
  const [job, setJob] = useState({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  useEffect(() => { 
    setLoading(true)
    onSnapshot(jobRef, (doc) => setJob(doc.data()))
    navigate('summary')
    setLoading(false)
  },[])


  
  if (loading) return <Loader />
console.log(job)
  return (
    <div className={isSidebarOpen?"candidatePage-container sideBarOpen":"candidatePage-container"}>
      {/* <ListWithButtons/> */}
      {/* <Outlet context={job }/> */}
    </div>
  );
};

export default JobPage;
