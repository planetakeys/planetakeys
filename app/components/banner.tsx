import { Swiper, SwiperSlide } from "swiper/react";

import banner1 from "../assets/banner-01.jpg";

export const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {[0, 1, 2].map((i) => {
          return (
            <SwiperSlide key={i}>
              <img
                src={banner1}
                alt="Banner Microsoft"
                className="w-full h-[20rem] lg:h-[30rem] object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
