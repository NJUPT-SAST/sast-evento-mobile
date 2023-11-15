import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"
import { IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import { getHomeSlideList } from "../apis/user";

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import "./SlideImages.scss";

const SlideImages: React.FC = () => {
  const [slideImages, setSlideImages] = useState<Array<any>>([{"id": "1", "url": "https://aliyun.sastimg.mxte.cc/images/2023/07/02/Frame-1438eeca56671d68ff.png", "title": "123"}]);
  useEffect(() => {
    getHomeSlideList().then((res) => {
      setSlideImages(res.slides.slice(0, 2));
    });
  }, []);

  return (
    <div className="slideWarpper">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
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