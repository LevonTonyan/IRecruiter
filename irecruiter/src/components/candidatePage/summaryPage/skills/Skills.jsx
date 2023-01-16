import { Button } from "@mui/material";
import "./SkillsStyles.css";
import { UserAuth } from "../../../../context/AuthContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from './../../../../db/firebase';
import { useState } from 'react';
import uuid from 'react-uuid';


///////////////SMALL SKILLITEM CMPONENT///////////////////
const Skill = ({skill, removeSkill}) => {
  return (<>
            <div className='skill'>
                {skill}
             </div>
            <button className='close-btn' onClick={() => removeSkill(skill)}>X</button>
          </>
  )
}



const Skills = ({ candidate }) => {
  const [input, setInput] = useState('')
  //if (!Object.keys(skills).length) return

  const addCandidateSkill = () => { 
    if (input) {
    const skillsRef = doc(db, "employee", candidate.id);
    updateDoc(skillsRef, {
      skills: arrayUnion(input)
    }).then(() => setInput("")).catch(e => console.log(e))
    }
  };

  const removeSkill = (name) => {
    const skillsRef = doc(db, "employee", candidate.id);
    updateDoc(skillsRef, {
      skills: arrayRemove(name)
    }).then(() => setInput("")).catch(e => console.log(e))
    }
  
  
  




  
  if (!Object.keys(candidate).length){ return  null}


  return (
    <div className="skills-container">
      <div className="skills-title">
        <span>Skills</span>
      </div>
      <div className="skills-list">
        <div className="sk-List">
          {candidate.skills.length ? (
          candidate.skills.map((skill) => {
            return <Skill skill={skill} key={uuid()} removeSkill={removeSkill } />
          })
        ) : (<h5 style={{ margin: "0px 0px 0px 0px" }}>No skills added yet</h5>
        )}</div> 
        <div className="footer">
        {<input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>}
        <Button type="submit" variant="contained" sx={{marginTop:"10px",}} onClick={addCandidateSkill}> + Add</Button>
        </div>
        
      </div>
    </div>
  );
};

export default Skills;
