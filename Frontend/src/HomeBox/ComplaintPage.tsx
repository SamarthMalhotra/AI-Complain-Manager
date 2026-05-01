import { useNavigate } from "react-router-dom";
import "./ComplaintPage.css";
//import Brands from "./Brands";
const ComplaintPage: React.FC = () => {
  const navigator = useNavigate();
  return (
    <div className="page-container">
      <div className="complaint-box mt-0">
        <h1 className="title">Complaint Manager</h1>
        <br />
        <h2 className="title">Complaint Portal</h2>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigator("/register")}
        >
          Register Complaint
        </button>
      </div>
    </div>
  );
};

export default ComplaintPage;
