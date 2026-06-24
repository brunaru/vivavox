import React from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import { VivavoxLogo, Turtle } from '../../assets/items';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../svg/arrow';


export default function ContentTablet(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.left}>
              <View style={styles.top}>
                <Image source={VivavoxLogo} style={styles.logo}/>
                <Text style={styles.subtitle}>Viva a sua voz.</Text>
              </View>
              <View style={styles.bottom}>
                <Image source={Turtle} style={styles.turtle}/>
              </View>
            </View>
          
            <View style={styles.right}>
              <View style={styles.contentSection}>
                <Text style={styles.title}>Conheça mais sobre a plataforma!</Text>
                <View style={styles.buttons}>
                  <Pressable style={styles.buttonOutline} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Entrar</Text>
                  </Pressable>
                  <Pressable 
                    style={styles.buttonFilled}
                    onPress={() => navigation.navigate('About')}  
                  >
                    <Arrow/>
                  </Pressable>
                </View>
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

  top: {
    marginTop: 0,
    marginBottom: 90,
  },
  bottom: {
    marginTop: 20,
  },

  logo: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
  },

  subtitle: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },

  turtle: {
    width: '50%',
    height: 150,
    left: '25%',
    resizeMode: 'contain',
  },

  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },

  contentSection: {
    marginLeft: 120,
  },

  buttons: {
    flexDirection: 'row',
    marginRight: 12,
  },

  buttonOutline: {
    borderWidth: 2,
    borderColor: '#0A2E5C',
    borderRadius: 30,
    marginRight: 12,
    paddingVertical: 12,
    paddingHorizontal: 34,
  },
  buttonText: {
    color: '#0A2E5C',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonFilled: {
    backgroundColor: '#003466',
    paddingVertical: 12,
    paddingHorizontal: 44,
    borderRadius: 30,
  },
});