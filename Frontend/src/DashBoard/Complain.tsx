import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Complain.css";
import { ProjectContext } from "../ContextAPI/Context/context";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Complain = () => {
  const { data, deleteComplain } = useContext(ProjectContext)!;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const statusSteps = ["Register", "Received", "Reply"];

  return (
    <div className="complain-page container py-1">
      {/* Header */}
      <div className="dashboard-header mb-4 text-center">
        <h2 className="fw-bold py-3 px-2 rounded text-white header-bg shadow-sm">
          Complaints Dashboard
        </h2>
      </div>

      {data.length !== 0 ? (
        data.map((complain, index) => {
          const expanded = expandedIndex === index;

          return (
            <div
              key={index}
              className="complain-card card mb-4 shadow-sm rounded"
            >
              <div className="card-body">
                {/* STATUS TRACKER */}
                <div className="status-box d-flex justify-content-between align-items-center mb-3">
                  {statusSteps.map((step, i) => {
                    const isCompleted = complain.status > i;
                    const isCurrent = complain.status === i;
                    const badgeColor = isCompleted
                      ? "bg-success"
                      : isCurrent
                        ? "bg-primary"
                        : "bg-secondary";

                    return (
                      <div
                        key={i}
                        className="status-item d-flex flex-column align-items-center flex-fill"
                      >
                        <div className="d-flex align-items-center">
                          {i > 0 && (
                            <div className="status-line flex-fill"></div>
                          )}
                          <span
                            className={`badge rounded-circle ${badgeColor}`}
                          >
                            {i + 1}
                          </span>
                          {i < statusSteps.length - 1 && (
                            <div className="status-line flex-fill"></div>
                          )}
                        </div>
                        <small
                          className={`mt-1 fw-semibold ${isCompleted ? "text-success" : ""}`}
                        >
                          {step} {isCompleted && <IoCheckmarkDoneSharp />}
                        </small>
                      </div>
                    );
                  })}
                  <span
                    className="deleteComplain"
                    onClick={() => deleteComplain(complain.id)}
                  >
                    <MdOutlineDeleteForever />
                  </span>
                </div>

                {/* TITLE & DATE */}
                <h5 className="card-title fw-bold text-dark double-underline">
                  {complain.title}
                </h5>
                <p className="text-secondary small mb-2 ">{complain.date}</p>
                <hr></hr>
                {/* DESCRIPTION */}
                <p className="card-text description mb-2">
                  <b>Complain Description: &nbsp;</b>
                  {expanded
                    ? complain.description
                    : complain.description.slice(0, 120) +
                      (complain.description.length > 120 ? "..." : "")}
                </p>

                {complain.description.length > 120 && (
                  <span
                    className="read-more text-primary fw-semibold"
                    onClick={() => toggleExpand(index)}
                  >
                    {expanded ? "Show less" : "Read more"}
                  </span>
                )}
                <hr></hr>

                {/* REPLY */}
                <div className="replyBox mt-3">
                  <h6 className="fw-bold mb-2">Reply</h6>
                  {complain.reply && complain.reply.trim() !== "" ? (
                    <textarea
                      className="form-control reply-textarea"
                      rows={3}
                      value={complain.reply}
                      readOnly
                    />
                  ) : (
                    <p className="text-muted fst-italic">No reply yet</p>
                  )}
                </div>
                <hr></hr>
              </div>
            </div>
          );
        })
      ) : (
        <h4 className="text-center text-muted mt-5">
          No complaints available.
        </h4>
      )}
    </div>
  );
};

export default Complain;
