// SettingsHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from "../../components/Button";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";

export default function SettingsHeader({ 
  title, 
  subtitle, 
  onBack, 
  backText,
  isTablet 
}) {
  const { contrastTheme } = useDisplaySettings();

  return (
    <View style={[
      isTablet ? styles.headerTablet : styles.header,
      { backgroundColor: contrastTheme.boardTitleBackground }
    ]}>
      <View style={styles.headerRow}>
        {onBack && (
          <View style={styles.backButtonContainer}>
            {backText ? (
              <Button
                text={backText}
                onPress={onBack}
                hitSlop={12}
              />
            ) : (
              <Button 
                onPress={onBack} 
                text="‹" 
                round 
              />
            )}
          </View>
        )}
        
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: contrastTheme.title }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: contrastTheme.title, opacity: 0.85 }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerTablet: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerRow: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center',
    position: 'relative',
    minHeight: 50,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1, 
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});