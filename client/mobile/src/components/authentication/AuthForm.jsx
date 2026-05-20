import React from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function AuthForm({
    formText,
    children, 
    onSubmit,
    buttonText, 
    error,
    footer
}) {
    return(
        <View style={styles.panel}>
            <Text style={styles.title}>{formText}</Text>
            {children}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable style={styles.button} onPress={onSubmit}>
                <Text  style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
             {footer && <View style={styles.footer}>{footer}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    panel:{
        backgroundColor: "#EAEAEA",
        borderRadius: 28,
        padding: 24,
        width: "100%",
        maxWidth: 420,
        alignSelf: "center",

        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },
    title:{
        fontSize: 34,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 24, 
    },
    error:{
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 13,
    },
    button:{
        backgroundColor: "#0B3C6D",
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText:{
        color: "#FFF",
        fontSize: 20,
        fontWeight: "600",
    },
    footer:{
        textAlign: "center",
        color: "#003466",
        marginTop: 14,
        fontSize: 15,
    },
});