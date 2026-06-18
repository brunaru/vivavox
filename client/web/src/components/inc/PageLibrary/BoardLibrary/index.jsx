import Carousel from '../Carousel';
import LibraryHeader from '../LibraryHeader';
import { useRef, useState, useEffect } from 'react';
import {
  BoardLibraryContainer,
  LibrarySpace
} from './styled';
import { useBoard } from '../../../contexts/BoardContext';

function BoardLibrary() {
  const {
    categorizedBoards,
    fetchCategorizedBoards,
    isLoadingCategorized,
    categorizedError
  } = useBoard();  
  const libraryRef = useRef(null);
  const [hasShadow, setHasShadow] = useState(false);

 

  useEffect(() => {
      fetchCategorizedBoards();
  }, [fetchCategorizedBoards]); 

  useEffect(() => {
    const handleScroll = () => {
      if (libraryRef.current) {
        setHasShadow(libraryRef.current.scrollTop > 0);
      }
    };

    const ref = libraryRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const renderContent = () => {

    if (isLoadingCategorized) {
      console.log("Renderizando: Estado de Carregamento");
      return <p>Carregando...</p>; // Certifique-se que está retornando aqui!
    }

    if (categorizedError) {
      console.log("Renderizando: Estado de Erro");
      // return <ErrorMessage>Erro: {error}</ErrorMessage>; // Use seu componente
      return <p style={{ color: 'red' }}>Erro ao carregar: {error}</p>;
    }

    // Mapeia a lista definida 'categoriesToDisplay'
    const carousels = Object.entries(categorizedBoards)
    .map(([key, boards]) => {
      if (!boards || boards.length === 0) return null;

      return (
        <Carousel
          key={key}
          title={key}
          boards={boards}
        />
      );
    })
    
    .filter(Boolean); // Remove os 'null' da lista de carrosséis
    console.log("breakpoint", carousels.length);

    if (carousels.length === 0) {
        return <p>Nenhuma prancha encontrada nas categorias selecionadas.</p>;
    }

    // Retorna a lista de componentes Carousel válidos
    return carousels;
  };

  return(
    <BoardLibraryContainer>
      <LibraryHeader hasShadow={hasShadow} />
      <LibrarySpace ref={libraryRef} >
        {renderContent()}
      </LibrarySpace>
    </BoardLibraryContainer>
  );
}

export default BoardLibrary;