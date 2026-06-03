import { View, Image, StyleSheet } from 'react-native';

export default function Symbol({ source }){
    
    if (!source) return null;
    return(
        <View style={styles.container}>
            <Image
                source={{ uri: source }}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 70,
        width: 70,
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        height: '100%',
        width:'100%',
        resizeMode: 'contain',
    }
})
