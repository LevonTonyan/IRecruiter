import "./ListWithButtonsStyles.css";
import { useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DoneIcon from '@mui/icons-material/Done';
import { doc, updateDoc } from "firebase/firestore";
import { db } from './../../../../db/firebase';



////////////MINI INPUT COMP////////////////////////////
function MiniInput({ input, setInput, setShowMiniEdit, id, field }) {

  const candidateRef = doc(db, "employee", id);
  const handleAdd = () => {
    updateDoc(candidateRef, {
      [field]: input
    }).catch((e) => console.log(e))
    setInput("");
    setShowMiniEdit(false);
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
      + Add
    </button>
  );
};


function Editable({ candidate, field }) {
  const [showMiniEdit, setShowMiniEdit] = useState(false);
  const [input, setInput] = useState("");

  const handleEdit = () => {
    setShowMiniEdit(true);
  };
  ////////////////HERE SEND TO SERVER////////////////////////

  return (
    <>
      {(candidate[field] && !showMiniEdit) ? (
        <div>
          <span> {candidate[field]}</span>
          <button onClick={handleEdit} className="edit-btn">
            <ModeEditIcon sx={{height:"16px"}} />
          </button>
        </div>
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
