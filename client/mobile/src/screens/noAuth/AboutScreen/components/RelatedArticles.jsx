import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function RelatedArticles(){
    return(
        <View style={styles.container}>
            <View style={styles.card}/>
            <View style={styles.card}/>
            <View style={styles.card}/>
            <View style={styles.card}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    card:{
        width: '48%',
        height: 80,
        backgroundColor: "#EAEAEA",
        borderRadius: 16,
        marginBottom: 12,
        elevation: 3,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    }
});