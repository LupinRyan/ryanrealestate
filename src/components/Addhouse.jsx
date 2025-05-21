import axios from 'axios';
import React, { useState } from 'react'
import Footer from './Footer';

const Addhouse = () => {
  // State Hooks
  const [houseName,setHouseName] = useState("");
  const [houseDescription,setHouseDescription] = useState("");
  const [houseCost,setHouseCost] = useState("");
  const [housePhoto,setHousePhoto] = useState("")

  // Extra hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create the function the will handle the submit action
  const uploadHouse = async(e) =>{
    // Prevent from loading
    e.preventDefault();

    // Updating loading hook with a message
    setLoading("Please wait as your House is being Uploaded..");
    
    try{
      // Create a new form data object
      const data = new FormData()

      // Add different details
      data.append("product_name",houseName)
      data.append("product_description",houseDescription)
      data.append("product_cost",houseCost)
      data.append("product_photo",housePhoto)

      // Post your data through your endpoint
      // We use axios which is a library that enables to interact with HTTP requests
      const response = await axios.post("https://lup3n.pythonanywhere.com/api/addproduct", data);

      // Set loading back to default
      setLoading("");

      // Update the success hook with a message
      setSuccess(response.data.message)

      // Clearing the hooks
      setHouseName("");
      setHouseDescription("");
      setHouseCost("");
      setHousePhoto("");
    }
    catch(error){
      setLoading("");

      setError(error.message)
    }
  }
  return (
    <div className="row justify-content-center mt-3">
      <div className="col-md-6 card shadow p-3">
        <h3>Welcome to the Add House Page</h3>

      <b className="text-success">{loading}</b>
      <b className="text-success">{success}</b>
      <b className="text-danger">{error}</b>

        <form onSubmit={uploadHouse}>
          <input 
          type="text"
          placeholder='Enter your House Name...'
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
          required
          className='form-control' /> <br />

          {/* {houseName} */}

          <textarea 
          required
          placeholder='Please put the Description of the House...'
          value={houseDescription}
          onChange={(e) => setHouseDescription(e.target.value)}
          className='form-control'></textarea><br />
          {/* {houseDescription} */}

          <input 
          type="number"
          required
          onChange={(e) => setHouseCost(e.target.value)}
          className='form-control'
          value={houseCost}
          placeholder='Enter the Price of the House...' /> <br />
          {/* {houseCost} */}

          <label>Choose an Image for the House</label>
          <input 
          type="file"
          className='form-control'
          accept='/*'
          onChange={(e) => setHousePhoto(e.target.files[0])} /> <br /><br />

          <input type="submit" value="Add House" className='btn btn-info' />
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Addhouse
