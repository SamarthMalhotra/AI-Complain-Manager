import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectContext } from "./ContextAPI/Context/context";
import "./Admin.css";

const AdminPanel: React.FC = () => {
  const { complaints, reply, handleReply } = useContext(ProjectContext)!;

  // ✅ Correct Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status < 3).length;
  const resolved = complaints.filter((c) => c.status >= 3).length;

  return (
    <div className="admin-panel d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-primary text-white px-4 shadow-sm">
        <span className="navbar-brand mb-0 h5 fw-bold">Complaint Manager</span>
      </nav>

      <div className="container-fluid p-4">
        {/* Stats */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm text-center p-3 border-info">
              <h6 className="text-muted">Total Complaints</h6>
              <h3 className="fw-bold">{total}</h3>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm text-center p-3 border-warning">
              <h6 className="text-muted">Pending</h6>
              <h3 className="text-warning fw-bold">{pending}</h3>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm text-center p-3 border-success">
              <h6 className="text-muted">Resolved</h6>
              <h3 className="text-success fw-bold">{resolved}</h3>
            </div>
          </div>
        </div>

        {/* Complaints */}
        <div className="d-flex flex-column align-items-center w-100">
          {complaints.map((comp) => (
            <div className="col-12 mb-4" key={comp._id}>
              <div className="card shadow border-start-4 overflow-hidden">
                <div className="card-body d-flex flex-column">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold">{comp.title}</h5>
                    <span
                      className={`badge ${
                        comp.status < 3 ? "bg-warning text-dark" : "bg-success"
                      }`}
                    >
                      {comp.status < 3 ? "Pending" : "Resolved"}
                    </span>
                  </div>

                  <small className="text-muted mb-2">{comp.date}</small>

                  <p className="flex-grow-1 text-break">{comp.description}</p>

                  {/* Reply Section */}
                  <div className="mt-2">
                    <textarea
                      className="form-control w-100 reply-box"
                      ref={reply}
                      rows={4}
                      placeholder={`${comp.reply}`}
                    />
                    <button
                      className="btn btn-primary w-100 mt-2"
                      onClick={(e) => handleReply(comp._id, e, comp.reply)}
                    >
                      {comp.status < 3 ? "Send Reply" : "Edit Reply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
