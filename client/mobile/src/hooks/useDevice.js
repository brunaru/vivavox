import { useState, useEffect } from 'react';
import { useWindowDimensions, Dimensions, Platform } from 'react-native';

export function useDevice() {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 768;
  const isLandscape = width > height;

  return {
    width,
    height,
    isTablet,
    isLandscape,
    isMobile: !isTablet,
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
    type: isTablet ? 'tablet' : 'mobile',
  };
}