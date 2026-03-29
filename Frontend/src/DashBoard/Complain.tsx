import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Complain.css";
import { ProjectContext } from "../ContextAPI/Context/context";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Complain = () => {
  const { data } = useContext(ProjectContext)!;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="complain-page p-3">
      {/* Header */}
      <div className="dashboard-header mb-3 text-center">
        <h2 className="fw-bold mt-3">Complaints Dashboard</h2>
      </div>

      {data.length !== 0 ? (
        data.map((complain, index) => {
          const expanded = expandedIndex === index;

          return (
            <div
              key={index}
              className="complain-card shadow-sm p-4 mb-4 bg-white rounded"
            >
              {/* STATUS */}
              <div className="status-box">
                <div className="status-item">
                  <span className="badge bg-primary rounded-circle p-2">1</span>
                  <div>
                    Register {complain.status > 0 && <IoCheckmarkDoneSharp />}
                  </div>
                </div>

                <div className="status-item">
                  <span className="badge bg-warning text-dark rounded-circle p-2">
                    2
                  </span>
                  <div>
                    Received {complain.status > 1 && <IoCheckmarkDoneSharp />}
                  </div>
                </div>

                <div className="status-item">
                  <span className="badge bg-success rounded-circle p-2">3</span>
                  <div>
                    Reply {complain.status > 2 && <IoCheckmarkDoneSharp />}
                  </div>
                </div>
              </div>

              {/* BODY */}
              <div className="complain-body">
                <h5 className="fw-bold">{complain.title}</h5>
                <p className="text-muted small">{complain.date}</p>

                <div className={`description ${expanded ? "expanded" : ""}`}>
                  {expanded
                    ? complain.description
                    : complain.description.slice(0, 120)}
                </div>

                {complain.description.length > 120 && (
                  <span
                    className="read-more text-primary"
                    onClick={() => toggleExpand(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {expanded ? "Show less" : "Read more"}
                  </span>
                )}

                {/* REPLY */}
                <div className="replyBox mt-3">
                  <h6 className="fw-bold">Reply</h6>

                  {complain.reply && complain.reply.trim() !== "" && (
                    <textarea
                      className="form-control"
                      rows={3}
                      value={complain.reply}
                      readOnly
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h4 className="text-center text-muted">No complaints available.</h4>
      )}
    </div>
  );
};

export default Complain;
