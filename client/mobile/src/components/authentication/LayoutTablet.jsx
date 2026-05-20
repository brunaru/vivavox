import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, StyleSheet, Text } from 'react-native';
import { BubblesHalfPage, BGBlueTabletFrame, VivavoxLogo } from '../../assets/items';

export default function TabletLayout({ children }){
    return(
        <View style={styles.container}>
            <Image 
                source={BGBlueTabletFrame}
                style={styles.background}
            />
            <Image 
                source={BubblesHalfPage}
                style={styles.bubbles}
             />
            <View style={styles.left}>
                <Image 
                    source={VivavoxLogo}
                    style={styles.logo}
                />
            </View>
            <View style={styles.right}>
                {children}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
    },

    left:{
        flex: 1.2,
        justifyContent: "flex-start",
        padding: 40,
        overflow: "hidden",
    },

    background:{
        position: "absolute",
        width: "100%",
        height: "100%",
        rezideMode: "contain",
    },

    bubbles:{
        position: "absolute",
        width: "100%",
        height: "100%",
        rezideMode: "contain",
    },

    logo:{
        width: 200,
        height: 60,
        resizeMode: "contain",
    },

    right:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
});
