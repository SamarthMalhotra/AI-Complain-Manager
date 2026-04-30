import React, { useContext, useState, useEffect } from "react";
import { ProjectContext } from "./ContextAPI/Context/context";
import { TailSpin } from "react-loader-spinner";
const ComplaintForm: React.FC = () => {
  const {
    complainForm,
    setComplainForm,
    submitComplain,
    submit,
    accessCompany,
  } = useContext(ProjectContext)!;
  const [companyList, setCompanyList] = useState([
    { _id: "", name: "Select the Company" },
  ]);
  //Fetch the company list
  useEffect(() => {
    const fetchData = async () => {
      let data: { _id: string; name: string }[] = await accessCompany();
      console.log(data);
      setCompanyList((prev) => [...prev, ...data]);
    };
    fetchData();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setComplainForm({ ...complainForm, [name]: value });
  };
  return (
    <>
      {submit ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <TailSpin
            visible={true}
            height={80}
            width={80}
            color="black"
            ariaLabel="tail-spin-loading"
            radius={1}
          />
        </div>
      ) : (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div
            className="card shadow-lg border-0 rounded-4 p-4"
            style={{ width: "500px" }}
          >
            <form onSubmit={submitComplain}>
              <fieldset className="border p-2 rounded-4">
                <legend className="float-none w-auto px-2 fw-bold text-primary">
                  Register Complaint
                </legend>

                {/* Select Company*/}
                <div className="mb-1">
                  <label className="form-label fw-semibold">
                    Product Brand
                  </label>
                  <select
                    className="form-select rounded-3"
                    name="company"
                    value={complainForm.company}
                    onChange={handleChange}
                    required
                  >
                    {companyList?.map((com) => (
                      <option key={com._id} value={com._id}>
                        {com.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-1">
                  <label className="form-label fw-semibold">Product Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="product"
                    value={complainForm.product}
                    onChange={handleChange}
                    required
                    placeholder="Enter your product detail"
                  />
                </div>
                {/* Title */}
                <div className="mb-1">
                  <label className="form-label fw-semibold">Title</label>
                  <select
                    className="form-select rounded-3"
                    name="title"
                    value={complainForm.title}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select complaint title</option>
                    <option value="Network Issue">Network Issue</option>
                    <option value="Billing Problem">Billing Problem</option>
                    <option value="Service Delay">Service Delay</option>
                    <option value="Technical Problem">Technical Problem</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date */}
                <div className="mb-1">
                  <label className="form-label fw-semibold">Date</label>
                  <input
                    type="date"
                    className="form-control rounded-3"
                    name="date"
                    value={complainForm.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-1">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows={4}
                    name="description"
                    value={complainForm.description}
                    onChange={handleChange}
                    placeholder="Write your complaint..."
                    required
                  />
                </div>

                {/* Contract Number */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Contract Number
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="contractNumber"
                    value={complainForm.contractNumber}
                    onChange={handleChange}
                    placeholder="Enter contract number"
                    minLength={10}
                    maxLength={12}
                  />
                </div>

                <button className="btn btn-primary w-100 rounded-3">
                  Submit Complaint
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintForm;
