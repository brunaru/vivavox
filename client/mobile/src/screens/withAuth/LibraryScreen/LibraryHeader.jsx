import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'

import { useBoard } from '../../../contexts/boardContext' 
import { useDevice } from '../../../hooks/useDevice'
import BoardPreview from './BoardPreview'
import { BubblesHalfPage, Turtle } from '../../../assets/items'
import SearchIcon from '../../../svg/search'

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function LibraryHeader({ 
  search,
  setSearch,
  searchInput,
  setSearchInput,
  selectedCategory,
  setSelectedCategory,
  hasShadow 
}){
    const { board, categorizedBoards } = useBoard();
    const { isTablet } = useDevice();
    const categories = Object.keys(categorizedBoards || {});
    const handleSearch = () => {
      setSearch(searchInput);
    }

    return(
        <View
            style={[
                styles.container,
                hasShadow && styles.shadow,
                isTablet && styles.containerTablet
            ]}
        >
            <View>
              <LinearGradient 
                  colors={['#031B45', '#003466', '#0a4780', '#026783', '#0388C2']} 
                  style={[styles.topHeader, isTablet && styles.topHeaderTablet]}
              >
                <Image
                  source={isTablet ? BubblesHalfPage.tablet : BubblesHalfPage.mobile}
                  style={styles.bubbles}
                />
                <View style={[styles.topHeaderContent, isTablet && styles.topHeaderContentTablet]}>
                  <View>
                    <Text style={styles.title}>Biblioteca</Text>
                  </View>
                  <View style={styles.topHeaderRight}>
                    <Image
                      source={Turtle}
                      style={styles.turtle}
                    />
                  </View>
                </View>
              </LinearGradient>  
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchLeft}>
                <TextInput
                    placeholder='Procurar prancha'
                    placeholderTextColor={'#868686'}
                    style={styles.input}
                    value={searchInput}
                    onChangeText={setSearchInput}
                />
              </View>
              <View style={styles.searchRight}>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <SearchIcon/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.filterContainer}>
              <Text style={styles.label}>
                Selecionar categorias:
              </Text>
              <View style={styles.dropdownBox}>
                <Text style={styles.dropdownText}>
                  {selectedCategory === 'all'
                    ? 'Todas'
                    : capitalize(selectedCategory)}
                </Text>
                <Text style={styles.arrow}>⌄</Text>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  style={styles.hiddenPicker}
                >
                  <Picker.Item label="Todas" value="all" />
                  {categories.map((cat) => (
                    <Picker.Item
                      key={cat}
                      label={capitalize(cat)}
                      value={cat}
                    />
                  ))}
                </Picker>
              </View>

            </View>
            <View style={styles.currentBoardContainer}>
                <Text style={styles.sectionTitle}>Prancha atual:</Text>
                <BoardPreview board={board} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AFC0CB',
    paddingBottom: 20,
  },
  containerTablet: {
    paddingBottom: 40,
  },
  shadow: {
    elevation: 4,
  },
  topHeader: {
    height: 130,
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden'
  },
  topHeaderTablet: {
    height: 160,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
    overflow: 'hidden'
  },
  topHeaderContent:{
    flexDirection: 'row',
    gap: 100,
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  topHeaderContentTablet:{
    flexDirection: 'row',
    gap: 100,
    paddingHorizontal: 40
  },
  bubbles:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  turtle: {
    width: 70,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center'
  },
  searchLeft:{
    marginTop: -25,
    marginLeft: 15,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '80%'
  },
  searchRight:{
    marginTop: -25,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  input: {
    height: 40,
  },
  filterContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    flexDirection: 'row',        
    alignItems: 'center', 
    gap: 10       
  },
  dropdownBox: {
    marginTop: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 10,
    height: 30,
    justifyContent: 'center',
    position: 'relative',
  },

  dropdownText: {
    fontSize: 14,
    marginRight: 10
  },

  arrow: {
    position: 'absolute',
    right: 8,
    fontSize: 14,
    marginLeft: 5,
    top: 0,
    fontWeight: '500'
  },

  hiddenPicker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  pickerWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  picker: {
    height: 15,
    width: 40
  },
  currentBoardContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});