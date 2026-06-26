import Product from "./Product";
import "./slideProducts.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
 

import { Autoplay, Navigation } from 'swiper/modules';

function SlideProduct({data = [] ,title}) {
  const canLoop = data.length > 5;

  return (
    <div className="Slide-Product slide ">
      <div className="container">
        <div className="top-slide">
          <h2>{title}</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <Swiper
          loop={canLoop}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
          className="mySwiper"
        >

          {data.map((item) =>{ 
           return(
            <SwiperSlide key={item.id}>
              <Product item={item}/>
            </SwiperSlide>
        
           )
           })}
            
        </Swiper>

   
      </div>
    </div>
  );
}

export default SlideProduct;
