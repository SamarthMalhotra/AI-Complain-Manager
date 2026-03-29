import React from "react";
import Complain from "./Complain";

const Dashboard: React.FC = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row g-1">
        <div className="col-12 px-2">
          <Complain />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
