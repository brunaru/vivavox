import { View, Text, Dimensions, FlatList } from 'react-native';
import { useDevice } from '../../../hooks/useDevice';
import BoardPreview from './BoardPreview';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function LibraryCarousel({ title, boards = [] }) {
  const { isTablet } = useDevice();
  const { width } = Dimensions.get('window');

  const ITEM_WIDTH = isTablet ? width * 0.18 : width * 0.35;
  const ITEM_HEIGHT = isTablet ? 180 : 140;
  const SPACING = isTablet ? 20 : 10;

  if (!boards || boards.length === 0) return null;

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: isTablet ? 20 : 16,
          fontWeight: 'bold',
          marginBottom: 12,
          marginLeft: 20,
        }}
      >
        {capitalize(title)}
      </Text>

      <FlatList
        data={boards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
        renderItem={({ item }) => (
          <View
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BoardPreview
              board={item}
              width={ITEM_WIDTH * 0.9}
              height={ITEM_HEIGHT * 0.9}
            />
          </View>
        )}
      />
    </View>
  );
}