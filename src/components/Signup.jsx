import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaSpinner } from "react-icons/fa";

const Signup = () => {
  // State variables to store form data and UI states
  const [username, setUsername] = useState(""); // Stores username input
  const [email, setEmail] = useState(""); // Stores email input
  const [password, setPassword] = useState(""); // Stores password input
  const [number, setNumber] = useState(""); // Stores phone number input
  const [loading, setLoading] = useState(false); // Tracks loading state during API call
  const [success, setSuccess] = useState(""); // Stores success message
  const [error, setError] = useState(""); // Stores error message

  // Form submission handler
  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages

    try {
      // Create FormData object to send form data
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      data.append("phone", number);

      // Make POST request to signup API endpoint
      const response = await axios.post(
        "https://lup3n.pythonanywhere.com/api/signup", 
        data
      );

      // On successful registration:
      setSuccess(response.data.message || "Registration successful!"); // Set success message
      // Clear form fields
      setUsername("");
      setEmail("");
      setPassword("");
      setNumber("");
    } catch (error) {
      // Handle errors from API call
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false); // Reset loading state regardless of success/failure
    }
  };

  return (
    // Main container with minimum viewport height and flex layout
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Centered content area that grows to fill available space */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              {/* Card container for the signup form */}
              <div className="card shadow-lg border-0">
                {/* Card header with title */}
                <div className="card-header bg-gradient-primary text-dark">
                  <h2 className="text-center my-3">
                    Create Your Account
                  </h2>
                </div>
                {/* Card body containing the form */}
                <div className="card-body p-5">
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

                  {/* Signup form */}
                  <form onSubmit={submit}>
                    {/* Username input field */}
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

                    {/* Email input field */}
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

                    {/* Password input field */}
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

                    {/* Phone number input field */}
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

                    {/* Submit button */}
                    <div className="d-grid gap-2 mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {/* Show spinner when loading, otherwise show "Create Account" */}
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

                    {/* Link to signin page for existing users */}
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
      {/* Footer component at the bottom of the page */}
      <Footer />
    </div>
  );
};

export default Signup;