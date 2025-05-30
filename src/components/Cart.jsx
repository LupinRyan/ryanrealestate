import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import Footer from './Footer';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    navigate('/cart', { state: { cartItems: updatedCart } });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.product_cost), 0);
  };

  return (
    <div className="cart-page bg-light">
      <div className="container py-5">
        <button 
          className="btn btn-back mb-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back to Properties
        </button>

        <h1 className="text-center mb-5">
          <FaShoppingCart className="me-3 text-warning" />
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center py-5">
            <div className="empty-cart-icon mb-4">
              <FaShoppingCart size={64} className="text-muted" />
            </div>
            <h3 className="text-muted mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">Looks like you haven't added any properties to your cart yet</p>
            <button 
              className="btn btn-explore"
              onClick={() => navigate('/')}
            >
              Explore Properties
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h4 className="mb-0">Selected Properties ({cartItems.length})</h4>
                </div>
                <div className="card-body">
                  {cartItems.map((item, index) => (
                    <div key={index} className="cart-item mb-4 pb-4 border-bottom">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <img 
                            src={`https://lup3n.pythonanywhere.com/static/images/${item.product_photo}`}
                            alt={item.product_name}
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="col-md-6">
                          <h5 className="mb-1">{item.product_name}</h5>
                          <p className="text-muted mb-2">{item.product_description.slice(0, 100)}...</p>
                          <div className="d-flex align-items-center">
                            <span className="badge bg-warning text-dark me-2">
                              KES {item.product_cost}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-3 text-end">
                          <button 
                            className="btn btn-remove"
                            onClick={() => removeItem(index)}
                          >
                            <FaTrash className="me-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                <div className="card-header bg-white">
                  <h4 className="mb-0">Order Summary</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <span>KES {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Tax (16%):</span>
                    <span>KES {(calculateTotal() * 0.16).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4 fw-bold">
                    <span>Total:</span>
                    <span className="text-primary">
                      KES {(calculateTotal() * 1.16).toLocaleString()}
                    </span>
                  </div>
                  <button 
                    className="btn btn-checkout w-100"
                    onClick={() => navigate('/checkout', { state: { cartItems } })}
                  >
                    <FaCreditCard className="me-2" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
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
        .btn-back:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
        }
        .empty-cart {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 40px;
          max-width: 600px;
          margin: 0 auto;
        }
        .empty-cart-icon {
          opacity: 0.5;
        }
        .btn-explore {
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 30px;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .btn-explore:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 242, 254, 0.3);
        }
        .cart-item {
          transition: all 0.3s ease;
        }
        .cart-item:hover {
          background-color: #f8f9fa;
        }
        .btn-remove {
          background: linear-gradient(45deg, #ff758c 0%, #ff7eb3 100%);
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }
        .btn-remove:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(255, 117, 140, 0.3);
        }
        .btn-checkout {
          background: linear-gradient(45deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 30px;
          font-weight: bold;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-checkout:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Cart;