import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Makepayment = () => {
  const { houses } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const payNow = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we process your payment...");
    setSuccess("");
    setError("");

    try {
      const data = new FormData();
      data.append("amount", houses.product_cost);
      data.append("phone", phone);

      const response = await axios.post("https://lup3n.pythonanywhere.com/api/mpesa_payment", data);
      setLoading("");
      setSuccess(response.data.message);
      setPhone("");
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.message || "Payment failed. Please try again.");
    }
  };

  const img_url = "https://lup3n.pythonanywhere.com/static/images/";

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="row">
                {/* Product Image Section */}
                <div className="col-md-6 mb-4 mb-md-0">
                  <div className="d-flex flex-column h-100">
                    <img 
                      src={img_url + houses.product_photo} 
                      alt={houses.product_name}
                      className="img-fluid rounded mb-4"
                      style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                    <div className="mt-auto">
                      <h2 className="text-primary mb-3">{houses.product_name}</h2>
                      <p className="text-muted">{houses.product_description}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Form Section */}
                <div className="col-md-6">
                  <div className="h-100 d-flex flex-column">
                    <div className="mb-4">
                      <h3 className="text-danger mb-3">Kes {houses.product_cost.toLocaleString()}</h3>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-success p-2 rounded mr-2">
                          <i className="fas fa-mobile-alt text-white"></i>
                        </div>
                        <h4 className="text-success mb-0">LIPA NA M-PESA</h4>
                      </div>
                    </div>

                    <form onSubmit={payNow} className="mt-auto">
                      {/* Status Messages */}
                      {loading && (
                        <div className="alert alert-info d-flex align-items-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          {loading}
                        </div>
                      )}
                      {success && (
                        <div className="alert alert-success d-flex align-items-center">
                          <i className="fas fa-check-circle mr-2"></i>
                          {success}
                        </div>
                      )}
                      {error && (
                        <div className="alert alert-danger d-flex align-items-center">
                          <i className="fas fa-exclamation-circle mr-2"></i>
                          {error}
                        </div>
                      )}

                      <div className="form-group mb-4">
                        <label htmlFor="amount" className="font-weight-bold">Amount (KES)</label>
                        <input
                          type="text"
                          id="amount"
                          value={houses.product_cost.toLocaleString()}
                          readOnly
                          className="form-control form-control-lg bg-light"
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="phone" className="font-weight-bold">M-PESA Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="2547XXXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control form-control-lg"
                          required
                        />
                        <small className="form-text text-muted">Format: 2547XXXXXX</small>
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-success btn-lg btn-block py-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-lock mr-2"></i>
                            Pay Now
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 pt-3 border-top">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-shield-alt text-success mr-2"></i>
                        <small className="text-muted">Secure payment with M-PESA</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;