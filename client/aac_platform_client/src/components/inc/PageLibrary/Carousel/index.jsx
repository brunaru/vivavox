import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  CarouselContainer,
  CarouselTitle,
  StyledSwiperWrapper
} from './styled'
import BoardPreview from '../BoardPreview';

function Carousel(props) {
  return(
    <CarouselContainer>
      <CarouselTitle>
        {props.title}
      </CarouselTitle>
      <StyledSwiperWrapper>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          style={{ 
            height: "150px", // Define altura específica para o Swiper
            width: "100%"
          }}
          breakpoints={{
            // 520: { slidesPerView: 3 }
          }}
        >
          <SwiperSlide>
            <BoardPreview/>
          </SwiperSlide>
          <SwiperSlide>
            <BoardPreview/>
          </SwiperSlide>
          <SwiperSlide>
            <BoardPreview/>
          </SwiperSlide>
          <SwiperSlide>
            <BoardPreview/>
          </SwiperSlide>
          <SwiperSlide>
            <BoardPreview/>
          </SwiperSlide>
          <SwiperSlide>
            <BoardPreview/>
          </SwiperSlide>
        </Swiper>
      </StyledSwiperWrapper>
    </CarouselContainer>
  );
}

export default Carousel;