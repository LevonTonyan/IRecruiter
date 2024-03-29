import "./ClientsListStyles.css"
import {React,useState, useEffect, useMemo } from 'react'
import { db } from "../../db/firebase"
import { collection, getDocs} from 'firebase/firestore'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import { UserAuth } from '../../context/AuthContext';
import CreateClient from "../profilePage/CreateClient/CreateClient";

const SimpleComp = p => {
    return (
      <Link to={`/clients/${p.data.id}`} >{p.value}</Link>
      )
    
}

const ClientsList=()=>{
    const {isSidebarOpen} = UserAuth()
    const [loading, setLoading] = useState(false)
  const [docs, setDocs] = useState([]);
  const [showClientFormModal, setShowClientFormModal] = useState(false)
    


    useEffect(() => {
        let arr = []
        setLoading(true)
        getDocs(collection(db, "clients")).then((docs) => {
            docs.forEach(doc => arr.push({...doc.data(), id:doc.id}))
            setDocs(arr)
            setLoading(false)
        })
        
      }, [])


    //////DEF AGGrid options///////////////////////////////////////
    const rowData = docs 

    const [columnDefs ] = useState([
        { headerName: "Client Name", field: "Client Name"},
        { headerName: "Company Name", field: "Company Name" },
        { headerName: "Job Count", field: "Job Count" },
        { headerName: "Position Name", field: "Position Name" },
        { headerName: "Location", field: "Location" },
        { headerName: "Salary", field: "Salary" },
        { headerName: "Job Stage", field: "Job Stage" },
       
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

      <div className={isSidebarOpen ? 'sideBarOpen' : null}>   
        {showClientFormModal&&<CreateClient setShowClientFormModal={setShowClientFormModal } />}
            <div className='create-client-header'>
                <h1>Clients</h1>
                <Button variant='contained'
            sx={styles.button}
            onClick={() => setShowClientFormModal(true)}
                >+ Create client</Button>
            </div>

            <div className="ag-theme-alpine"
				style={{
					height: '75vh',
                    width: '100%',
                    textAlign:'left'
				}}>
				<AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
					rowData={rowData}>
				</AgGridReact>
			</div>

            

        </div>
    )

      

      
}

export default ClientsList