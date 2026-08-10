import { Text, StyleSheet } from 'react-native';
import { useDisplaySettings } from "../../contexts/displaySettingsContext"

export default function CellText({ text, fontSize, bold, color }) {
  const { contrastTheme } = useDisplaySettings();
  return (
    <Text
      style={[
        styles.text,
        {color: contrastTheme.text},
        { fontSize: fontSize || 14 },
        bold && styles.bold,
        color && { color },
      ]}
      numberOfLines={2}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingHorizontal: 6,
    paddingVertical: 0,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '800',
  },
});