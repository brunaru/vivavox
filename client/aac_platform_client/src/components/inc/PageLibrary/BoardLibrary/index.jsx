import Carousel from '../Carousel';
import LibraryHeader from '../LibraryHeader';
import { useRef, useState, useEffect } from 'react';
import {
  BoardLibraryContainer,
  LibrarySpace
} from './styled';
import { useBoard } from '../../../contexts/BoardContext';

function BoardLibrary() {
  const {categorizedBoards, fetchCategorizedBoards, isLoading, error} = useBoard();
  const libraryRef = useRef(null);
  const [hasShadow, setHasShadow] = useState(false);

  const categoriesToDisplay = [
    { key: 'core', title: 'Core words' },
    { key: 'animal', title: 'Animais' }
  ]

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
    if (isLoading) {
      console.log("Renderizando: Estado de Carregamento");
      return <p>Carregando...</p>; // Certifique-se que está retornando aqui!
    }

    if (error) {
      console.log("Renderizando: Estado de Erro");
      // return <ErrorMessage>Erro: {error}</ErrorMessage>; // Use seu componente
      return <p style={{ color: 'red' }}>Erro ao carregar: {error}</p>;
    }

    // Mapeia a lista definida 'categoriesToDisplay'
    const carousels = categoriesToDisplay.map(({ key, title }) => {
      // Pega os boards para a chave atual (ex: 'animal') do objeto vindo do contexto
      const boardsForCategory = categorizedBoards[key];

      // Renderiza o Carousel APENAS se a categoria existir nos dados
      // E se tiver pelo menos um board nela
      if (boardsForCategory && boardsForCategory.length > 0) {
        return (
          <Carousel
            key={key}                  // Chave única (pode usar 'key' ou 'title')
            title={title}              // O título que definimos para exibição
            boards={boardsForCategory} // O array de boards para esta categoria
          />
        );
      }
      // Se a categoria não existir nos dados ou estiver vazia, não renderiza nada para ela
      return null;
    })
    .filter(Boolean); // Remove os 'null' da lista de carrosséis

    // Verifica se algum carrossel foi renderizado
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