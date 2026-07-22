import { Text, StyleSheet } from 'react-native';

export default function CellText({ text, fontSize, bold, color }) {
  return (
    <Text
      style={[
        styles.text,
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