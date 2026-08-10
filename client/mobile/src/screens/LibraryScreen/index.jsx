import { View, ScrollView, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useDevice } from '../../hooks/useDevice'
import { useDisplaySettings } from "../../contexts/displaySettingsContext"

import LibraryHeader from './LibraryHeader'
import BoardLibrary from './BoardLibrary'

export default function LibraryScreen(){
    const { isTablet } = useDevice()

    const[searchInput, setSearchInput] = useState('')
    const[search, setSearch] = useState('')
    const { contrastTheme } = useDisplaySettings();
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [hasShadow, setHasShadow] = useState(false)

    return(
        <View style={[styles.container, {backgroundColor: contrastTheme.screenBackground1}]}>
            <LibraryHeader
                hasShadow={hasShadow}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[
                    styles.scrollContent,
                    isTablet && styles.scrollTablet
                ]}
                onScroll={(event) => {
                    const scrollY = event.nativeEvent.contentOffset.y;

                    if (scrollY > 10 && !hasShadow) {
                        setHasShadow(true);
                    } else if (scrollY <= 10 && hasShadow) {
                        setHasShadow(false);
                    }
                }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                
            >
                <BoardLibrary
                    search={search}
                    selectedCategory={selectedCategory}
                />
            </ScrollView>
        </View>
    ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  
});