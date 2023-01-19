import "./CandidatePageStyles.css";
import { doc, onSnapshot  } from "firebase/firestore";
import CandidatePageHeader from "./candidatePageHeader/CandidatePageHeader";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../db/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { UserAuth } from "../../context/AuthContext";


const CandidatePage = () => {
  const { isSidebarOpen } = UserAuth();
  const { id } = useParams()
  const candidateRef = doc(db, 'employee', id)
  const [candidate, setCandidate] = useState({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  useEffect(() => { 
    setLoading(true)
    onSnapshot(candidateRef, (doc) => setCandidate(doc.data()))
    navigate('summary')
    setLoading(false)
  },[])


  
  if (loading) return <Loader />

  return (
    <div className={isSidebarOpen?"candidatePage-container sideBarOpen":"candidatePage-container"}>
      <CandidatePageHeader candidate={candidate } />
      <Outlet context={candidate }/>
    </div>
  );
};

export default CandidatePage;
