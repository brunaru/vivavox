import React, { useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { BubblesHalfPage, Turtle } from '../../assets/items';
import { usePhrase } from '../../contexts/phraseContext';
import { useDevice } from '../../hooks/useDevice';

function useSettingsSections() {
  const { voices, selectedVoiceId, isTtsReady } = usePhrase();

  return useMemo(() => {
    const selectedVoice = voices?.find(v => v.id === selectedVoiceId);

    return [
      {
        id: 'voice',
        icon: '🗣️',
        title: 'Voz',
        subtitle: !isTtsReady
          ? 'Carregando...'
          : selectedVoice?.name || selectedVoice?.id || 'Nenhuma voz selecionada',
        routeName: 'VoiceSettings',
      },
    ];
  }, [voices, selectedVoiceId, isTtsReady]);
}

export default function SettingsScreen() {
  const sections = useSettingsSections();
  const { isTablet, isLandscape } = useDevice();
  const navigation = useNavigation();

  const numColumns = isTablet ? (isLandscape ? 3 : 2) : 1;

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate(item.routeName)}
      style={({ pressed }) => [
        styles.card,
        numColumns > 1 && styles.cardGrid,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
       <View>
          <LinearGradient 
            colors={['#031B45', '#003466', '#0a4780', '#026783', '#0388C2']} 
            style={[styles.topHeader, isTablet && styles.topHeaderTablet]}
          >
            <Image
              source={isTablet ? BubblesHalfPage.tablet : BubblesHalfPage.mobile}
              style={styles.bubbles}
            />
              <View style={[styles.topHeaderContent, isTablet && styles.topHeaderContentTablet]}>
                  <View>
                    <Text style={styles.title}>Configurações</Text>
                    <Text style={styles.subtitle}>Personalize o app do seu jeito!</Text>
                  </View>
                  <View>
                    <Image
                      source={Turtle}
                      style={styles.turtle}
                    />
                  </View>
              </View>
          </LinearGradient>  
        </View>

      <FlatList
        data={sections}
        key={`settings-${numColumns}`}
        numColumns={numColumns}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#ebf1f8',
    borderColor: "#0b5c74", 
    borderRadius: 14,
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardGrid: {
    marginHorizontal: 6,
  },
  cardPressed: {
    opacity: 0.7,
  },
  cardSubtitle: {
    color: '#15579e',
    fontSize: 13,
    marginTop: 2,
  },
  cardTitle: {
    color: '#1C1C1E',
    fontSize: 16,
    fontWeight: '600',
  },
  chevron: {
    color: '#C7C7CC',
    fontSize: 22,
    fontWeight: '400',
  },
  columnWrapper: {
    gap: 12,
  },
  container: {
    backgroundColor: '#AFC0CB',
    flex: 1,
  },
  topHeader: {
    height: 130,
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden'
  },
  topHeaderTablet: {
    height: 160,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
    overflow: 'hidden'
  },
  topHeaderContent:{
    flexDirection: 'row',
    gap: 50,
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  topHeaderContentTablet:{
    flexDirection: 'row',
    gap: 50,
    paddingHorizontal: 40
  },
  bubbles:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  turtle: {
    width: 70,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  subtitle: {
    color: '#b6e9ff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
});