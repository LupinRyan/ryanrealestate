import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-secondary shadow-sm mt-1">
   
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand fw-bold text-light">Lupin's Crest Luxury Real Estate</Link>

       

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarcontents"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarcontents">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <b><Link to="/" className="nav-link text-light">See Estate</Link></b>
            </li>
            <li className="nav-item">
              <b><Link to="/addhouse" className="nav-link text-light">Add Estate</Link></b>
            </li>
           
          </ul>
         

          {/* Authorization Links (Aligned Right) */}
          <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <b><Link to="/aboutus" className="nav-link text-light">About us</Link></b>
                </li>
            <li className="nav-item">
              <Link to="/signin" className="btn btn-outline-primary me-2">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </li>
          </ul>
        </div>
     
    </nav>
  );
};

export default Navbar;