import axios from 'axios';
import React, { useState } from 'react';
import Footer from './Footer';
import { FaHome, FaDollarSign, FaUpload, FaSpinner } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';

const Addhouse = () => {
  // State Hooks
  const [houseName, setHouseName] = useState("");
  const [houseDescription, setHouseDescription] = useState("");
  const [houseCost, setHouseCost] = useState("");
  const [housePhoto, setHousePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Extra hooks
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setHousePhoto(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadHouse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("product_name", houseName);
      data.append("product_description", houseDescription);
      data.append("product_cost", houseCost);
      if (housePhoto) {
        data.append("product_photo", housePhoto);
      }

      const response = await axios.post(
        "https://lup3n.pythonanywhere.com/api/addproduct", 
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess(response.data.message || "House added successfully!");
      setHouseName("");
      setHouseDescription("");
      setHouseCost("");
      setHousePhoto(null);
      setPreviewImage("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add house. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="flex-grow-1 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white">
                  <h2 className="text-center my-2">
                    <FaHome className="me-2" />
                    Add New Property
                  </h2>
                </div>
                <div className="card-body p-4 p-md-5">
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

                  <form onSubmit={uploadHouse}>
                    <div className="mb-4">
                      <label className="form-label fw-bold">Property Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaHome />
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter property name"
                          value={houseName}
                          onChange={(e) => setHouseName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Description</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <MdDescription />
                        </span>
                        <textarea
                          className="form-control form-control-lg"
                          rows="4"
                          placeholder="Describe the property features, location, amenities..."
                          value={houseDescription}
                          onChange={(e) => setHouseDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Price ($)</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaDollarSign />
                        </span>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="Enter price per night"
                          value={houseCost}
                          onChange={(e) => setHouseCost(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Property Image</label>
                      <div className="border rounded p-3 text-center">
                        {previewImage ? (
                          <div className="mb-3">
                            <img 
                              src={previewImage} 
                              alt="Preview" 
                              className="img-fluid rounded mb-3" 
                              style={{maxHeight: '200px'}}
                            />
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                setHousePhoto(null);
                                setPreviewImage("");
                              }}
                            >
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <div className="file-upload-wrapper">
                            <div className="d-flex flex-column align-items-center">
                              <FaUpload className="display-4 text-muted mb-2" />
                              <p className="text-muted">Drag & drop an image or click to browse</p>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          className="form-control d-none"
                          id="housePhoto"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <label 
                          htmlFor="housePhoto" 
                          className="btn btn-outline-primary w-100 mt-2"
                        >
                          Choose Image
                        </label>
                      </div>
                    </div>

                    <div className="d-grid mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="fa-spin me-2" />
                            Adding Property...
                          </>
                        ) : (
                          'Add Property'
                        )}
                      </button>
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

export default Addhouse;