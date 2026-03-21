import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../ContextAPI/Context/context";
import { TailSpin } from "react-loader-spinner";
const Login = () => {
  let { formData, handleOnChange, handleLogin, submit } =
    useContext(ProjectContext)!;

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
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100 justify-content-center">
              <div className="col-19 col-sm-10 col-md-6 col-lg-5 col-xl-4">
                <div className="card shadow-lg border-0 rounded-4">
                  <div className="card-body p-4">
                    <h3 className="text-center mb-4 fw-bold">Welcome Back</h3>

                    <form onSubmit={handleLogin}>
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
                          onChange={handleOnChange}
                          name="password"
                          value={formData.password}
                          minLength={6}
                          maxLength={20}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="remember"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>

                        {/* <Link to="#" className="text-decoration-none">
                      Forgot Password?
                    </Link>*/}
                      </div>

                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Login
                        </button>
                      </div>

                      <p className="text-center mt-3 mb-0">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-decoration-none">
                          Sign Up
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
