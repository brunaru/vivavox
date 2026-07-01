import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { usePhrase } from "../../contexts/phraseContext";
import { useCell } from "../../contexts/cellContext";
import { useBoard } from "../../contexts/boardContext";
import { useDevice } from "../../hooks/useDevice";

import Button from "../../components/Button";
import WriteBar from "./WriteBar";
import BoardRowSelector from "./BoardRowSelector";

import ChangeIcon from "../../svg/featureBar/change";
import CleanIcon from "../../svg/featureBar/clean";
import RemoveIcon from "../../svg/featureBar/remove";
import EditIcon from "../../svg/featureBar/edit";
import ReturnIcon from "../../svg/featureBar/return";
import SaveIcon from "../../svg/featureBar/save";
import SpeakIcon from "../../svg/featureBar/speak";
import ScanIcon from "../../svg/featureBar/scan"; 

export default function FeatureBar() {
  const { clearPhrase, deleteWord, speech } = usePhrase();
  const { editing, setEditing } = useCell();
  const { board, setBoard, boardStack, setBoardStack } = useBoard();
  const { isTablet, isLandscape } = useDevice();
  const [showSelector, setShowSelector] = useState(false);

  function handleEditToggle() {
    setEditing(prev => !prev);
  }

  function boardBack() {
    if (boardStack && boardStack.length >= 1) {
      const newBoardStack = [...boardStack];
      const newBoard = newBoardStack.pop();
      setBoardStack(newBoardStack);
      setBoard(newBoard);
    }
  }
  
  const showTabletLayout = isTablet && isLandscape;

  return (
    <View style={styles.container}>
      {!showTabletLayout ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>
              {board?.name || "Pessoas"}
            </Text>
          </View>

          <View style={styles.mobileContent}>
            <View style={styles.writeRowMobile}>
              <View style={{ flex: 1 }}>
                <WriteBar />
              </View>
              <Button text="Falar" onPress={speech} icon={SpeakIcon} />
            </View>

            {showSelector && (
              <BoardRowSelector onClose={() => setShowSelector(false)} />
            )}

            <View style={styles.actionsContainer}>
              <View style={styles.row}>
                <Button text="Apagar célula" onPress={deleteWord} icon={RemoveIcon} />
                <Button text="Limpar" onPress={clearPhrase} icon={CleanIcon} />
                <Button text="Varredura" onPress={() => {}} icon={ScanIcon} />
              </View>

              <View style={styles.row}>
                <Button text={editing ? "Salvar" : "Editar"} onPress={handleEditToggle} icon={editing ? SaveIcon : EditIcon} />
                <Button text="Voltar" onPress={boardBack} icon={ReturnIcon}/>
                <Button text="Trocar prancha" onPress={() => setShowSelector(true)} icon={ChangeIcon} />
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.tabletContainer}>
          <View style={styles.tabletTitleBackground}>
            <Text style={styles.titleTabletInline}>
              {board?.name || "Sem Título"}
            </Text>
          </View>

          <View style={styles.topRow}>
            <View style={styles.topButtons}>
              <Button onPress={boardBack} icon={ReturnIcon} round/>
              <Button text="Apagar célula" onPress={deleteWord} icon={RemoveIcon} />
              <Button text="Limpar" onPress={clearPhrase} icon={CleanIcon} />
              <Button text="Varredura" onPress={() => {}} icon={ScanIcon} />
              <Button text="Editar" onPress={handleEditToggle} icon={editing ? SaveIcon : EditIcon} />
              <Button text="Trocar prancha" onPress={() => setShowSelector(true)} icon={ChangeIcon}/>
            </View>
          </View>

          {showSelector && (
            <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
              <BoardRowSelector onClose={() => setShowSelector(false)} />
            </View>
          )}

          <View style={styles.writeRow}>
            <View style={{ flex: 1 }}>
              <WriteBar />
            </View>
            <Button text="Falar" onPress={speech} icon={SpeakIcon} style={{ backgroundColor: "#fff"}}/>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  header: {
    backgroundColor: "#0b5c74",
    paddingTop: 30, 
    paddingBottom: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  mobileContent: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  writeRowMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  actionsContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  tabletContainer: {
    paddingBottom: 20, 
    zIndex: 1, 
    position: "relative", 
  },
  tabletTitleBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "28%", 
    height: 100, 
    backgroundColor: "#0b5c74",
    borderBottomLeftRadius: 200, 
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 35, 
    paddingLeft: 40, 
    zIndex: 2, 
  },
  titleTabletInline: {
    fontSize: 22, 
    fontWeight: "bold",
    color: "#fff",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", 
    width: "100%", 
    paddingTop: 30, 
    paddingBottom: 15,        
    paddingLeft: 10, 
    paddingRight: 20,
    marginBottom: 20, 
    zIndex: 1, 
  },
  topButtons: {
    flexDirection: "row",
    gap: 10,
  },
  writeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 5,
    paddingHorizontal: 20, 
  },
});