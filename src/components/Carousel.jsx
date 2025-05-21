//carousel
import { Link } from "react-router-dom";
 
const ImageCarousel = () => {
return (
<section className="row">
    <div className="col-md-1"></div>
    <div className="col-md-10">
        <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="images/carousel.jpg" alt="" className="d-block w-100" height="400px"/>
                </div>
 
                <div className="carousel-item">
                <img src="images/carousel2.jpg" alt="" className="d-block w-100" height="400px"/>
                </div>
 
                <div className="carousel-item">
                <img src="images/carousel3.jpg" alt="" className="d-block w-100" height="400px"/>
                </div>
 
                <div className="carousel-item">
                <img src="images/carousel4.jpg" alt="" className="d-block w-100" height="400px"/>
                </div>
            </div>
 
        <Link to="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        </Link >
 
 
        <Link to="#mycarousel" className="carousel-control-next" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
        </Link >
 
       
        </div>
    </div>
    <div className="col-md-1"></div>
</section>
);
}
 
 
export default ImageCarousel;