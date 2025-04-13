import Carousel from '../Carousel';
import LibraryHeader from '../LibraryHeader';
import { useRef, useState, useEffect } from 'react';
import {
  BoardLibraryContainer,
  LibrarySpace
} from './styled';

function BoardLibrary() {
  const libraryRef = useRef(null);
  const [hasShadow, setHasShadow] = useState(false);

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

  return(
    <BoardLibraryContainer>
      <LibraryHeader hasShadow={hasShadow} />
      <LibrarySpace ref={libraryRef} >
        <Carousel title="Favoritas"/>
        <Carousel title="Minhas pranchas"/>
        <Carousel title="Animais"/>
        <Carousel title="Core words"/>
        <Carousel title="Verbos"/>
      </LibrarySpace>
    </BoardLibraryContainer>
  );
}

export default BoardLibrary;