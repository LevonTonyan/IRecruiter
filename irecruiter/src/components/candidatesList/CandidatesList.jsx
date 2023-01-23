import { db } from '../../db/firebase'
import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs } from "firebase/firestore";
import {AgGridReact} from 'ag-grid-react';
import './CandidatesListStyles.css'
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import { UserAuth } from '../../context/AuthContext';
import CandidateForm from '../profilePage/CreateCandidateModal/CandidateForm/CandidateForm';




const SimpleComp = p => {
  return (
    <Link to={`/candidate/${p.data.id}`} >{p.value}</Link>
    )
  
}


const CandidatesList = () => {
  const {isSidebarOpen} = UserAuth()
  const [loading, setLoading] = useState(false)
  const [docs, setDocs] = useState([]);
  const [showCreateMd, setShowCreateMd] = useState(false)



  useEffect(() => {
    let arr = []
    setLoading(true)
    getDocs(collection(db, "employee")).then((docs) => {
      docs.forEach(doc => arr.push(doc.data()))
      setDocs(arr)
      setLoading(false)
    })
    
  }, [])

  //////DEF AGGrid options///////////////////////////////////////
  const rowData = docs
  

  const [columnDefs , setColumnDefs] = useState([
    { cellRenderer: SimpleComp, field: "Candidate Name", cellClass:"cellClass"},
    { headerName: "Phone", field: "Candidate Phone Number" },
    { headerName: "Candidate Location", field: "Candidate Location" },
    { headerName: "Current Position", field: "currentPosition" },
    { headerName: "Current Company", field: "Current Company" },
    { headerName: "Email", field: "Email" },
    { headerName: "Expected salary", field: "expectedSalary" },
    
   
  ])

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);


 
  const styles = {
    button: {
      maxWidth:"200px",
      height: '25px',
      marginBottom:'10px'
    },
  }

///////////////rendering Loader if still loadings
  if (loading) return <Loader />
  
  
  return (

    <div className={isSidebarOpen ? 'sideBarOpen candidatesList' : 'candidatesList'}>
      
      {showCreateMd && <CandidateForm setShowCandidateFormModal={setShowCreateMd} />}
      
      
      <div className='create-candidate-header'>
        <h1>Candidates</h1>
        <Button variant='contained'
          sx={styles.button}
          onClick={() => setShowCreateMd(true)}
        >+ Create candidate</Button>
      </div>
     
       

     <div className="ag-theme-alpine"
				style={{
					height: '75vh',
          width: '100%',
          textAlign:'left'
				}}
			>
				<AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
					rowData={rowData}>
				</AgGridReact>
			</div>
    
    </div>
   
  )
}

export default CandidatesList