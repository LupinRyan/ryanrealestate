import React from 'react';
import './styling/Footer.css'; // Create this CSS file

const Footer = () => {
    return (
        <footer className="site-footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="container">
                    <div className="row">
                        {/* About Us Section */}
                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <div className="footer-about">
                                <h5 className="footer-title">About Lupin's Crest</h5>
                                <div className="footer-divider"></div>
                                <p className="footer-text">
                                    Lupin's Crest Luxury Real Estate is a distinguished boutique real estate company in Kenya, 
                                    renowned for its commitment to sustainable and luxurious living. Our flagship development, 
                                    Crest Estate, spans 1,360 acres near Nairobi, offering panoramic views of Nairobi City, 
                                    the Nairobi National Park, and the Maasai Mara National Park.
                                </p>
                                <div className="eco-badge">
                                    <i className="fas fa-leaf"></i> Sustainable Living
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <div className="footer-contact">
                                <h5 className="footer-title">Reach Out To Us</h5>
                                <div className="footer-divider"></div>
                                <form className="footer-form">
                                    <div className="form-group">
                                        <input 
                                            type="email" 
                                            className="form-control footer-input" 
                                            placeholder="Your email address"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            className="form-control footer-input" 
                                            rows="4" 
                                            placeholder="Your message"
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn footer-btn">
                                        Send Message <i className="fas fa-paper-plane ml-2"></i>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="col-lg-4 col-md-12">
                            <div className="footer-social">
                                <h5 className="footer-title">Connect With Us</h5>
                                <div className="footer-divider"></div>
                                <div className="social-icons">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                                
                                <div className="contact-info mt-4">
                                    <p className="footer-text">
                                        <i className="fas fa-map-marker-alt mr-2"></i> 
                                        Nairobi, Kenya
                                    </p>
                                    <p className="footer-text">
                                        <i className="fas fa-phone mr-2"></i> 
                                        +254 796299307
                                    </p>
                                    <p className="footer-text">
                                        <i className="fas fa-envelope mr-2"></i> 
                                        info@lupinscrest.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="copyright-text">
                                &copy; {new Date().getFullYear()} Lupin's Crest Luxury Real Estate. All rights reserved.
                                <span className="developer-credit">
                                    Developed by <strong>Lupin </strong>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
