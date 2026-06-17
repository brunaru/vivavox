import React from "react";
import { Pressable, View, StyleSheet } from "react-native"

import { useCell } from "../../contexts/cellContext"
import Symbol from "../symbol"

//if yiu are editing the empty cells will have a + symbol
export default function CellPreview({ index, size }){
    const { editing, configCell, setConfigCell } = useCell();
    
    function openConfigMenu(){
        if(editing && !configCell){
            setConfigCell({
                indexOnBoard: index,
                cellType: "cell",
            })
        }
    }

    return(
        <Pressable onPress={openConfigMenu}>
            <View 
            style={[
            styles.container,
            {
                width: size,
                height: size,
            },
          editing && styles.editing,
        ]}>
                {editing && (
                    <Symbol source="https://static.arasaac.org/pictograms/3220/3220_300.png"/>
                )}
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});