import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios'
import { baseUrl } from '../../utilties/baseUrl';
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/slider-2.jpeg'
import Products from '../Products/Products';
export default function Home() {
  const [ category , setCategory ] = useState([]);

  async function getCategories(){
    try {
        let { data } = await axios.get(baseUrl + 'categories')
        setCategory(data.data)
        console.log(data.data)   
       
    } catch (error) {
        
    }
}
useEffect(()=>{
    getCategories()    
},[])
  var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:1500
  };
  var first = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500,
    
};
  return (
      
      <div className='my-3 container home'>
        <div className='sliderone'>
          <div className="row ">
            <div className="container d-flex ">
            <div className="col-md-9">
            <Slider {...first} className='homeSlide'>
            <div>
              <img src={img3} className='w-100' alt=""  height={300} />
              </div>
              <div>
              <img src={img4} className='w-100' alt=""  height={300} />
              </div>
              <div>
              <img src={img2} className='w-100' alt=""  height={300} />
              </div>
              <div>
              <img src={img1} className='w-100' alt=""  height={300} />
              </div>

      </Slider>

          </div>
          <div className="col-md-3">
              <div>
              <img src={img1} alt=""className='w-100' height={150} />
              </div>

              <div>
              <img src={img2}  alt="" className='w-100' height={150} />
              </div>
            </div>


            </div>
        </div>
        </div>
          <h3 className='py-2 '>Shop Populer Category</h3>
      <Slider {...settings} className='homeslider'>
          {
              category.map((item) => (
                  <div key={item._id} className='imgCont'>
                      <img src={item.image} height={200} width={190} className='px-2' alt="" />
                      <h4 className='text-center py-1 px-1 fs-5'> {item.name} </h4>
                  </div>
                  

              ))
          }

      </Slider>
      <Products/>
      </div>
  )
        }