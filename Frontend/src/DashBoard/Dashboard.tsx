import React from "react";
import Complain from "./Complain";

const Dashboard: React.FC = () => {
  return (
    <div className="container-fluid p-2">
      <div className="row g-1">
        <div className="col-12 px-3">
          <Complain />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
