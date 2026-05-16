import "./AdminSidebar.css";
import { useContext, useEffect } from "react";
import { ProjectContext } from "./ContextAPI/Context/context";
const AdminSidebar = () => {
  const { accessCompany, companyList, setCompanyList, getCompanyComplaints } =
    useContext(ProjectContext)!;
  //Fetch the company list
  useEffect(() => {
    const fetchData = async () => {
      let data: { _id: string; name: string }[] = await accessCompany();
      setCompanyList([...data]); // overwrite instead of append
    };
    fetchData();
  }, []);
  return (
    <div className="sidebar">
      <h3 className="logo">Company List</h3>
      <ul className="menu">
        {companyList.slice(0).map((company) => (
          <li
            key={company._id}
            onClick={(e) => {
              e.preventDefault();
              getCompanyComplaints(company._id);
            }}
          >
            {company.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
