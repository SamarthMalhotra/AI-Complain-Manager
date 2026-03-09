import "bootstrap/dist/css/bootstrap.min.css";
import { FaList } from "react-icons/fa6";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaMoon } from "react-icons/fa";
import { useRef, useState } from "react";
import { HiOutlineSun } from "react-icons/hi2";
const Navbar = () => {
  let admin = useRef(false);
  let [mode, setMode] = useState("dark");
  return (
    <header>
      <div
        className={
          mode === "light"
            ? "px-1 py-2 text-bg-dark border-bottom text-white"
            : "px-1 py-2 text-bg-light border-bottom text-black"
        }
      >
        <div className="container-fluid px-2">
          <div className="d-flex align-items-center ">
            <div className="fs-2 fw-bold mt-2">
              <FaList className="bi" />
            </div>

            <ul className="nav ms-auto my-0 text-small">
              <li>
                <a href="#" className="nav-link">
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <use xlinkHref="#home"></use>
                  </svg>
                  Home
                </a>
              </li>
              {admin.current && (
                <li>
                  <a href="#" className="nav-link">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <use xlinkHref="#home"></use>
                    </svg>
                    Admin
                  </a>
                </li>
              )}
              <li>
                <a href="#" className="nav-link">
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <use xlinkHref="#speedometer2"></use>
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <use xlinkHref="#table"></use>
                  </svg>
                  Register Complain
                </a>
              </li>
            </ul>
            <div className="mx-4 mt-4">
              <button
                type="button"
                className={
                  mode === "light"
                    ? "btn btn-light text-light me-4"
                    : "btn border border-dark text-dark me-4"
                }
              >
                Login
              </button>
              <button type="button" className="btn btn-primary">
                Sign-up
              </button>
            </div>
            <div className="mx-2 mt-4">
              {mode === "light" ? (
                <HiOutlineSun className="fs-2" />
              ) : (
                <FaMoon className="fs-2" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-2 border-bottom mb-3"></div>
    </header>
  );
};

export default Navbar;
