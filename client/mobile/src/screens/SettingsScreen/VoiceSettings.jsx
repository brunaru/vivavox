import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { usePhrase } from '../../contexts/phraseContext';
import { useDevice } from '../../hooks/useDevice';
import { getLocaleInfo, sortLocaleEntries } from '../../utils/localeInfo';
import SettingsHeader from './SettingsHeader';

function groupByCountry(voices) {
  const groups = {};
  (voices ?? []).forEach(v => {
    const locale = v.language || 'unknown';
    if (!groups[locale]) groups[locale] = [];
    groups[locale].push(v);
  });

  return Object.entries(groups)
    .sort(sortLocaleEntries)
    .map(([locale, localeVoices]) => ({
      locale,
      ...getLocaleInfo(locale),
      voices: localeVoices,
    }));
}

export default function VoiceSettings() {
  const { voices, selectedVoiceId, changeVoice, isTtsReady } = usePhrase();
  const { isTablet, isLandscape } = useDevice();
  const navigation = useNavigation();

  const [selectedLocale, setSelectedLocale] = useState(null);

  const numColumns = isTablet ? (isLandscape ? 3 : 2) : 1;

  const countries = useMemo(() => groupByCountry(voices), [voices]);

  const currentCountry = useMemo(
    () => countries.find(c => c.locale === selectedLocale) || null,
    [countries, selectedLocale]
  );

  const renderVoiceItem = ({ item: voice }) => {
    const isSelected = voice.id === selectedVoiceId;

    return (
      <Pressable
        onPress={() => changeVoice(voice.id)}
        style={({ pressed }) => [
          styles.card,
          numColumns > 1 && styles.cardGrid,
          isSelected && styles.cardSelected,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
            {voice.name || voice.id}
          </Text>
          <Text style={styles.cardSubtitle}>{voice.quality || voice.language}</Text>
        </View>
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioDot} />}
        </View>
      </Pressable>
    );
  };

  const renderCountryItem = ({ item: country }) => {
    const hasSelectedVoice = country.voices.some(v => v.id === selectedVoiceId);

    return (
      <Pressable
        onPress={() => setSelectedLocale(country.locale)}
        style={({ pressed }) => [
          styles.card,
          numColumns > 1 && styles.cardGrid,
          hasSelectedVoice && styles.cardSelected,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.flag}>{country.flag}</Text>
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, hasSelectedVoice && styles.cardTitleSelected]}>
            {country.country}
          </Text>
          <Text style={styles.cardSubtitle}>
            {country.voices.length} {country.voices.length === 1 ? 'voz' : 'vozes'}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    );
  };

  if (!isTtsReady) {
    return (
      <View style={styles.containerRow}>
        <SettingsHeader 
          title="Configurações de voz"
          subtitle="Carregando vozes disponíveis..."
          onBack={() => {}}
          isTablet={isTablet}
        />
      </View>
    );
  }

  if (!voices || voices.length === 0) {
    return (
      <View style={styles.container}>
        <SettingsHeader 
          title="Configurações de voz"
          subtitle="Nenhuma voz disponível neste dispositivo."
          onBack={() => {}}
        />
      </View>
    );
  }

  if (currentCountry) {
    return (
      <View style={styles.container}>
        <SettingsHeader 
          title={`${currentCountry.flag} ${currentCountry.country}`}
          subtitle="Toque em uma voz para selecioná-la."
          backText="‹ Países"
          onBack={() => setSelectedLocale(null)}
        />

        <FlatList
          data={currentCountry.voices}
          key={`voices-${numColumns}`}
          numColumns={numColumns}
          keyExtractor={item => item.id}
          renderItem={renderVoiceItem}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SettingsHeader 
        title="Configurações de voz"
        subtitle="Escolha o país para ver as vozes disponíveis."
        onBack={() => navigation.navigate('Settings')}
      />

      <FlatList
        data={countries}
        key={`countries-${numColumns}`}
        numColumns={numColumns}
        keyExtractor={item => item.locale}
        renderItem={renderCountryItem}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFC0CB',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#AFC0CB',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    gap: 12,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ebf1f8',
    borderColor: "#0b5c74", 
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  cardGrid: {
    marginHorizontal: 6,
  },
  cardSelected: {
    borderColor: "#3078b0", 
    backgroundColor: '#beddf4',
  },
  cardPressed: {
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  cardTitleSelected: {
    color: '#3078b0',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#15579e',
    marginTop: 2,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  chevron: {
    fontSize: 22,
    color: '#C7C7CC',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#007AFF',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
});