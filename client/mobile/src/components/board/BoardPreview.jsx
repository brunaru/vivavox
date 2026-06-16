import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useUser } from '../../contexts/userContext'
import { useDevice } from '../../hooks/useDevice'

import CellText from "../cell/CellText";
import Symbol from "../symbol";

export default function BoardPreview({ board, width, height }){
    const { updateCurrentBoard } = useUser();
    const { isTablet } = useDevice();
    console.log("IMG PREVIEW:", board?.imgPreview);
    if(!board || !board.cells){
        return <View style={[styles.container, { width, height }]}></View>
    }

    const hasContent = board.cells.length > 0

    return(
        <TouchableOpacity
        style={[
            styles.container,
            {
            width: width || (isTablet ? 160 : 140),
            height: height || (isTablet ? 140 : 125),
            },
        ]}
        activeOpacity={0.8}
        onPress={() => updateCurrentBoard(board)}
        >
        <View style={styles.content}>
            <Symbol source={hasContent ? board.imgPreview : null} />

            <CellText
            text={hasContent ? board.name : ''}
            fontSize={isTablet ? 16 : 14}
            />
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
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