import "./CandidatePageHeaderStyles.css";
import { Link } from "react-router-dom";
import SummarizeIcon from '@mui/icons-material/Summarize';
import WorkIcon from '@mui/icons-material/Work';



const CandidatePageHeader = ({candidate}) => {

  const styles = {
    icons: {
      width:"15px",
      marginRight: '5px',
      color:'grey'
    }
  }

  if (!Object.keys(candidate).length) { return}
  return (
    <>
      <div className="header-container">
        <div className="avatar-container">{candidate['Candidate Name'][0]}</div>

        <div className="user-details">
          <div>{candidate['Candidate Name']}</div>
          <div>{candidate['Candidate Location'] }</div>
        </div>
      </div>
      <div className="link-list-container">
        <ul>
          <Link to="summary">
            <li> <div className="link-div"><SummarizeIcon sx={styles.icons} />Summary</div></li>
          </Link>
          <Link to="jobs">
            <li><div className="link-div"><WorkIcon sx={styles.icons}/>Jobs</div></li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default CandidatePageHeader;
