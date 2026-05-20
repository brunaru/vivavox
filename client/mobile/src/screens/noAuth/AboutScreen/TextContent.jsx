import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutText(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sobre a plataforma:</Text>
            <Text style={styles.text}>
                A Associação Americana de Fala-Linguagem-Audição (American Speech-Language-Hearing Association, 1993) 
                define um distúrbio de comunicação como uma deficiência na capacidade de receber, enviar, processar e compreender conceitos ou sistemas de símbolos verbais e não-verbais. 
                Dessa forma, é essencial que existam soluções para intermediar o processo comunicativo das pessoas que apresentam tais questões, 
                dado que a habilidade de comunicação é essencial para garantir a formação e consolidação de um indivíduo no meio social.
            </Text>
            <Text style={styles.text}>
                Sendo assim, a plataforma VivaVox foi desenvolvida em um contexto de escassez de alternativas de baixo custo, 
                visando possibilitar a criação de pranchas de comunicação personalizáveis de uma maneira simples, intuitiva e gratuita. 
                Portanto, para atingir tais objetivos, a ferramenta conta com um vasto banco de cartões e áudios pré-definidos 
                bem como a possibilidade de inserir imagens e sons definidos pelo usuário, além das diferentes alternativas de varreduras (com piscar ou via teclado) dentro das pranchas.
            </Text>
        </View>
    );
}

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
        padding: 24,
        width: "80%",
        maxWidth: 420,
        alignSelf: "center",

        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },
     title:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 24, 
    },
    text:{
        fontSize: 16,
        textAlign: 'justify',
    },
});