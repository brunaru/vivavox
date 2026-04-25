import react from 'react';
import{ View, Text, TouchableOpacity} from 'react-native';
import styles from '../../screens/InitialScreen/styles'
import { actionAssets } from '../../assets/items';

export default function Action({type}){
    const isTablet = type=== 'tablet';
    const Shape = actionAssets.actionShape[type] 
    || actionAssets.actionShape.mobile;

     return (
        <View style={styles.Wrapper}>
            <Shape style={styles.actionShape}/>
            <View style={[styles.actionContainer,
                isTablet && styles.actionContainerTablet]}
            >
                <Text style={[styles.title,
                    isTablet && styles.titleTablet]}
                >
                    Conheça mais sobre a plataforma!
                </Text>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.outlineButton}>
                        <Text style={styles.outlineText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filledButton}>
                        <Text style={styles.arrow}>→</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  );
}