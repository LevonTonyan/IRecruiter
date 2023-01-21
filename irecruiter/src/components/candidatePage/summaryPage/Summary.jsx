import ListWithButtons from "./ListWithButtons/ListWithButtons";
import Skills from "./skills/Skills";
import './SummaryPageStyles.css'
import { useOutletContext } from "react-router-dom";



const additionalInfo = ["Current Department",
"Candidate Industry",
"Years of Experience",
"Graduation Date",
"Current Salary",
"Current Benefits",
"Notice Period ",
"Expected Salary",
"Expected Benefits",
"Nationalities",
"Languages",
"Candidate Reference Name",
]


const details = [
  "Candidate Name",
  "Diploma",
  "University",
  "Current Company",
  "Gender",
  "Candidate Location",
  "Birthdate",
  "Candidate Address",
  "Candidate Phone Number",
  "Applied jobs",
  "Email"
];


const Summary = () => {

  const candidate = useOutletContext()
  
  return (
    <div className="summary-container">
      <ListWithButtons candidate={candidate} compName='Candidate Details' details={ details} />
      <ListWithButtons candidate={candidate} compName='Additional Information' details={additionalInfo} />
      <Skills candidate={candidate} />

    </div>
  );
};

export default Summary;
