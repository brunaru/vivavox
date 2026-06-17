import { Text } from "react-native";
import { useEffect } from "react";
import { useBoard } from "../../../contexts/boardContext";
import LibraryCarousel from "./Carousel";

export default function BoardLibrary({ search, selectedCategory }) {
  const {
    categorizedBoards,
    fetchCategorizedBoards,
    isLoadingCategorized,
    categorizedError,
  } = useBoard();

  useEffect(() => {
    fetchCategorizedBoards();
  }, []);

  if (isLoadingCategorized) return <Text>Carregando...</Text>;
  if (categorizedError) return <Text>Erro: {categorizedError}</Text>;

  if (!categorizedBoards || typeof categorizedBoards !== "object") {
    return <Text>Nenhuma prancha encontrada</Text>;
  }

  const filteredBoards = {};

  Object.keys(categorizedBoards).forEach((key) => {
    if (selectedCategory !== "all" && key !== selectedCategory) return;

    const boardsArray = categorizedBoards[key] || [];

    filteredBoards[key] = boardsArray.filter((board) =>
      board.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      {Object.keys(filteredBoards).map((key) => {
        const boards = filteredBoards[key];

        if (!boards || boards.length === 0) return null;

        return (
          <LibraryCarousel
            key={key}
            title={key}
            boards={boards}
          />
        );
      })}
    </>
  );
}