import { Link } from "react-router-dom";
import { useEffect } from "react";

const ImageCarousel = () => {
  // Auto-advance carousel every 5 seconds using useEffect hook
  // This creates an interval that automatically clicks the 'next' button
  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = document.getElementById('mycarousel');
      if (carousel) {
        const nextButton = carousel.querySelector('.carousel-control-next');
        if (nextButton) nextButton.click();
      }
    }, 5000); // 5000ms = 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array means this runs once on mount

  return (
    // Main container with Bootstrap row styling
    <section className="row my-5"> {/* my-5 adds vertical margin */}
      {/* Empty columns for left and right spacing */}
      <div className="col-md-1"></div>
      
      {/* Main carousel container (takes 10 of 12 columns) */}
      <div className="col-md-10">
        {/* Bootstrap carousel component with enhanced styling */}
        <div 
          className="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden" 
          data-bs-ride="carousel"  // Enables auto-cycling
          id="mycarousel"  // ID for JavaScript targeting
          style={{
            border: '3px solid rgba(255, 255, 255, 0.2)', // Semi-transparent border
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' // Deeper shadow effect
          }}
        >
          {/* Slide position indicators (dots at bottom) */}
          <div className="carousel-indicators">
            {/* Each button corresponds to a slide (0-indexed) */}
            <button 
              type="button" 
              data-bs-target="#mycarousel"  // Targets this carousel
              data-bs-slide-to="0"  // First slide
              className="active"  // Marks first slide as active initially
              aria-current="true"  // Accessibility attribute
              aria-label="Slide 1"  // Screen reader label
            ></button>
            {/* Repeat for remaining slides */}
            <button 
              type="button" 
              data-bs-target="#mycarousel" 
              data-bs-slide-to="1" 
              aria-label="Slide 2"
            ></button>
            <button 
              type="button" 
              data-bs-target="#mycarousel" 
              data-bs-slide-to="2" 
              aria-label="Slide 3"
            ></button>
            <button 
              type="button" 
              data-bs-target="#mycarousel" 
              data-bs-slide-to="3" 
              aria-label="Slide 4"
            ></button>
          </div>

          {/* Container for all carousel items (slides) */}
          <div className="carousel-inner">
            {/* First slide (active by default) */}
            <div className="carousel-item active">
              <img 
                src="images/carousel.jpg" 
                alt="Beautiful landscape"  // Always include alt text for accessibility
                className="d-block w-100"  // Display as block, full width
                style={{ 
                  height: '500px',  // Fixed height
                  objectFit: 'cover'  // Ensures image covers area without distortion
                }}
              />
              {/* Caption overlay (hidden on small screens) */}
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-4 rounded-3">
                <h5 className="display-6 fw-bold">Discover Amazing Places</h5>
                <p>Explore the world's most beautiful destinations</p>
              </div>
            </div>

            {/* Second slide */}
            <div className="carousel-item">
              <img 
                src="images/carousel2.jpg" 
                alt="Adventure activities" 
                className="d-block w-100" 
                style={{ height: '500px', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-4 rounded-3">
                <h5 className="display-6 fw-bold">Adventure Awaits</h5>
                <p>Experience thrilling activities and create memories</p>
              </div>
            </div>

            {/* Third slide */}
            <div className="carousel-item">
              <img 
                src="images/carousel3.jpg" 
                alt="Luxury experience" 
                className="d-block w-100" 
                style={{ height: '500px', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-4 rounded-3">
                <h5 className="display-6 fw-bold">Luxury Redefined</h5>
                <p>Indulge in premium experiences tailored for you</p>
              </div>
            </div>

            {/* Fourth slide */}
            <div className="carousel-item">
              <img 
                src="images/carousel4.jpg" 
                alt="Cultural experiences" 
                className="d-block w-100" 
                style={{ height: '500px', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-4 rounded-3">
                <h5 className="display-6 fw-bold">Cultural Immersion</h5>
                <p>Discover rich traditions and authentic experiences</p>
              </div>
            </div>
          </div>

          {/* Previous slide control button */}
          <Link 
            to="#mycarousel"  // Links to carousel ID
            className="carousel-control-prev"  // Bootstrap class for previous button
            data-bs-slide="prev"  // Tells Bootstrap to go to previous slide
            style={{ width: '5%' }}  // Sets button width
          >
            <span className="carousel-control-prev-icon bg-dark bg-opacity-50 p-3 rounded-circle"></span>
            <span className="visually-hidden">Previous</span>  {/* Screen reader text */}
          </Link>

          {/* Next slide control button */}
          <Link 
            to="#mycarousel" 
            className="carousel-control-next" 
            data-bs-slide="next"
            style={{ width: '5%' }}
          >
            <span className="carousel-control-next-icon bg-dark bg-opacity-50 p-3 rounded-circle"></span>
            <span className="visually-hidden">Next</span>
          </Link>
        </div>
      </div>
      {/* Empty column for right spacing */}
      <div className="col-md-1"></div>
    </section>
  );
}

export default ImageCarousel;