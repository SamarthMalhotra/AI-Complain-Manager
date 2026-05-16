import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectContext } from "./ContextAPI/Context/context";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
const AdminPanel: React.FC = () => {
  const { complaints, reply, handleReply, setReply } =
    useContext(ProjectContext)!;
  const [disabledButtons, setDisabledButtons] = React.useState<{
    [key: string]: boolean;
  }>({});
  const handleClick = (id: string, e: React.FormEvent, oldReply?: string) => {
    if (reply) {
      const newReply = reply.trim();
      if (newReply === "") {
        alert("Reply cannot be empty.");
        return;
      }
      if (newReply === oldReply) {
        alert("Reply is unchanged. Please modify it before submitting.");
        return;
      }
      setDisabledButtons((prev) => ({
        ...prev,
        [id]: true,
      }));
      handleReply(id, e, oldReply);
      setTimeout(() => {
        setDisabledButtons((prev) => ({
          ...prev,
          [id]: false,
        }));
      }, 5000);
    }
  };
  // ✅ Correct Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status < 3).length;
  const resolved = complaints.filter((c) => c.status >= 3).length;
  return (
    <>
      <div className="admin-panel  d-flex">
        <AdminSidebar />

        {/* RIGHT SIDE CONTENT */}
        <div className="main-content">
          {/* Navbar */}
          <nav className="navbar navbar-light bg-primary text-white shadow-sm">
            <span className="navbar-brand mb-0 h5 fw-bold  px-4 ">
              Complaint Manager
            </span>
          </nav>

          <div className="container-fluid p-4 mt-5">
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
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="fw-bold">{comp.title}</h5>
                        <span
                          className={`badge ${
                            comp.status < 3
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {comp.status < 3 ? "Pending" : "Resolved"}
                        </span>
                      </div>

                      <small className="text-muted mb-2">{comp.date}</small>

                      <p className="flex-grow-1 text-break">
                        {comp.description}
                      </p>

                      <div className="mt-2">
                        <textarea
                          className="form-control w-100 reply-box"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          rows={4}
                          placeholder={comp.reply}
                        />

                        <button
                          className={`btn btn-primary w-100 mt-2 ${
                            disabledButtons[comp._id] ? "disabled" : ""
                          }`}
                          onClick={(e) => handleClick(comp._id, e, comp.reply)}
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
      </div>
    </>
  );
};

export default AdminPanel;
