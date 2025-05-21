import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageCarousel from './Carousel';
import Footer from './Footer';

const Gethouses = () => {
  // Creating Hooks
  const [loading,setLoading] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  // Create a hook that will hold all products fetched from the API
  const [houses,setHouses] = useState([]);

  // console.log(products)

  // Specifying the image URL
  const img_url = "https://lup3n.pythonanywhere.com/static/images/"

  // Creating a function that will help fetch the different Houses
  const fetchHouses = async () =>{
    // Updating the loading hook with a message
    setLoading("Please wait as we Retrieve your Houses...")

    try{
      // Accessing API using Axios
      const response = await axios.get("https://lup3n.pythonanywhere.com/api/getproducts")

      // Update the products hook with diff houses fetched from API
      setHouses(response.data);

      // Set loading hook back to default
      setLoading("");

    }
    catch(error){
      setLoading("");

      setError(error.message)
    }
  }

  // Below is where we shall use the useEffect hook that will call the fetchproducts function anytime a person accesses the getproducts component
  useEffect(() => {fetchHouses()}, []);

  // Create a hook that will hold those products that matches whatever the user will be typing
  const [search, setSearch] = useState("");

  const filtered_houses = houses.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()) ||
    item.product_description.toLowerCase().includes(search.toLowerCase)
  );


  return (
  <div>
    
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
      <h3 className="text-info mt-2">Available Products</h3>
        {/* Below is the input of the Search Function */}
    <input 
    type="search"
    placeholder="Search for any House here..." 
    className="form-control"
    value={search}
    onChange={(e) => setSearch(e.target.value)} /> <br />

    {/* {search} */}
      </div>
      <div className="col-md-4"></div>
    </div>
    <div className="row p-3">

    <ImageCarousel/>
    <h1 className="text-success">{loading}</h1>
    <b className="text-danger">{error}</b>

    {filtered_houses.map((houses) => (

    <div className="col-md-3 justify-content-center mt-2">
      <div className="card shadow p-1">
        <img src={img_url + houses.product_photo} alt="" className="product_img" />


        {/* Product Details comes in... */}
        <div className="card-body">
          <h5 className="text-primary">{houses.product_name.slice(0,30)}</h5>
          <p className="text-muted">{houses.product_description.slice(0,30)} ...</p>
          <b className="text-warning"> <span className="text-dark">KES</span> {houses.product_cost}</b> <br />
          <button className="btn btn-info" onClick={() => navigate("/makepayment",{state : {houses}})}>Buy Now!</button>

        </div>
      </div>
    </div>
    ))}

  </div>
  <Footer/>
  </div>
  )
}

export default Gethouses
