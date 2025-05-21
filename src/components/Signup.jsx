import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Signup = () => {
    // Create Hooks that wil enable you to store information entered by the user on the Form
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[number, setNumber] = useState("");

  // Initialize 3 additional hooks to store the state of an app when the signup button is clicked.
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create a function to hold the Submit logic
  const submit = async (e) =>{
    // Prevent your site from reloading
    e.preventDefault();

    // Update the loading hook with a message
    setLoading("Please wait as we submit your deatils to the System...")

    try{
        // Create a form data object that will hold the Signup details
      const data = new FormData();

      // Add/append the different information onto the form data
      data.append("username", username)
      data.append("email",email)
      data.append("password", password)
      data.append("phone", number)

      // Post your data through your endpoint
      // We use axios which is a library that enables to interact with HTTP requests
      const response = await axios.post("https://lup3n.pythonanywhere.com/api/signup", data);

      // Updating the loading backto default
      setLoading("");

      // Update the success hook with the response message
      setSuccess(response.data.message)

      // Clear the hooks for the form input fields
      setUsername("");
      setEmail("");
      setPassword("");
      setNumber("");

    }
    catch(error){
        setLoading("");
        setError(error.message)
    }
  }
  return (
    <div className="row justify-content-center mt-3">
        <div className="col-md-6 card shadow p-2">
            <h1>Sign Up</h1>

            <b className="text-success">{loading}</b>
            <b className="text-success">{success}</b>
            <b className="text-danger">{error}</b>

            <form onSubmit={submit}>
                <input 
                type="text"
                placeholder='Enter your Username'
                required
                value={username}
                className='form-control'
                onChange={(e) => setUsername(e.target.value)} /> <br />

                {/* {username} */}

                <input 
                type="email"
                placeholder='Enter your Email Address'
                required
                value={email}
                className='form-control'
                onChange={(e) => setEmail(e.target.value)} /> <br />

                {/* {email} */}

                <input 
                type="password"
                placeholder='Enter your Password'
                value={password}
                className='form-control'
                required
                onChange={(e) => setPassword(e.target.value)} /> <br />

                {/* {password} */}

                <input 
                type="number"
                placeholder='Enter your Phone Number'
                required
                className='form-control'
                value={number}
                onChange={(e) => setNumber(e.target.value)} /> <br />

                {/* {number} */}

        <button className="btn btn-outline-info">Sign Up</button>
        <p>Already have an account? <Link to={'/signin'} className="text-info">Sign In</Link></p>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Signup
