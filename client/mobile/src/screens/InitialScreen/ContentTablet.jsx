import React from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import { VivavoxLogo, Turtle } from '../../assets/items';
import Arrow from '../../svg/arrow';


export default function ContentTablet(){
    return(
        <View style={styles.container}>
            <View style={styles.left}>
              <Image source={VivavoxLogo} style={styles.logo}/>
              <Text style={styles.subtitle}>Viva a sua voz.</Text>
              <Image source={Turtle} style={styles.turtle}/>
            </View>
          
            <View style={styles.right}>
              <Text style={styles.title}>Conheça mais sobre a plataforma!</Text>
              <View style={styles.buttons}>
                <Pressable style={styles.buttonOutline}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
                <Pressable style={styles.buttonFilled}>
                  <Arrow/>
                </Pressable>
              </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 40,
  },

  left: {
    flex: 1.3,
    justifyContent: 'center',
  },

  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
  },

  subtitle: {
    color: 'white',
    marginTop: 10,
  },

  turtle: {
    width: 250,
    height: 180,
    marginTop: 40,
  },

  title: {
    fontSize: 18,
    marginBottom: 20,
  },

  buttons: {
    flexDirection: 'row',
    marginRight: 12,
  },

  buttonOutline: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonFilled: {
    backgroundColor: '#0A2E5C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});