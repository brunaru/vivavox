import { Pressable, View, StyleSheet } from "react-native";
import { useUser } from '../../contexts/userContext'
import { useBoard } from '../../contexts/boardContext'
import { useDevice } from '../../hooks/useDevice'
import { useNavigation } from '@react-navigation/native'
import { useDisplaySettings } from "../../contexts/displaySettingsContext"

import CellText from "../cell/CellText";
import Symbol from "../symbol";

export default function BoardPreview({ board, width, height }){
    const { updateCurrentBoard } = useUser();
    const { isTablet } = useDevice();
    const { fetchBoardById } = useBoard();
    const navigation = useNavigation();
    const { contrastTheme } = useDisplaySettings();
    console.log("IMG PREVIEW:", board?.imgPreview);
    if(!board || !board.cells){
        return <View style={[styles.container, { width, height }]}></View>
    }

    const hasContent = board.cells.length > 0

    function handlePress() {
        updateCurrentBoard(board);
        fetchBoardById(board._id); 
        navigation.navigate("Board");
    }

    return(
        <Pressable
            style={({ pressed }) => [
                styles.container,
                {backgroundColor: contrastTheme.cellBackground},
                {borderColor: contrastTheme.cellBorder},
                {
                width: width || (isTablet ? 160 : 140),
                height: height || (isTablet ? 140 : 125),
                },
                pressed && {transform: [{ scale: 0.97 }]}
            ]}
            activeOpacity={0.8}
            onPress={handlePress}
        >
        <View style={styles.content}>
            <Symbol source={hasContent ? board.imgPreview : null} />

            <CellText
            text={hasContent ? board.name : ''}
            fontSize={isTablet ? 16 : 14}
            />
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  content: {
    flex: 1,
    width: '100%',
    padding: 8,
    justifyContent: 'space-between',
    gap: 6,
    alignItems: 'center',
  },
});