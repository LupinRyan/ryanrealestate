import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Signin = () => {

  // (2)Initialize hooks to help in storing data entered by the user on the form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // (3) Initialize 3 additional hooks to manage the state of the app
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // (16) Create a navigate hook that redirects a user to another page after a successful login
    const navigate = useNavigate();

    // (4)Create a function to hold the user Sign In
    const login = async (e) => {

        // (5) Prevent your site from reloading
        e.preventDefault();

        // (6) Update the loading hook with a message
        setLoading("Please wait as we confirm your Signin details...")
        try{
            // (10) Create a form data object
            const data = new FormData();

            // (11)Add/append the different information onto the form data (email,password)
            data.append("email",email);
            data.append("password",password);

            // (12) Post your data through your API
            const response = await axios.post("https://lup3n.pythonanywhere.com/api/signin", data)

            // (14) Check whether the details return for the API contain a key user
            if(response.data.user){
                setLoading("");
                setSuccess("The Login was successful")

                navigate("/");
            }
            else{
                setLoading("");
                setError("Invalid Login Details. Please try again...");
            }
        }
        catch(error){
            setLoading("");
            setError(error.message);
        }
    }
  return (
    <div className="row justify-content-center mt-3">
        <div className="col-md-6 row card shadow p-2">
            <h1>Sign In</h1>

            <b className="text-success">{loading}</b>
            <b className="text-success">{success}</b>
            <b className="text-danger">{error}</b>
            
            <form onSubmit={login}>
                <input 
                type="email"
                placeholder='Enter Your Email Address'
                required
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)} /> <br />

                {/* {email} */}

                <input 
                type="password"
                placeholder='Enter the password'
                required
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)} /> <br />

                {/* {password} */}

                <input type="submit" value="Sign in" className='btn btn-outline-success' /> <br /> <br />
                <p>Don't have an account? <Link to={'/signup'} className='text-info'>Sign Up</Link></p>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Signin;
