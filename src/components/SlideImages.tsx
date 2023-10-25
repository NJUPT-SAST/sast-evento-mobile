import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"

import { useEffect, useState } from "react";
import { getHomeSlideList } from "../apis/user";

import 'swiper/scss';
import 'swiper/scss/autoplay'
import "./SlideImages.scss"
import { IonImg } from "@ionic/react";

const SlideImages: React.FC = () => {
  const [slideImages, setSlideImages] = useState<Array<any>>([{"id": "1"}]);
  useEffect(() => {
    getHomeSlideList().then((res) => {
      console.log(res);
      setSlideImages(res.slides.slice(0, 2));
    });
  }, []);

  return (
    <div className="slideWarpper">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {slideImages.map((item, index) => (
          <SwiperSlide key={item.id}>
            <IonImg src={item.url} alt={item.title} className="slideImage"></IonImg>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideImages;