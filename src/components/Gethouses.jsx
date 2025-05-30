// Import necessary React hooks and components
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageCarousel from './Carousel';
import Footer from './Footer';
import { FaComments, FaShoppingCart } from 'react-icons/fa';

const Gethouses = () => {
  // STATE MANAGEMENT:
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const img_url = "https://lup3n.pythonanywhere.com/static/images/";
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // API FETCH FUNCTION:
  const fetchHouses = async () => {
    setLoading("🔍 Scanning the galaxy for luxury homes...");
    try {
      const response = await axios.get("https://lup3n.pythonanywhere.com/api/getproducts");
      setHouses(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  }

  // EFFECT HOOK:
  useEffect(() => { fetchHouses() }, []);

  // ADD TO CART FUNCTION:
  const addToCart = (house) => {
    setCartItems([...cartItems, house]);
  };

  // SEARCH FILTER:
  const filtered_houses = houses.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()) ||
    item.product_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light">
      {/* HERO SECTION */}
      <div className="bg-dark text-white py-5 mb-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Lupin's Crest Luxury Real Estate 🏰</h1>
          <p className="lead">Discover your dream home among our exclusive properties</p>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="container">
        {/* SEARCH SECTION */}
        <div className="row mb-5">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h3 className="text-center text-info mb-4">Find Your Perfect Home</h3>
                <div className="input-group">
                  <input
                    type="search"
                    placeholder="🔍 Search by name or description..."
                    className="form-control form-control-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="btn btn-info btn-lg" type="button">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOADING INDICATOR */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-info mt-3">{loading}</h4>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="alert alert-danger text-center">
            <b>Error: {error}</b>
          </div>
        )}

        {/* IMAGE CAROUSEL COMPONENT */}
        <div className="mb-5">
          <ImageCarousel />
        </div>

        {/* PROPERTIES GRID */}
        <h2 className="text-center mb-4">Available Properties</h2>
        <div className="row g-4">
          {filtered_houses.length > 0 ? (
            filtered_houses.map((house) => (
              <div className="col-md-4 col-lg-3" key={house.id}>
                <div className="card h-100 shadow-sm border-0 overflow-hidden">
                  <div className="position-relative">
                    <img 
                      src={img_url + house.product_photo} 
                      alt={house.product_name} 
                      className="card-img-top house-image"
                    />
                    <div className="price-badge">
                      <span className="badge bg-warning text-dark">
                        KES {house.product_cost}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{house.product_name.slice(0, 30)}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {house.product_description.slice(0, 60)}...
                    </p>
                    <div className="d-flex justify-content-between mt-auto">
                      <button 
                        className="btn btn-buy-now"
                        onClick={() => navigate("/makepayment", { state: { houses: house } })}
                      >
                        Buy Now!
                      </button>
                      <button 
                        className="btn btn-add-to-cart"
                        onClick={() => addToCart(house)}
                      >
                        <FaShoppingCart className="me-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="col-12 text-center py-5">
                <h4 className="text-muted">No properties found matching your search</h4>
              </div>
            )
          )}
        </div>
      </div>

      {/* CART BUTTON (FLOATING) */}
      {cartItems.length > 0 && (
        <div className="cart-floating-button">
          <button 
            className="btn btn-warning btn-cart-floating"
            onClick={() => navigate("/cart", { state: { cartItems } })}
          >
            <FaShoppingCart className="me-2" />
            <span className="cart-count">{cartItems.length}</span>
            View Cart
          </button>
        </div>
      )}

      {/* CHATBOT BUTTON */}
      <div className="chatbot-button-container">
        <button 
          className="btn btn-success chatbot-button"
          onClick={() => navigate("/chatbot")}
        >
          <FaComments className="me-2" />
          Need Help with anything? Chat with Lupin!
        </button>
      </div>

      {/* FOOTER COMPONENT */}
      <Footer />
      
      {/* INLINE STYLES */}
      <style jsx>{`
        .house-image {
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .card:hover .house-image {
          transform: scale(1.05);
        }
        .price-badge {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .btn-buy-now {
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          border: none;
          color: white;
          font-weight: bold;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
          transition: all 0.3s ease;
        }
        .btn-buy-now:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 242, 254, 0.4);
        }
        .btn-add-to-cart {
          background: linear-gradient(45deg, #FFD700 0%, #DAA520 100%);
          border: none;
          color: #000;
          font-weight: bold;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 14px;
          box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        .btn-add-to-cart:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(218, 165, 32, 0.4);
          color: #000;
        }
        .chatbot-button-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
        }
        .chatbot-button {
          padding: 12px 20px;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          font-weight: bold;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        .chatbot-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }
        .cart-floating-button {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 1000;
        }
        .btn-cart-floating {
          padding: 12px 20px;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
          font-weight: bold;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          background: linear-gradient(45deg, #FFD700 0%, #DAA520 100%);
          color: #000;
        }
        .btn-cart-floating:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(218, 165, 32, 0.4);
        }
        .cart-count {
          background: #fff;
          color: #000;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default Gethouses;