import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AboutTurtle, Seaweed, BubblesHalfPage } from "../../../assets/items";

import AboutText from "./components/AboutText";
import TurtleText from "./components/TurtleText";
import RelatedArticles from "./components/RelatedArticles";

export default function ContentMobile(){
    const navigation = useNavigation();

    return(
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#031B45', '#003466', '#0a4780', '#026783', '#0388C2']}
                style={styles.bg}
            >
                <Image
                  source={BubblesHalfPage.mobile}
                  style={styles.bubbles}
                />
                <Image
                    source={Seaweed} 
                    style={styles.seaweed}
                />
            </LinearGradient>
            <View style={styles.content}>
                <AboutText/>
                <View style={styles.turtleSection}>
                    <Image
                        source={AboutTurtle}
                        style={styles.turtle}
                    />
                </View>
                <TurtleText/>
                <Text style={styles.subtitle}>Gostou da nossa proposta?</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
                <View style={styles.linkContainer}>
                    <Text style={styles.normalText}>
                        Ainda não tem uma conta?
                    </Text>

                    <Pressable 
                        android_ripple={{ color: '#ccc' }}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={styles.link}>Criar uma conta</Text>
                    </Pressable>
                </View>
                <Text style={styles.subtitle}>Artigos relacionados:</Text>
                <RelatedArticles/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
     container:{
        paddingBottom: 40,
        backgroundColor: '#D1E3EE',
    },
    bg:{
        flex: 0.40,
        height: 200,
        top: 0,
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden' 
    },
    bubbles:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    seaweed:{
        marginLeft: 10,
        width: 340,
        height: 100,
        resizeMode: 'contain',
    },
    content:{
        flex: 0.55,
        justifyContent: "flex-start",
        marginTop: -70,
        paddingHorizontal: 20,
    },
    turtleSection:{
        alignItems: 'center',
        marginVertical: 20,
    },
    turtle:{
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    subtitle:{
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },

    button:{
        backgroundColor: '#003466',
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
    },

    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    linkContainer:{
        alignItems: 'center', 
        marginTop: 15,     
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    normalText:{
        marginRight: 6,
        fontSize: 15, 
        fontWeight: '500',
    },
    link:{
        marginTop: 10,
        marginLeft: 3,
        textAlign: 'center',
        color: '#003466',
        textDecorationLine: 'underline', 
        fontWeight: 'bold', 
        fontSize: 15,
    }
})