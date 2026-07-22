import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from "../../components/Button";

export default function SettingsHeader({ 
  title, 
  subtitle, 
  onBack, 
  backText,
  isTablet 
}) {
  return (
    <View style={isTablet ? styles.headerTablet : styles.header}>
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
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0b5c74',
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
    backgroundColor: '#0b5c74',
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
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#b6e9ff',
    marginTop: 4,
    textAlign: 'center',
  },
});