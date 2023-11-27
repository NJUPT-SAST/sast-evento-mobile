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
  const [slideImages, setSlideImages] = useState<Array<any>>([]);
  useEffect(() => {
    getHomeSlideList().then((res) => {
      setSlideImages(res.slides.slice(0, 2));
    });
  }, []);

  const toLink = (url:string) => {
    if (url.includes("https://")) {
      window.open(url, "_blank");
    }
  }

  return (
    <div className="slideWarpper">
      <Swiper
        spaceBetween={50}
        slidesPerView="auto"
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {slideImages.map((item, index) => (
          <SwiperSlide key={item.id}>
            <IonImg src={item.url} alt={item.title} className="slideImage" onClick={() => toLink(item.link)}></IonImg>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideImages;