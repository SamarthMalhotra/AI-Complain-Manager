import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ProjectContext } from "../ContextAPI/Context/context";
const Signup = () => {
  let { formData, handleSignup, handleOnChange } = useContext(ProjectContext)!;
  return (
    <>
      <div className="container-fluid  min-vh-100 d-flex align-items-center justify-content-center">
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
          <div className="row w-100 justify-content-center">
            <div className="col-19 col-sm-10 col-md-6 col-lg-5 col-xl-4">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                  <h3 className="text-center mb-4 fw-bold">Create Account</h3>

                  <form onSubmit={handleSignup}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Username</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleOnChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Password (Must be at least 6 characters)
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                        minLength={6}
                        maxLength={20}
                        required
                      />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Sign Up
                      </button>
                    </div>

                    <p className="text-center mt-3 mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-decoration-none">
                        Login
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
