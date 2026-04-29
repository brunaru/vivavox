import React from "react";
import { View } from 'react-native';
import { useDevice } from "../../hooks/useDevice";
import Background from "./BackgroundSection";
import ContentMobile from "./ContentMobile";
import ContentTablet from "./ContentTablet";

export default function InitialScreen(){
    const { isTablet } = useDevice();

    return(
        <View style={{ flex: 1 }}>
            <Background/>
            {isTablet ? <ContentTablet/> : <ContentMobile/>}
        </View>
    );
}