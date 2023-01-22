import { useState, useEffect } from 'react'
import './ReposrtPageStyles.css';
import { UserAuth } from '../../context/AuthContext';
import { PieChart, Pie, XAxis, CartesianGrid, Tooltip, AreaChart, YAxis, Area } from 'recharts'
import { collection, getDocs } from "firebase/firestore";
import { db } from './../../db/firebase';
import moment from 'moment';










// function CandidatesCard(){
//   return (
//     <div className='card-layout'>
//       <div className='card'>
//         <div className='card-img'>
//           <img src='https://app.manatal.com/img/candidates-one.44c46d67.svg' alt=''/>
//         </div>
//         <div className='card-text-wrap'>
//           <div><h3>Candidates</h3></div>
//           <div><p> View all reports related to your<br/> candidates.</p></div>
//         </div>
//         <div className='card-arrow'>
//           <span className='arrow'><ArrowForwardIosIcon/></span>
        
//         </div>
//       </div>
//     </div>
//   )
// }


// function JobsCard(){
//   return (
//     <div className='card-layout'>
//       <div className='card'>
//         <div className='card-img'>
//           <img src='https://app.manatal.com/img/jobs-one.71fff1c9.svg' alt=''/>
//         </div>
//         <div className='card-text-wrap'>
//           <div><h3>Jobs</h3></div>
//           <div><p>  View all reports related to your jobs.</p></div>
//         </div>
//         <div className='card-arrow'>
//           <span className='arrow'><ArrowForwardIosIcon/></span>
        
//         </div>
//       </div>
//     </div>
//   )
// }



// function HiringPerformanceCard (){
//   return (
//     <div className='card-layout'>
//       <div className='card'>
//         <div className='card-img'>
//           <img src='https://app.manatal.com/img/hiring-performance.a47ddc74.svg' alt=''/>
//         </div>
//         <div className='card-text-wrap'>
//           <div><h3> Hiring Performance </h3></div>
//           <div><p>View all reports related to your <br/>matches and hiring performance.</p></div>
//         </div>
//         <div className='card-arrow'>
//           <span className='arrow'><ArrowForwardIosIcon/></span>
        
//         </div>
//       </div>
//     </div>
//   )
// }





const ReportsPage = () => {
  const { isSidebarOpen, user } = UserAuth();
  const [allCandidates, setAllCandidates] = useState([]);
  const [allJobs, setAllJobs] = useState([])
  const [jobsByClient, setJobsByClient] = useState([])
  const [dataByCreated, setDataByCreated] = useState([]);
  const [cnadidatesByYou, setCandidatesByYou] = useState([])

  useEffect(() => {
    let docs = [];
    getDocs(collection(db, "employee")).then((r) => {
      r.forEach((doc) => {
        docs.push(doc.data());
      });
      setAllCandidates(docs);
    });

    let jobs = []
    getDocs(collection(db, "jobs")).then((r) => {
      r.forEach((doc) => {
        jobs.push(doc.data());
      });
      setAllJobs(jobs);
    });
  }, []);

  useEffect(() => {
    let data = [];
    let createdByData = []
    let createdByYou = {}
    let obj = {};

    allCandidates.forEach((can) => {
      let date = moment.unix(can.created.seconds).format("MM/DD/YYYY")
      if (!obj.hasOwnProperty(date)) {
        obj[date] = 1; 
        if (can.createdBy === user.uid) {
          if (!createdByYou.hasOwnProperty(date)) {
            createdByYou[date] = 1; 
          } else { 
            createdByYou[date] = 1; 
          }
      }
      }
      else {
        obj[date] += 1; ;
        if (can.createdBy === user.uid) {
          if (!createdByYou.hasOwnProperty(date)) {
            createdByYou[date] = 1;
          } else { 
            createdByYou[date] += 1;
          }
      }
      }
    });
 
    for (let [entry, value] of Object.entries(obj)) {
      data.push({ date: entry, count: value });
    }
    for (let [entry, value] of Object.entries(createdByYou)) {
      createdByData.push({ date: entry, count: value });
    }

    setCandidatesByYou(createdByData.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() ))
    setDataByCreated(data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    

    let clientObj = {}
    let jobs = []
    allJobs.forEach(job => {
      if (!clientObj.hasOwnProperty(job.Client)) {
        clientObj[job.Client] = 1
      } else { 
        clientObj[job.Client] += 1
      }
    })
    for (let [entry, value] of Object.entries(clientObj)) {
      jobs.push({ Client: entry, count: value });
    }

    setJobsByClient(jobs)
    

  }, [allCandidates]);

  


  return (
    <div className={isSidebarOpen ? "main sideBarOpen" : "main"}>
      <div className="reports-container">
      <div>Open jobs </div>
      <PieChart width={730} height={250}>
          <Pie data={jobsByClient}
            dataKey="count"
            nameKey="Client"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          
          />
  <Pie  data={jobsByClient} dataKey="count" nameKey="Client" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
</PieChart>


        <div>Candidates created by date</div>
        <AreaChart
          width={730}
          height={250}
          data={dataByCreated}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis  dataKey="count"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>


        <div>Candidates created by you</div>
        <AreaChart
          width={730}
          height={250}
          data={cnadidatesByYou}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
          </defs>
          <XAxis dataKey="date" />
          <YAxis  dataKey="count"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default ReportsPage;