import React from "react";
import { Helmet } from "react-helmet";
import axios, { Axios } from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CatSlider() {
  function getCats() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("pcats", getCats);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay:true,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <>
      <Helmet>
        <title>{window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}</title>
      </Helmet>
      <div className="my-5 row d-none d-md-block">
        <Slider {...settings}>
          {data?.data.data.map((cat , idx) => {
            return <div key={idx}>
                <div className="d-flex flex-column me-2" style={{ height: '500px' }}>
  <img 
    className="w-100" 
    src={cat.image} 
    alt={cat.name} 
    style={{ objectFit: 'cover', height: '100%' }} 
  />
  <h3 className="h6 text-center mt-2">
    {cat.name}
  </h3>
</div>
            </div>
          })}
        </Slider>
      </div>
    </>
  );
}
