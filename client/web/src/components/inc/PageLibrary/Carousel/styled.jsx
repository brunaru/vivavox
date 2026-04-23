import styled from "styled-components";

export const CarouselContainer = styled.div`
  background-color: ;
  width: 95%;
  height: 200px;
  min-height: 200px;
  max-height: 200px;
  margin: 15px 0;
  border-radius: 8px;
`;

export const CarouselTitle = styled.h2`
  margin: 5px 0 0 10px;
`;

// Novo estilo para o Swiper que será aplicado usando className
export const StyledSwiperWrapper = styled.div`
  flex: 1;
  width: 100%;
  
  /* Estilos que serão aplicados ao Swiper dentro deste wrapper */
  .swiper {
    height: 150px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  
  /* Ajustes para posicionar corretamente a paginação */
  .swiper-pagination {
    bottom: 0 !important;
  }
  
  /* Ajustes para os slides terem altura adequada */
  .swiper-slide {
    height: auto !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Ajustes para os botões de navegação */
  .swiper-button-next,
  .swiper-button-prev {
    color: #003466 !important;
    font-size: 10px;
    height: 90px !important;
    width: 20px;
    top: 50% !important;
    transform: translateY(-50%) !important;
    margin-top: 0 !important; 
  }

  /* Ajusta o tamanho dos ícones dentro dos botões */
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 20px !important; /* Tamanho da fonte do ícone */
  }
`;