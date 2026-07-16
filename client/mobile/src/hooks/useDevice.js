import { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';

export function useDevice() {
  const [dims, setDims] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ screen }) => {
      setDims(screen);
    });
    return () => sub?.remove();
  }, []);

  const { width, height } = dims;
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