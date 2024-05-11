import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/images/Slider/slide 1.jpg";
import image2 from "../../assets/images/Slider/slide 2.jpg";
import image3 from "../../assets/images/Slider/slide 3.jpg";
import './Slider.css'
function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <Slider {...settings} className="horizontal-slider">
    <div>
      <img src={image1} alt="Slider Image 1" className="horizontal-image" />
    </div>
    <div>
      <img src={image2} alt="Slider Image 2" className="horizontal-image" />
    </div>
    <div>
      <img src={image3} alt="Slider Image 3" className="horizontal-image" />
    </div>
  </Slider>
  );
}

export default SliderComponent;
