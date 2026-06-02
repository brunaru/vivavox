import React from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import { BubblesHalfPage, Seaweed, BGAboutTabletFrame , Turtle } from '../../../assets/items';
import { useNavigation } from '@react-navigation/native';

import AboutText from './components/AboutText'; 
import TurtleText from './components/TurtleText';
import RelatedArticles from './components/RelatedArticles';

export default function ContentTablet(){
    const navigation = useNavigation();
    
    return(
        <View style={styles.container}>
            <Image 
              source={BGAboutTabletFrame} 
              style={styles.bg}
            />
            <Image
              source={BubblesHalfPage.tablet}
              style={styles.bubbles}
            />
            <View style={styles.left}>
              <View style={styles.top}>
                <Image 
                  source={Turtle} 
                  style={styles.turtle}
                />
              </View>
              <View style={styles.bottom}>
                <TurtleText/>
                <Text style={styles.subtitle}>Artigos relacionados:</Text>
                <RelatedArticles/>
              </View>
            </View>
            <View style={styles.right}>
               <View style={styles.rightTop}>
                <Image
                  source={Seaweed}
                  style={styles.seaweed}
                />
               </View>
               <AboutText/>
               <View style={styles.buttonsSection}>
                <Text style={styles.subtitle}>
                  Gostou da nossa proposta?
                </Text>
                <View style={styles.buttons}>
                  <Pressable 
                    style={styles.buttonOutline}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={styles.buttonOutlineText}>
                      Entrar
                    </Text>
                  </Pressable>
                  <Pressable 
                    style={styles.buttonFilled}
                    onPress={() => navigation.navigate('SingUp')}
                  >
                    <Text style={styles.buttonFilledText}>
                      Criar conta
                    </Text>
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
        backgroundColor: '#fff',
  },
  
  bg:{
    position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },

  bubbles:{
    position: 'absolute',
    top: 0,
    left: 0,
    width:"100%",
    height: 200,
    resizeMode: 'contain'
  },

  left: {
    flex: 1.3,
    justifyContent: 'center',
  },

  top: {
    alignItems: 'center',
    marginBottom: 40,
  },

  turtle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  bottom: {
    paddingHorizontal: 20,
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightTop: {
    alignItems: 'center',
    marginBottom: 40,
  },

  seaweed:{
    width: 500,
    height: 90,
    resizeMode: 'contain',
  },

  subtitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },

  buttonOutline: {
    borderWidth: 2,
    borderColor: '#0A2E5C',
    borderRadius: 30,
    marginRight: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },

  buttonOutlineText: {
    color: '#0A2E5C',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonFilled: {
    backgroundColor: '#003466',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
  },

  buttonFilledText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});