import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3" style={{
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      borderBottom: "1px solid rgba(255, 215, 0, 0.3)"
    }}>
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="me-2" style={{ color: "#ffd700", fontSize: "1.8rem" }}>🏰</span>
          <span className="fw-bold" style={{
            background: "linear-gradient(to right, #ffd700, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.4rem",
            letterSpacing: "1px"
          }}>
            Lupin's Crest
          </span>
          <span className="text-light ms-1 d-none d-md-inline" style={{ fontSize: "0.9rem", opacity: 0.8 }}>
            Luxury Real Estate
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarcontents"
          style={{ borderColor: "#ffd700" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarcontents">
          <ul className="navbar-nav me-auto ms-4">
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link position-relative" style={{
                color: "#fff",
                fontWeight: "500",
                letterSpacing: "0.5px"
              }}>
                <span>Browse Estates</span>
                <span className="position-absolute bottom-0 start-0 w-100 bg-gold" style={{
                  height: "2px",
                  backgroundColor: "#ffd700",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                  transformOrigin: "right"
                }}></span>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/addhouse" className="nav-link position-relative" style={{
                color: "#fff",
                fontWeight: "500",
                letterSpacing: "0.5px"
              }}>
                <span>List Property</span>
                <span className="position-absolute bottom-0 start-0 w-100 bg-gold" style={{
                  height: "2px",
                  backgroundColor: "#ffd700",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                  transformOrigin: "right"
                }}></span>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/aboutus" className="nav-link position-relative" style={{
                color: "#fff",
                fontWeight: "500",
                letterSpacing: "0.5px"
              }}>
                <span>About Us</span>
                <span className="position-absolute bottom-0 start-0 w-100 bg-gold" style={{
                  height: "2px",
                  backgroundColor: "#ffd700",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                  transformOrigin: "right"
                }}></span>
              </Link>
            </li>
          </ul>

          {/* Authorization Links */}
          <div className="d-flex align-items-center">
            <Link to="/signin" className="btn btn-outline-light me-3 px-4" style={{
              borderColor: "#ffd700",
              color: "#ffd700",
              fontWeight: "500",
              transition: "all 0.3s ease",
              borderRadius: "4px"
            }}>
              Sign In
            </Link>
            <Link to="/signup" className="btn px-4" style={{
              backgroundColor: "#ffd700",
              color: "#1a1a1a",
              fontWeight: "600",
              transition: "all 0.3s ease",
              borderRadius: "4px",
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)"
            }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Hover effects */}
      <style>{`
        .nav-link:hover span:last-child {
          transform: scaleX(1) !important;
          transform-origin: left !important;
        }
        .nav-link:hover {
          color: #ffd700 !important;
        }
        .btn-outline-light:hover {
          background-color: rgba(255, 215, 0, 0.1) !important;
          transform: translateY(-2px);
        }
        .btn[style*="background-color: #ffd700"]:hover {
          background-color: #ffc800 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4) !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;