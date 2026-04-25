import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../screens/InitialScreen/styles';

import { VivavoxLogo } from '../../assets/items';
import { Turtle } from '../../assets/items';

export default function Ilustration({ type, config}) {
    const isTablet = type === 'tablet';
    const current = config[type];

    return(
        <View 
            style={[styles.ilustationContainer, 
            isTablet && styles.ilustationTablet]}
        >
            <VivavoxLogo 
                width={current.logo.width}
                height={current.logo.height}
            />
            <Text
                style={[ styles.subtile, 
                isTablet && styles.subtitleTablet]}
            >
                Viva a sua voz.
            </Text>
            <View style={styles.ilustationContainer}>
                <Turtle
                    width={current.turtle.width}
                    height={current.turtle.height}
                />
            </View>

        </View>
    );
}