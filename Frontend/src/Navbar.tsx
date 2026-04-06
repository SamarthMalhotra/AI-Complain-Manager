import "bootstrap/dist/css/bootstrap.min.css";
import { FaList } from "react-icons/fa6";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaMoon } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { ProjectContext } from "./ContextAPI/Context/context.tsx";
import { HiOutlineSun } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  let [mode, setMode] = useState("dark-theme");
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const { adminComplain, role, accessComplain } = useContext(ProjectContext)!;
  let navigate = useNavigate();
  //To set the theme or mode
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);
  return (
    <>
      <header>
        <div
          className={
            mode === "light-theme"
              ? "px-1 py-2 text-bg-dark border-bottom text-white"
              : "px-1 py-2 text-bg-light border-bottom text-dark"
          }
        >
          <div className="container-fluid px-2">
            <div className="d-flex align-items-center ">
              <div className="fs-1 fw-bold mt-2 dropdown">
                <FaList
                  className="bi"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </div>

              <ul
                className={`nav ms-auto my-0 text-small  ${mode === "light-theme" ? "lightlink" : "darklink"}`}
              >
                <li>
                  <Link
                    to="/home"
                    className={`nav-link ${mode === "light-theme" ? "lightlink" : "darklink"} visible`}
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <use xlinkHref="#home"></use>
                    </svg>
                    Home
                  </Link>
                </li>
                {role.current == "Admin" && (
                  <li onClick={adminComplain}>
                    <Link
                      to="/admin"
                      className={`nav-link ${mode === "light-theme" ? "lightlink" : "darklink"} visible`}
                    >
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width="24"
                        height="24"
                      >
                        <use xlinkHref="#home"></use>
                      </svg>
                      Admin
                    </Link>
                  </li>
                )}

                {role.current == "User" && (
                  <li onClick={accessComplain}>
                    <Link
                      to="/dashboard"
                      className={`nav-link ${mode === "light-theme" ? "lightlink" : "darklink"} visible`}
                    >
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width="24"
                        height="24"
                      >
                        <use xlinkHref="#speedometer2"></use>
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/register"
                    className={`nav-link ${mode === "light-theme" ? "lightlink" : "darklink"} visible`}
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <use xlinkHref="#table"></use>
                    </svg>
                    Register Complain
                  </Link>
                </li>
              </ul>
              <div className="mx-0 mt-3 mx-sm-4">
                <button
                  type="button"
                  className={
                    mode === "light-theme"
                      ? "btn btn-light text-dark me-2 me-sm-4"
                      : "btn border border-dark text-dark me-2 me-sm-4"
                  }
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/signup")}
                >
                  Sign-up
                </button>
              </div>
              <div
                className="mx-1 mx-sm-2 mt-3"
                onClick={() =>
                  setMode(mode === "light-theme" ? "dark-theme" : "light-theme")
                }
              >
                {mode === "light-theme" ? (
                  <HiOutlineSun className="fs-2" />
                ) : (
                  <FaMoon className="fs-2" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="px-1 py-1 border-bottom mb-1 border-dark navBox"></div>
        <div
          className={` ${isMenuOpen ? "visible_menu-box" : "invisible_menu-box "}`}
        >
          <Link to="/home">Home</Link>
          <Link to="/register">Register Complaint</Link>

          {role.current == "User" && (
            <Link to="/dashboard" onClick={accessComplain}>
              {" "}
              <span>Dashboard </span>
            </Link>
          )}
          {role.current == "Admin" && (
            <Link to="" onClick={adminComplain}>
              Admin
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
