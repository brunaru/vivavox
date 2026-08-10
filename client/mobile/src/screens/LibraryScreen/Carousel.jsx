import { View, Text, Dimensions, FlatList } from 'react-native';
import { useDevice } from '../../hooks/useDevice';
import BoardPreview from '../../components/board/BoardPreview';
import { useDisplaySettings } from "../../contexts/displaySettingsContext"

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function LibraryCarousel({ title, boards = [] }) {
  const { isTablet, width, height, isLandscape } = useDevice();
  const { contrastTheme } = useDisplaySettings();
  const ITEM_WIDTH = isTablet
    ? isLandscape
      ? width * 0.15   
      : width * 0.23   
      : width * 0.45;
    
  const ITEM_HEIGHT = isTablet ? 160 : 140;
  const SPACING = isTablet ? 10 : 10;

  if (!boards || boards.length === 0) return null;

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={[{
          fontSize: isTablet ? 18 : 16,
          fontWeight: 'bold',
          marginBottom: 12,
          marginLeft: 20,
        },
        {color: contrastTheme.text}
      ]}
      >
        {capitalize(title)}
      </Text>

      <FlatList
        data={boards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
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
            />
          </View>
        )}
      />
    </View>
  );
}