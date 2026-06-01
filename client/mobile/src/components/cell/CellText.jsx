import { Text, StyleSheet } from 'react-native';

export default function CellText({ text, fontSize }){
    return(
        <Text 
            style={[
                styles.text,
                {fontSize: fontSize || 14}
            ]}
            numberOfLines={2}
        >
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    text:{
        textAlign: 'center',
        paddingHorizontal: 6,
        paddingVertical: 0,
        fontWeight: '600',
    }
})

