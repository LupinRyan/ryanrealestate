import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-light">
      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row g-4">
         
          {/* --- About Us --- */}
          <div className="col-lg-4 col-md-6">
            <h4 className="text-primary mb-4 fw-bold border-bottom pb-2">
              <span className="text-light">About</span> Lupin Real Estate
            </h4>
            <p className="text-warning">
              Welcome to <span className="text-danger">Lupin Real Estate</span>, your trusted partner in property investment and management.
              We specialize in helping clients find their dream homes, investment properties, and commercial spaces with unmatched professionalism.
            </p>
            <div className="mt-4">
              <h6 className="text-light">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-success hover-text-primary text-decoration-none">
                    Home
                  </Link>
                </li>
            
                <li className="mb-2">
                  <Link to="/addhouse" className="text-success hover-text-primary text-decoration-none">
                    Add House
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/aboutus" className="text-success hover-text-primary text-decoration-none">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* --- Contact Form --- */}
          <div className="col-lg-4 col-md-6">
            <h4 className="text-primary mb-4 fw-bold border-bottom pb-2">
              Get In <span className="text-light">Touch</span>
            </h4>
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Enter Your Email here"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control bg-transparent text-light border-secondary"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                className="btn btn-primary w-100 fw-bold hover-grow"
                type="submit"
              >
                Send Message <FaEnvelope className="ms-2" />
              </button>
            </form>
            <div className="mt-4">
              <div className="d-flex align-items-center mb-2">
                <FaMapMarkerAlt className="text-primary me-3" />
                <span className="text-danger">
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-danger text-decoration-none"
                  >
                    Nairobi, Kenya.
                  </a>
                </span>
              </div>
              <div className="d-flex align-items-center">
                <FaPhone className="text-primary me-3" />
                <span className="">(+254) 796 299 307</span>
              </div>
            </div>
          </div>

          {/* --- Social & Newsletter --- */}
          <div className="col-lg-4 col-md-12">
            <h4 className="text-primary mb-4 fw-bold border-bottom pb-2">
              Follow <span className="text-light">Us</span>
            </h4>
            <div className="d-flex gap-3 mb-4">
              <a
                href="https://facebook.com/lupinrealestate"
                className="social-icon hover-scale text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://instagram.com/lupinrealestate"
                className="social-icon hover-scale text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://twitter.com/lupinrealestate"
                className="social-icon hover-scale text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={30} />
              </a>
            </div>
            <div className="mb-4">
              <h6 className="text-light">Subscribe to Our Newsletter</h6>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control bg-transparent text-light border-secondary"
                  placeholder="Enter Email"
                />
                <button className="btn btn-outline-primary" type="button">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="">
              <p>
                Real estate isn't just about properties—it's about <span className="text-warning">building dreams, communities, and futures</span>.
                Trust Lupin to guide you through every step of your property journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="bg-black py-3 text-center">
        <p className="mb-0 text-light">
          &copy; {new Date().getFullYear()} <span className="text-primary">Lupin </span>. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;