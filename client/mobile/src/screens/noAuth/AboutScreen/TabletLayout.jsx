import React from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import {
  BubblesHalfPage,
  Seaweed,
  BGAboutTabletFrame,
  Turtle,
} from '../../../assets/items';
import { useNavigation } from '@react-navigation/native';

import AboutText from './components/AboutText';
import TurtleText from './components/TurtleText';
import RelatedArticles from './components/RelatedArticles';

export default function ContentTablet() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={BGAboutTabletFrame}
        style={styles.bg}
      />

      <Image
        source={BubblesHalfPage.tablet}
        style={styles.bubbles}
      />

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

          <AboutText />

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
    position: 'absolute',
    justifyContent: 'flex-start',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: 250,
    resizeMode: 'stretch'
  },

  content: {
    flex: 1,
    flexDirection: 'row',
  },

  bubbles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: 100,
    resizeMode: 'contain',
  },

  left: {
    flex: 1.2,
    justifyContent: 'center',
    padding: 40,
    overflow: 'hidden',
  },

  top: {
    alignItems: 'center',
    marginBottom: 50,
  },

  turtle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  bottom: {
    paddingHorizontal: 20,
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 30,
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
    marginTop: 50,
  },

  seaweed: {
    width: 500,
    height: 90,
    resizeMode: 'contain',
  },

  buttonsSection: {
    marginTop: 20,
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