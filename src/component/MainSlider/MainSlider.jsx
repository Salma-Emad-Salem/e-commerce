import React from 'react'
import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"
import slide4 from "../../assets/images/slider-image-2.jpeg"

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1500
    };
    return (
        <Slider {...settings}>
            <img src={slide1} alt="" srcset=""  height={350}/>
            <img src={slide2} alt="" srcset=""  height={350}/>
            <img src={slide3} alt="" srcset="" height={350} />
            <img src={slide4} alt="" srcset="" height={350} />
        </Slider>
    )
}
