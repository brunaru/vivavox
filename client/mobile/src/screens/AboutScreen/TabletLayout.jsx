import React from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {
  BubblesHalfPage,
  Seaweed,
  Turtle,
} from '../../assets/items';
import { useNavigation } from '@react-navigation/native';

import AboutText from './components/AboutText';
import TurtleText from './components/TurtleText';
import RelatedArticles from './components/RelatedArticles';

export default function ContentTablet() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#031B45', '#003466', '#0a4780', '#026783', '#0388C2']}
        style={styles.bg}
      >
      <Image
        source={BubblesHalfPage.tablet}
        style={styles.bubbles}
      />
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.left}>
            <View style={styles.top}>
              <Image
                source={Turtle}
                style={styles.turtle}
              />
            </View>

            <View style={styles.bottom}>
              <TurtleText />
              <Text style={styles.subtitle}>Artigos relacionados:</Text>
              <RelatedArticles />
            </View>
        </View>

        <View style={styles.right}>
          <View style={styles.rightTop}>
            <Image
              source={Seaweed}
              style={styles.seaweed}
            />
          </View>

          <AboutText style={{ marginBottom: 10}}/>

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
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.buttonFilledText}>
                  Criar conta
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },

  bg: {
    flex: 0.20,
    width: '100%',
    height: 150,
    top: 0,
    justifyContent: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden' 
  },

  content: {
    flex: 0.7,
    justifyContent: "flex-start",
    marginTop: -200,
    paddingHorizontal: 20,
    flexDirection: 'row'
  },

  bubbles: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '50%',
    height: '100%',
    resizeMode: 'contain',
  },

  left: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 40,
    overflow: 'hidden',
  },

  top: {
    alignItems: 'center',
    marginBottom: 30,
  },

  turtle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  bottom: {
    paddingHorizontal: 20,
    gap: 10,
  },

  sectionTitle: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 16,
    fontWeight: 'bold',
  },

  right: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rightTop: {
    alignItems: 'center',
    marginTop: 80,
  },

  seaweed: {
    top: 20,      
    right: 0,     
    width: 700,
    height: 90,
    resizeMode: 'contain',
  },

  buttonsSection: {
    marginTop: 10,
    justifyContent: 'center'
  },

  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 5,
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