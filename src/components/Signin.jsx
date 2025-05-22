import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post("https://lup3n.pythonanywhere.com/api/signin", data);

      if (response.data.user) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-white">
                  <h3 className="text-center font-weight-light my-4">
                    <FaUser className="mr-2" /> Sign In
                  </h3>
                </div>
                <div className="card-body">
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
                  
                  <form onSubmit={login}>
                    <div className="form-floating mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <MdEmail />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail"
                          placeholder="name@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="inputEmail">Email address</label>
                      </div>
                    </div>
                    
                    <div className="form-floating mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                      <Link to="/signup" className="text-primary">
                        Need an account? Sign Up
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="fa-spin mr-2" />
                            Signing In...
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center py-3">
                  <Link to="/forgot-password" className="small">
                    Forgot Password?
                  </Link>
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

export default Signin;