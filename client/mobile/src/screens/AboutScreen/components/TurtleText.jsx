import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TurtleText(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Conheça nossa mascote:</Text>
            <Text style={styles.text}>
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