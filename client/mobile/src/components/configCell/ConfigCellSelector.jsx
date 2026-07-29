import React, { useState, useCallback } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";
import { useDevice } from "../../hooks/useDevice";
import Symbol from "../symbol";

const ARASAAC_SEARCH_URL = "https://api.arasaac.org/api/pictograms/pt/search/";
const ARASAAC_IMAGE_URL = "https://static.arasaac.org/pictograms/";

export default function ConfigCellSelector({ image, setImage, onAssetSelect }) {
  const { contrastTheme } = useDisplaySettings();
  const { isTablet } = useDevice();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [localAssets, setLocalAssets] = useState([]);

  const numColumns = isTablet ? 5 : 4;

  const runSearch = useCallback(async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const response = await fetch(`${ARASAAC_SEARCH_URL}${encodeURIComponent(query.trim())}`);
      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar pictogramas:", err);
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, [query]);

  async function pickPersonalImage() {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 0.8 });
    if (result.didCancel || !result.assets?.length) return;
    const asset = result.assets[0];
    setLocalAssets((prev) => [asset, ...prev]);
    setImage(asset.uri);
    onAssetSelect(asset);
  }

  function selectPictogram(pictogramId) {
    setImage(`${ARASAAC_IMAGE_URL}${pictogramId}/${pictogramId}_300.png`);
    onAssetSelect(null);
  }

  function selectLocalAsset(asset) {
    setImage(asset.uri);
    onAssetSelect(asset);
  }

  const data = [
    ...localAssets.map((a) => ({ type: "local", asset: a, key: a.uri })),
    ...results.map((p) => ({ type: "arasaac", id: p._id, key: `arasaac-${p._id}` })),
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: contrastTheme.text }]}>Pictograma</Text>

      <Pressable
        style={[styles.uploadButton, { borderColor: contrastTheme.previewBorder }]}
        onPress={pickPersonalImage}
      >
        <Text style={{ color: contrastTheme.text }}>📷 Imagem pessoal</Text>
      </Pressable>

      <View style={styles.searchRow}>
        <TextInput
          style={[styles.searchInput, { color: contrastTheme.text, borderColor: contrastTheme.previewBorder }]}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={runSearch}
          placeholder="Buscar no Arasaac..."
          placeholderTextColor="#999"
          returnKeyType="search"
        />
        <Pressable style={styles.searchButton} onPress={runSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </Pressable>
      </View>

      {searching && <ActivityIndicator style={{ marginVertical: 8 }} />}

      <FlatList
        data={data}
        scrollEnabled={false}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.key}
        style={styles.grid}
        renderItem={({ item }) => {
          const source =
            item.type === "local" ? item.asset.uri : `${ARASAAC_IMAGE_URL}${item.id}/${item.id}_300.png`;
          const selected = image === source;
          return (
            <Pressable
              style={[
                styles.gridItem,
                { borderColor: contrastTheme.previewBorder },
                selected && styles.gridItemSelected,
              ]}
              onPress={() => (item.type === "local" ? selectLocalAsset(item.asset) : selectPictogram(item.id))}
            >
              <Symbol source={source} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  label: { fontSize: 14, fontWeight: "700" },
  uploadButton: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  searchRow: { flexDirection: "row", gap: 8 },
  searchInput: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: "#0b5c74",
    borderRadius: 8,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  searchButtonText: { color: "#fff", fontWeight: "700" },
  grid: { maxHeight: 260 },
  gridItem: {
    width: 70,
    height: 70,
    margin: 4,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  gridItemSelected: {
    borderWidth: 3,
  },
});