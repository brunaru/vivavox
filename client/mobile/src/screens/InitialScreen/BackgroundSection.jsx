import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, StyleSheet } from 'react-native';
import { useDevice } from '../../hooks/useDevice';
import { BGWhiteFrame, BubblesFullPage, Seaweed } from '../../assets/items';


export default function Background() {
    const  { isTablet } = useDevice();
    return (
        <View style={StyleSheet.absoluteFill}>
            <LinearGradient 
            colors={['#031B45', '#003466', '#026783', '#0388C2']} 
            style={StyleSheet.absoluteFill}
            />
            <Image
              source={isTablet ? BubblesFullPage.tablet : BubblesFullPage.mobile}
              style={isTablet ? styles.bubblesTablet : styles.bubblesMobile}
            />
            <Image
              source={Seaweed}
              style={isTablet ? styles.seaweedTablet : styles.seaweedMobile}
            />
            <Image
              source={isTablet ? BGWhiteFrame.tablet : BGWhiteFrame.mobile}
              style={isTablet ? styles.frameTablet : styles.frameMobile}
            />
        </View>
    );
}
const styles = StyleSheet.create({
  frameMobile: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '35%',
    resizeMode: 'cover',
  },

  bubblesMobile: {
    position: 'absolute',
    top: 0,
    left: '10%',
    width: '80%',
    height: '65%',
    resizeMode: 'contain',
  },

  seaweedMobile: {
    position: 'absolute',
    bottom: "14%",
    left: '10%',
    width: '80%',
    height: '35%',
    resizeMode: 'contain',
  },

  frameTablet: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '60%',
    resizeMode: 'cover',
  },
  bubblesTablet: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '90%',
    resizeMode: 'contain',
  },

  seaweedTablet: {
    position: 'absolute',
    bottom: "5%",
    left: 0,
    height: '15%',
    resizeMode: 'contain',
  },
});