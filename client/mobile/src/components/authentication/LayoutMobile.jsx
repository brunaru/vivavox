import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, Text, StyleSheet } from 'react-native';
import { BubblesHalfPage } from '../../assets/items';

export default function LayoutMobile ({ children }){
    return(
        <View style={styles.container}>
            <View style={styles.background}>
                 <LinearGradient
                    colors={['#031B45', '#003466', '#026783', '#0388C2']}
                    style={StyleSheet.absoluteFill}
                />
                <Image
                    source={BubblesHalfPage.mobile}
                    style={styles.bubbles}
                />
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFFFFF",

    },
    background:{
        flex: 0.40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: "hidden",
    },
    bubbles:{
        position: "absolute",
        width: "100%",
        height: "60%",
        resizeMode: "cover",
    },
    content:{
        flex: 0.55,
        justifyContent: "flex-start",
        marginTop: -250,
        paddingHorizontal: 20,
    },
})
