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

function Carousel({ title, boards = [] }) {
  return(
    <CarouselContainer>
      <CarouselTitle>
        {title}
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
            // 1500: { slidesPerView: 3 }
          }}
        >
          {boards.map((board) => (
            // React precisa de uma 'key' única ao renderizar listas.
            // O _id do board é perfeito para isso.
            <SwiperSlide key={board._id}>
              {/*
                 Renderiza o componente BoardPreview e passa
                 o objeto 'board' inteiro como uma prop chamada 'board'.
              */}
              <BoardPreview board={board} />
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiperWrapper>
    </CarouselContainer>
  );
}

export default Carousel;