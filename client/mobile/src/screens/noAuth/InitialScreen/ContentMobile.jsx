import React from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import { VivavoxLogo, Turtle } from '../../../assets/items';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../../svg/arrow';


export default function ContentMobile(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Image
                    source={VivavoxLogo}
                    style={styles.logo}
                />
                <Text style={styles.subtitle}>Viva a sua voz.</Text>
            </View>
            <View style={styles.middle}>
                <Image
                    source={Turtle}
                    style={styles.turtle}
                />
            </View>
            <View style={styles.bottom}>
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
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  top: {
    top: '11%',
  },

  logo: {
    width: '70%',
    height: '30%',
    resizeMode: 'contain',
  },

  subtitle: {
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

  middle: {
    bottom: '5%',
  },

  turtle: {
    width: '50%',
    height: 150,
    left: '30%',
    resizeMode: 'contain',
  },

  bottom: {
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10%',
    color: '#003466',
  },

  buttons: {
    flexDirection: 'row',
    marginBottom: '5%'
  },

  buttonOutline: {
    borderWidth: 2,
    borderColor: '#0A2E5C',
    borderRadius: 30,
    marginRight: 12,
    paddingVertical: 12,
    paddingHorizontal: 34,
  },

  buttonFilled: {
    backgroundColor: '#003466',
    paddingVertical: 12,
    paddingHorizontal: 44,
    borderRadius: 30,
  },

  buttonText: {
    color: '#0A2E5C',
    fontSize: 20,
    fontWeight: 'bold',
  },

  arrow: {
    color: 'white',
    fontSize: 18,
  },
});