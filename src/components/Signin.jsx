import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Signin = () => {
  // State variables for form inputs and UI feedback
  const [email, setEmail] = useState("");        // Stores user's email input
  const [password, setPassword] = useState("");  // Stores user's password input
  const [loading, setLoading] = useState(false); // Tracks loading state during API call
  const [success, setSuccess] = useState("");    // Stores success message
  const [error, setError] = useState("");        // Stores error message
  const navigate = useNavigate();                // Hook for programmatic navigation

  // Handle form submission for login
  const login = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    setLoading(true);    // Set loading state to true
    setError("");        // Clear any previous errors
    setSuccess("");      // Clear any previous success messages
    
    try {
      // Prepare form data for API request
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      // Make POST request to login endpoint
      const response = await axios.post("https://lup3n.pythonanywhere.com/api/signin", data);

      // Check if login was successful (user data exists in response)
      if (response.data.user) {
        setSuccess("Login successful! Redirecting...");
        // Redirect to home page after 1.5 seconds
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      // Handle errors from API or network issues
      setError(error.response?.data?.message || "An error occurred during login.");
    } finally {
      // Reset loading state regardless of success/failure
      setLoading(false);
    }
  };

  return (
    // Main container with minimum viewport height and flex layout
    <div className="min-vh-100 d-flex flex-column">
      {/* Centered content area that grows to fill available space */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            {/* Responsive column sizing for different screen widths */}
            <div className="col-lg-6 col-md-8 col-sm-10">
              {/* Card component for the login form */}
              <div className="card shadow-lg border-0 rounded-lg">
                {/* Card header with title */}
                <div className="card-header bg-primary text-white">
                  <h3 className="text-center font-weight-light my-4">
                    <FaUser className="mr-2" /> Sign In
                  </h3>
                </div>
                
                {/* Card body containing the form */}
                <div className="card-body">
                  {/* Success message display */}
                  {success && (
                    <div className="alert alert-success text-center">
                      {success}
                    </div>
                  )}
                  
                  {/* Error message display */}
                  {error && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}
                  
                  {/* Login form */}
                  <form onSubmit={login}>
                    {/* Email input field */}
                    <div className="form-floating mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <MdEmail />  {/* Email icon */}
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
                    
                    {/* Password input field */}
                    <div className="form-floating mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />  {/* Lock icon */}
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
                    
                    {/* Form actions */}
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                      {/* Link to signup page */}
                      <Link to="/signup" className="text-primary">
                        Need an account? Sign Up
                      </Link>
                      
                      {/* Submit button with loading state */}
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
                
                {/* Card footer with forgot password link */}
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
      
      {/* Footer component at the bottom of the page */}
      <Footer />
    </div>
  );
};

export default Signin;