import React from 'react';
import ContentMobile from './MobileLayout';
import ContentTablet from './TabletLayout';
import { useDevice } from '../../hooks/useDevice';

export default function AboutScreen(){
    const { isTablet, isLandscape } = useDevice();

    return isTablet && isLandscape ? <ContentTablet /> : <ContentMobile />;
}