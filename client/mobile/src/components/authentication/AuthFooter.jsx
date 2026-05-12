import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function AuthFooter ({
    question,
    link,
    onPress,
}) {
    return(
        <View style={styles.container}>
            <Text style={styles.question}>
                {question}
            </Text>
            <Pressable onPress={onPress}>
                {({ pressed }) => (
                    <Text style={[styles.link, pressed && { opacity: 0.6 }]}>
                        {link}
                    </Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    question:{
        textAlign: "center",
        color: "#333",
        fontSize: 15,
    },
    link:{
        color: "#003466",
        fontWeight: "600",
        fontSize: 15,
    },
})
