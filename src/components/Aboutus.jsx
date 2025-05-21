import React from 'react';
import Footer from "./Footer";
// import './AboutUs.css'; // Make sure to create this CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1 className="hero-title">About Lupin's Crest Real Estate</h1>
          <p className="hero-subtitle">Where Sophistication Meets Sanctuary</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Logo Section */}
            <div className="text-center mb-5">
              <img 
                src="images/logo.png" 
                alt="Lupin's Crest Logo" 
                className="about-logo img-fluid"
              />
            </div>

            {/* Introduction */}
            <section className="mb-5">
              <p className="lead about-intro">
                At <span className="brand-name">Lupin's Crest Luxury Real Estate</span>, we believe your home should be a statement of elegance, comfort, and legacy. 
                Nestled at the intersection of prestige and exclusivity, our firm specializes in curating extraordinary living experiences 
                for discerning clientele.
              </p>
            </section>

            {/* Divider */}
            <hr className="divider my-5" />

            {/* Core Content */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="about-card h-100">
                  <h3 className="section-title">Our Portfolio</h3>
                  <p>
                    From waterfront estates to sky-high penthouses, every property in our portfolio is handpicked for its architectural brilliance, 
                    unique charm, and investment value. Our team of seasoned real estate professionals offers white-glove service, guiding you 
                    through every step of your luxury home journey.
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="about-card h-100">
                  <h3 className="section-title">Our Philosophy</h3>
                  <p>
                    More than just agents — we are storytellers of spaces, visionaries of lifestyle, and custodians of refined taste. 
                    We believe that a home is more than just a building; it's a sanctuary, a reflection of your success, and a place 
                    where memories are made.
                  </p>
                </div>
              </div>
            </div>

            {/* Full Width Section */}
            <div className="about-values mb-5">
              <h3 className="section-title text-center mb-4">Our Core Values</h3>
              <div className="row text-center">
                <div className="col-md-4 mb-4">
                  <div className="value-item p-4">
                    <i className="fas fa-handshake value-icon"></i>
                    <h4>Trust</h4>
                    <p>Building lasting relationships through transparency and reliability</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="value-item p-4">
                    <i className="fas fa-shield-alt value-icon"></i>
                    <h4>Integrity</h4>
                    <p>Uncompromising ethical standards in all our dealings</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="value-item p-4">
                    <i className="fas fa-lock value-icon"></i>
                    <h4>Discretion</h4>
                    <p>Absolute confidentiality for our distinguished clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Quote */}
            <div className="mission-quote text-center p-5 mb-5">
              <blockquote className="blockquote">
                <p className="mb-0 quote-text">
                  "Luxury isn't just a price point — it's a promise."
                </p>
                <footer className="blockquote-footer mt-3">Assane Lupin</footer>
              </blockquote>
            </div>

            {/* Contact */}
            <div className="contact-section text-center p-4">
              <h3 className="mb-4">Ready to Begin Your Journey?</h3>
              <a href="mailto:ryanj5245@gmail.com" className="contact-btn btn btn-outline-light">
                <i className="fas fa-envelope mr-2"></i> ryanj5245@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;