import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaSpinner } from "react-icons/fa";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      data.append("phone", number);

      const response = await axios.post(
        "https://lup3n.pythonanywhere.com/api/signup", 
        data
      );

      setSuccess(response.data.message || "Registration successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setNumber("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-gradient-primary text-dark">
                  <h2 className="text-center my-3">
                    Create Your Account
                  </h2>
                </div>
                <div className="card-body p-5">
                  {success && (
                    <div className="alert alert-success text-center">
                      {success}
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}

                  <form onSubmit={submit}>
                    <div className="mb-4">
                      <label className="form-label fw-bold">Username</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter your username"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Create a password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-text">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          placeholder="Enter your phone number"
                          required
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="d-grid gap-2 mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="fa-spin me-2" />
                            Registering...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      <p className="mb-0">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-primary fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;