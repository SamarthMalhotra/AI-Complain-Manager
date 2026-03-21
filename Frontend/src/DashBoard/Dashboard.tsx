import React from "react";
import Complain from "./Complain";

const Dashboard: React.FC = () => {
  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-12 px-0">
          <Complain />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
