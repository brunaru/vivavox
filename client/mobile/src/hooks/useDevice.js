import { useWindowDimensions } from 'react-native';

export function useDevice() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return {
    isTablet,
    isMobile: !isTablet,
    type: isTablet ? 'tablet' : 'mobile',
  };
}