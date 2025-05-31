import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMobileAlt, FaUser, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import Footer from './Footer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.product_cost), 0);
    const tax = subtotal * 0.16;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + tax).toFixed(2)
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Convert to 254 format if it starts with 0 or 254
    if (digits.startsWith('0') && digits.length === 10) {
      return '254' + digits.substring(1);
    } else if (digits.startsWith('254') && digits.length === 12) {
      return digits;
    } else if (digits.length === 9) {
      return '254' + digits;
    }
    return digits; // return as is if doesn't match expected patterns
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPaymentInitiated(false);

    // Format and validate phone number
    const formattedPhone = formatPhoneNumber(formData.phone);
    if (!formattedPhone.match(/^2547[0-9]{8}$/)) {
      setError('Please enter a valid Kenyan phone number (e.g. 07XXXXXXXX or 2547XXXXXXXX)');
      setLoading(false);
      return;
    }

    try {
      const totals = calculateTotal();
      const mpesaAmount = Math.ceil(parseFloat(totals.total)); // Round up to whole number
      
      // Prepare the order data
      const orderData = {
        customer_info: {
          name: formData.name,
          email: formData.email,
          phone: formattedPhone
        },
        items: cartItems.map(item => ({
          product_name: item.product_name,
          quantity: 1,
          price: item.product_cost
        })),
        total_amount: totals.total,
        payment_method: 'mpesa'
      };

      console.log('Submitting order:', orderData);
      console.log('MPesa amount:', mpesaAmount);

      // Step 1: Create the order
      const orderResponse = await axios.post(
        'https://lup3n.pythonanywhere.com/api/orders',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || 'Failed to create order');
      }

      // Step 2: Initiate M-Pesa payment
      const paymentFormData = new FormData();
      paymentFormData.append('amount', mpesaAmount.toString());
      paymentFormData.append('phone', formattedPhone);

      console.log('Initiating M-Pesa payment with:', {
        amount: mpesaAmount,
        phone: formattedPhone
      });

      const paymentResponse = await axios.post(
        'https://lup3n.pythonanywhere.com/api/mpesa_payment',
        paymentFormData
      );

      if (!paymentResponse.data.success) {
        throw new Error(paymentResponse.data.message || 'Payment initiation failed');
      }

      // If everything succeeded
      setPaymentInitiated(true);
      
      // Navigate to confirmation
      navigate('/confirmation', {
        state: {
          order: orderResponse.data.order,
          payment: paymentResponse.data,
          customer: orderData.customer_info,
          items: orderData.items,
          summary: {
            subtotal: totals.subtotal,
            tax: totals.tax,
            total: mpesaAmount.toString() // Use the rounded amount
          },
          timestamp: new Date().toISOString()
        }
      });

    } catch (err) {
      console.error('Checkout error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 
              err.message || 
              'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotal();
  const displayAmount = Math.ceil(parseFloat(totals.total)); // Rounded amount for display

  return (
    <div className="checkout-page bg-light">
      <div className="container py-5">
        <button 
          className="btn btn-back mb-4"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          <FaArrowLeft className="me-2" />
          Back to Cart
        </button>

        <h1 className="text-center mb-5">
          <FaMobileAlt className="me-3 text-success" />
          M-Pesa Checkout
        </h1>

        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <h4 className="mb-0">Order Summary</h4>
              </div>
              <div className="card-body">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="checkout-item mb-3 pb-3 border-bottom">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img 
                          src={`https://lup3n.pythonanywhere.com/static/images/${item.product_photo}`}
                          alt={item.product_name}
                          className="img-fluid rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80?text=Product';
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h6 className="mb-1">{item.product_name}</h6>
                        {item.product_description && (
                          <small className="text-muted">
                            {item.product_description.substring(0, 50)}...
                          </small>
                        )}
                      </div>
                      <div className="col-md-4 text-end">
                        <span className="text-dark fw-bold">
                          KES {parseFloat(item.product_cost).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">Payment Details</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength="3"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number (M-Pesa Registered)</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaMobileAlt />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 0712345678 or 254712345678"
                        required
                        disabled={loading}
                      />
                    </div>
                    <small className="text-muted">Enter your M-Pesa registered phone number</small>
                  </div>

                  {error && (
                    <div className="alert alert-danger mb-4">
                      {error}
                      {error.includes('try again') && (
                        <button 
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={handleSubmit}
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  )}

                  <div className="alert alert-info mb-4">
                    <h5 className="alert-heading">How to Pay with M-Pesa</h5>
                    <ol className="mb-0">
                      <li>Enter your M-Pesa registered phone number</li>
                      <li>Click "Complete Purchase"</li>
                      <li>Check your phone for an M-Pesa prompt</li>
                      <li>Enter your M-Pesa PIN to complete payment</li>
                    </ol>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-mpesa w-100 py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Initiating M-Pesa Payment...
                      </>
                    ) : (
                      <>
                        <FaMobileAlt className="me-2" />
                        Complete Purchase for KES {displayAmount.toLocaleString()}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-header bg-white">
                <h4 className="mb-0">Order Total</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>KES {totals.subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax (16%):</span>
                  <span>KES {totals.tax}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 pt-3 border-top fw-bold fs-5">
                  <span>Total:</span>
                  <span className="text-success">
                    KES {displayAmount.toLocaleString()}
                  </span>
                </div>
                
                <div className="mpesa-info mt-4 p-3 rounded text-center bg-light">
                  <FaMobileAlt className="me-2 text-success" size={24} />
                  <h5 className="mt-2 mb-1">M-Pesa Payment</h5>
                  <p className="small mb-0">
                    {paymentInitiated 
                      ? "Payment initiated! Check your phone." 
                      : "You'll receive an M-Pesa prompt after checkout"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .checkout-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .btn-back {
          background: linear-gradient(45deg, #6c757d 0%, #495057 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .btn-back:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
        }
        .btn-back:disabled {
          opacity: 0.7;
        }
        .checkout-item img {
          max-height: 80px;
          max-width: 80px;
          object-fit: contain;
        }
        .btn-mpesa {
          background: linear-gradient(45deg, #00B300 0%, #008000 100%);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: bold;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 179, 0, 0.3);
        }
        .btn-mpesa:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 179, 0, 0.4);
        }
        .btn-mpesa:disabled {
          opacity: 0.7;
          transform: none !important;
        }
        .mpesa-info {
          border: 1px solid #dee2e6;
          transition: all 0.3s ease;
        }
        .mpesa-info:hover {
          background-color: #f8f9fa !important;
        }
        .input-group-text {
          background-color: #f8f9fa;
        }
        .card {
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card-header {
          font-weight: 600;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default Checkout;