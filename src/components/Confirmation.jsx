import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaCheckCircle, 
  FaShoppingBag, 
  FaPhone, 
  FaEnvelope, 
  FaHome, 
  FaClock, 
  FaReceipt,
  FaUser 
} from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import Footer from './Footer';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [copied, setCopied] = useState(false);

  // Fetch order details if not passed in state
  useEffect(() => {
    if (!order && location.search) {
      const searchParams = new URLSearchParams(location.search);
      const orderId = searchParams.get('order_id');
      
      if (orderId) {
        fetchOrderDetails(orderId);
      } else {
        setError('No order information found');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [order, location.search]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`https://lup3n.pythonanywhere.com/api/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.order);
      } else {
        setError(response.data.message || 'Failed to fetch order details');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching order details');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p>{error || 'No order information available'}</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Safely access nested properties
  const customerName = order.customer_info?.name || 'Customer';
  const customerEmail = order.customer_info?.email || 'Not provided';
  const customerPhone = order.customer_info?.phone || 'Not provided';

  return (
    <div className="confirmation-page bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 overflow-hidden mb-4">
              <div className="confirmation-header p-5 text-center bg-success text-white position-relative">
                <div className="confirmation-icon mb-4">
                  <FaCheckCircle size={80} className="text-white" />
                </div>
                <h1 className="display-5 fw-bold mb-3">Order Confirmed!</h1>
                <p className="lead mb-0">
                  Thank you for your purchase, {customerName}!
                </p>
                <div className="position-absolute top-0 end-0 p-3 bg-white text-success rounded-bl-lg">
                  <span className="fw-bold">#{order.order_id}</span>
                </div>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title d-flex align-items-center">
                          <FaShoppingBag className="me-2 text-success" />
                          Order Summary
                        </h5>
                        <ul className="list-unstyled">
                          <li className="d-flex justify-content-between py-2 border-bottom">
                            <span>Status:</span>
                            <span className={`badge bg-${order.status === 'completed' ? 'success' : 'warning'}`}>
                              {order.status?.toUpperCase() || 'PENDING'}
                            </span>
                          </li>
                          <li className="d-flex justify-content-between py-2 border-bottom">
                            <span>Date:</span>
                            <span>{order.created_at ? new Date(order.created_at).toLocaleString() : 'Not available'}</span>
                          </li>
                          <li className="d-flex justify-content-between py-2 border-bottom">
                            <span>Items:</span>
                            <span>{order.items?.length || 0}</span>
                          </li>
                          <li className="d-flex justify-content-between py-2 border-bottom">
                            <span>Payment Method:</span>
                            <span className="text-capitalize">{order.payment_method || 'Not specified'}</span>
                          </li>
                          <li className="d-flex justify-content-between py-2 fw-bold">
                            <span>Total Paid:</span>
                            <span className="text-success">KES {order.total_amount?.toLocaleString() || '0'}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title d-flex align-items-center">
                          <FaUser className="me-2 text-success" />
                          Customer Details
                        </h5>
                        <ul className="list-unstyled">
                          <li className="d-flex align-items-center py-2 border-bottom">
                            <FaUser className="me-2 text-muted" />
                            <span>{customerName}</span>
                          </li>
                          <li className="d-flex align-items-center py-2 border-bottom">
                            <FaEnvelope className="me-2 text-muted" />
                            <span>{customerEmail}</span>
                          </li>
                          <li className="d-flex align-items-center py-2 border-bottom">
                            <FaPhone className="me-2 text-muted" />
                            <div className="d-flex justify-content-between w-100">
                              <span>{customerPhone}</span>
                              {customerPhone !== 'Not provided' && (
                                copied ? (
                                  <span className="badge bg-success">Copied!</span>
                                ) : (
                                  <button 
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => copyToClipboard(customerPhone)}
                                  >
                                    <FiCopy size={14} />
                                  </button>
                                )
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white">
                    <h5 className="mb-0 d-flex align-items-center">
                      <FaShoppingBag className="me-2 text-success" />
                      Order Items
                    </h5>
                  </div>
                  <div className="card-body">
                    {order.items?.map((item, index) => (
                      <div key={index} className="row align-items-center mb-3 pb-3 border-bottom">
                        <div className="col-2 col-md-1">
                          <span className="badge bg-light text-dark rounded-circle">
                            {item.quantity || 1}
                          </span>
                        </div>
                        <div className="col-6 col-md-7">
                          <h6 className="mb-1">{item.product_name || 'Unknown Product'}</h6>
                        </div>
                        <div className="col-4 col-md-4 text-end">
                          <span className="text-dark fw-bold">
                            KES {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center p-3 bg-light rounded">
                          <FaClock className="me-3 text-warning" size={24} />
                          <div>
                            <h6 className="mb-0">Complete Payment</h6>
                            <small className="text-muted">
                              Time remaining: {formatTime(timeLeft)}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3 mt-md-0">
                        <div className="d-flex align-items-center p-3 bg-light rounded">
                          <FaReceipt className="me-3 text-primary" size={24} />
                          <div>
                            <h6 className="mb-0">Receipt Sent</h6>
                            <small className="text-muted">
                              Check your phone for M-Pesa receipt
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-success mb-4">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <FaCheckCircle size={24} />
                    </div>
                    <div className="ms-3">
                      <h5 className="alert-heading">Payment Received!</h5>
                      <p className="mb-0">
                        Your M-Pesa payment of KES {order.total_amount?.toLocaleString() || '0'} has been received. 
                        We'll notify you so that you can enter your new property.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <button 
                      className="btn btn-outline-primary w-100 py-3"
                      onClick={() => navigate('/')}
                    >
                      <FaHome className="me-2" />
                      Continue Shopping
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .confirmation-page {
          min-height: 100vh;
        }
        .confirmation-header {
          position: relative;
          overflow: hidden;
        }
        .confirmation-header::after {
          content: '';
          position: absolute;
          bottom: -50px;
          left: -50px;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }
        .confirmation-header::before {
          content: '';
          position: absolute;
          top: -30px;
          right: -30px;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }
        .confirmation-icon {
          animation: bounce 1s ease;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          60% {
            transform: translateY(-15px);
          }
        }
        .card {
          border-radius: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Confirmation;