import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDisplaySettings } from "../../../contexts/displaySettingsContext";

export default function TurtleText(){
    const { contrastTheme } = useDisplaySettings();
    return(
        <View style={[styles.container, {borderColor: contrastTheme.buttonText}, {backgroundColor: contrastTheme.cellBackground}]}>
            <Text style={[styles.title, {color: contrastTheme.text}]}>Conheça nossa mascote:</Text>
            <Text style={[styles.text, {color: contrastTheme.text}]}>
                A tartaruguinha Coral foi escolhida para representar o projeto, 
                uma vez que as tartarugas são animais que, assim como os usuários da plataforma, 
                possuem formas de comunicação únicas.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#EAEAEA",
        borderRadius: 28,
        padding: 20,
        width: "90%",
        alignSelf: "center",
        elevation: 6,
        borderWidth: 1,
        borderColor: '#D1E3EE',
        
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    title:{
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text:{
        fontSize: 14,
        textAlign: 'justify',
    },
});