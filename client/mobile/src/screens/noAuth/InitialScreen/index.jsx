import React from "react";
import { View } from 'react-native';
import { useDevice } from "../../../hooks/useDevice";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "./BackgroundSection";
import ContentMobile from "./ContentMobile";
import ContentTablet from "./ContentTablet";

export default function InitialScreen(){
    const { isTablet } = useDevice();

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Background/>
                {isTablet ? <ContentTablet/> : <ContentMobile/>}
            </View>
        </SafeAreaView>
    );
}