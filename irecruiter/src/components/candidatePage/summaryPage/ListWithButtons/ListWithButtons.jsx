import "./ListWithButtonsStyles.css";
import { useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DoneIcon from '@mui/icons-material/Done';
import { doc, updateDoc,arrayUnion, arrayRemove,deleteField   } from "firebase/firestore";
import { db } from './../../../../db/firebase';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';








////////////MINI INPUT COMP////////////////////////////
function MiniInput({ input, setInput, setShowMiniEdit, id, field }) {

  const candidateRef = doc(db, "employee", id);


  const handleAdd = () => {
    if (field.charAt(field.length - 1) === 's') {
      updateDoc(candidateRef, {
        [field]: arrayUnion(input)
      }).catch((e) => console.log(e))
      setInput("");
      setShowMiniEdit(false);
    } else { 
      updateDoc(candidateRef, {
        [field]: input
      }).catch((e) => console.log(e))
      setInput("");
      setShowMiniEdit(false);
    }
  };

  return (
    <div className="mini-input">
      <form>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd} type="submit">
          <DoneIcon sx={{height:"20px", color:'green'}} />
        </button>
      </form>
    </div>
  );
}

///////////ADD BUTTON FUNCTIONALITY/////////////
const AddButton = ({ setShowMiniEdit }) => {
  return (
    <button
      style={{ color: "blue", border: "none", backgroundColor: "white" }}
      className='init-add-btn'
      onClick={() => {
        setShowMiniEdit(true);
      }}
    >
      +
    </button>
  );
};







function Editable({ candidate, field }) {




  const [showMiniEdit, setShowMiniEdit] = useState(false);
  const [input, setInput] = useState("");
  
  const handleEdit = () => {
    setShowMiniEdit(true);
  };

  const handleDelete = (name, target) => { 
    const isFieldPlural = target.charAt(field.length - 1) === 's'
    console.log(target)
    const item = doc(db, "employee", candidate.id);
      updateDoc(item, {
       
        [target]: isFieldPlural?arrayRemove(name):deleteField()
      }).catch(e => console.log(e)).then(() => setInput(""))
      }
  
  ////////////////HERE SEND TO SERVER////////////////////////

  return (
    <>
      {(candidate[field] && !showMiniEdit) ? (
        
        //////if name of the field is plural return array of chips//////////////////
        candidate[field].length&&field.charAt(field.length - 1) === 's'
          ? <Stack direction="row" spacing={1}>{
            candidate[field].map(el => { 
              return ( <Chip
                label={el instanceof Map?null:el}
                size='small'
                onDelete={() => handleDelete(el,field)}
                onClick={handleEdit} />)
            })
          }
            <AddButton candidate={candidate} setShowMiniEdit={setShowMiniEdit}/>
          </Stack>
        ////////Else just chip//////////////////  
          : <>
              {!Array.isArray(candidate[field])?<Chip
              label={candidate[field]}
              onClick={handleEdit}
              size='small'
              onDelete={() => handleDelete(null, field)} />:<AddButton candidate={candidate} setShowMiniEdit={setShowMiniEdit} />}
            </>
          
        
        
      ) : showMiniEdit ? (
        <MiniInput
            input={input}
            setInput={setInput}
            setShowMiniEdit={setShowMiniEdit}
            id={candidate.id} 
            field={field}
        />
      ) : (
        <AddButton candidate={candidate} setShowMiniEdit={setShowMiniEdit} />
      )}
    </>
  );
}

const ListWithButtons = ({ candidate, compName,details }) => {
  return (
    <div className="candidates-details-container">
      <div className="details-title">
        <span>{compName}</span>
      </div>
      <div className="candidate-details">
        {details.map((detail, i) => {
          return (
            <Line detailName={detail} candidate={candidate} key={i} id={i} />
          );
        })}
      </div>
    </div>
  );
};

const Line = ({ detailName, candidate }) => {
  return (
    <div className="line">
      <span>{detailName}</span>
      <span className="rigth-column">
        <Editable candidate={candidate} field={detailName } />
      </span>
    </div>
  );
};

export default ListWithButtons;
