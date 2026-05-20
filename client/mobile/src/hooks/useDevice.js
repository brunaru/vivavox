import { useWindowDimensions, Platform } from 'react-native';

export function useDevice() {
  const { width, height } = useWindowDimensions();

  const isTablet = Math.min(width, height) >= 768;

  return {
    width,
    height,
    isTablet,
    isMobile: !isTablet,
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
    type: isTablet ? 'tablet' : 'mobile',
  };
}