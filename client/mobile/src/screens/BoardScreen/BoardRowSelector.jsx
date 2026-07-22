import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useBoard } from "../../contexts/boardContext";
import { useDevice } from "../../hooks/useDevice";
import BoardPreview from "../../components/board/BoardPreview";

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function BoardRowSelector({ onClose }) {
  const { categorizedBoards, fetchCategorizedBoards, board, navigateToBoard } = useBoard();
  const { isTablet, isIOS } = useDevice();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchCategorizedBoards();
  }, []);

  const categories = Object.keys(categorizedBoards || {});

  const displayedBoards = React.useMemo(() => {
    let boardsList = [];
    
    if (selectedCategory === "all") {
      const rawList = Object.values(categorizedBoards).flat();
      const seenIds = new Set();
      boardsList = rawList.filter(b => {
        if (!b?._id || seenIds.has(b._id)) return false;
        seenIds.add(b._id);
        return true;
      });
    } else {
      boardsList = categorizedBoards[selectedCategory] || [];
    }

    return boardsList.filter(b => b._id !== board?._id);
  }, [categorizedBoards, selectedCategory, board?._id]);

  const handleSelectBoard = (newBoard) => {
    navigateToBoard(newBoard);
    if (onClose) onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <View style={styles.filterContainer}>
          <Text style={isTablet ? styles.labelTablet : styles.label}>Categorias:</Text>

          {isIOS ? (
            <View style={styles.iosPickerWrapper}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.iosPicker}
                itemStyle={{ fontSize: 14, fontWeight: '500', height: 40 }}
              >
                <Picker.Item label="Todas" value="all" />
                {categories.map((cat) => (
                  <Picker.Item key={cat} label={capitalize(cat)} value={cat} />
                ))}
              </Picker>
              <Text style={styles.iosArrow}>⇅</Text>
            </View>
          ) : (
            <View style={styles.dropdownBox}>
              <Text style={styles.dropdownText} numberOfLines={1}>
                {selectedCategory === 'all' ? 'Todas' : capitalize(selectedCategory)}
              </Text>

              <Text style={styles.arrow}>⌄</Text>

              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.hiddenPicker}
                mode="dropdown"
              >
                <Picker.Item label="Todas" value="all" />
                {categories.map((cat) => (
                  <Picker.Item key={cat} label={capitalize(cat)} value={cat} />
                ))}
              </Picker>
            </View>
          )}
        </View>

        <TouchableOpacity style={isTablet ? styles.closeButtonTablet : styles.closeButton} onPress={onClose}>
          <Text style={isTablet ? styles.closeTextTablet : styles.closeText}>Fechar ✕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedBoards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleSelectBoard(item)}
          >
            <BoardPreview board={item} width={140} height={120} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#0b5c74",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 12,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  filterContainer: {
    flexDirection: 'row',        
    alignItems: 'center', 
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  labelTablet: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  dropdownBox: {
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 12,
    height: 32,
    minWidth: 110,
    maxWidth: 150,
    justifyContent: 'center',
    position: 'relative',
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 15,
    color: '#000',
  },
  arrow: {
    position: 'absolute',
    right: 8,
    fontSize: 14,
    top: 4,
    fontWeight: '500',
    color: '#555',
  },
  hiddenPicker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  iosPickerWrapper: {
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#999',
    height: 35,
    minWidth: 140,
    maxWidth: 200,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iosPicker: {
    height: 35,
  },
  iosArrow: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
    fontSize: 16,
    color: '#555',
  },
  closeButton: {
    paddingHorizontal: 8,
    backgroundColor: "#be554f",
    borderRadius: 6,
    borderColor: "#85150f",
    borderWidth: 1.5,
    height: 32,
    justifyContent: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  closeButtonTablet: {
    paddingHorizontal: 12,
    backgroundColor: "#be554f",
    borderRadius: 6,
    borderColor: "#85150f",
    borderWidth: 2,
    height: 32,
    justifyContent: "center",
  },
  closeTextTablet: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 10,
    height: 130,
    alignItems: "center",
  },
  card: {
    width: 125,
    height: 115,
    justifyContent: "center",
    alignItems: "center",
  },
});