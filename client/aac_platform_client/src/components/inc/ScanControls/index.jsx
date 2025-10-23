// client/aac_platform_client/src/components/inc/ScanControls/index.jsx
import React, { useState, useEffect } from 'react';
import { useScan } from '../../contexts/ScanContext';
import { 
    ControlsContainer, 
    ControlButton, 
    KeyDisplay, 
    Label, 
    SpeedControlContainer, 
    SpeedButton, 
    SpeedDisplay 
} from './styled';

function ScanControls() {
    const { 
        setIsScanning, 
        isScanning, 
        triggerKey, 
        setTriggerKey, 
        scanSpeed, 
        setScanSpeed 
    } = useScan();
    const [isListening, setIsListening] = useState(false);

    const MIN_SPEED = 500; // 0.5s
    const MAX_SPEED = 4000; // 4s
    const SPEED_STEP = 250; // 0.25s

    const handleChangeKeyClick = () => {
        setIsListening(true);
    };

    useEffect(() => {
        if (!isListening) return;

        const handleNewKey = (event) => {
            event.preventDefault();
            if (event.code) {
                setTriggerKey(event.code);
            }
            setIsListening(false);
        };
        
        window.addEventListener('keydown', handleNewKey, { once: true });
        
        return () => window.removeEventListener('keydown', handleNewKey);
    }, [isListening, setTriggerKey]);

    const handleSpeedChange = (e) => {
        setScanSpeed(Number(e.target.value));
    };

    const increaseSpeed = () => {
        setScanSpeed(prev => Math.min(prev + SPEED_STEP, MAX_SPEED));
    };

    const decreaseSpeed = () => {
        setScanSpeed(prev => Math.max(prev - SPEED_STEP, MIN_SPEED));
    };

    return (
        <ControlsContainer>
            <ControlButton onClick={() => setIsScanning(prev => !prev)} $active={isScanning}>
                {isScanning ? 'Parar Varredura' : 'Iniciar Varredura'}
            </ControlButton>
            
            <SpeedControlContainer>
                <Label>Velocidade:</Label>
                <SpeedButton onClick={decreaseSpeed}>-</SpeedButton>
                <input 
                    type="range"
                    min={MIN_SPEED}
                    max={MAX_SPEED}
                    step={SPEED_STEP}
                    value={scanSpeed}
                    onChange={handleSpeedChange}
                />
                <SpeedButton onClick={increaseSpeed}>+</SpeedButton>
                <SpeedDisplay>{(scanSpeed / 1000).toFixed(2)}s</SpeedDisplay>
            </SpeedControlContainer>
            
            <Label>Gatilho:</Label>
            <KeyDisplay>{triggerKey}</KeyDisplay>
            <ControlButton onClick={handleChangeKeyClick} $listening={isListening}>
                {isListening ? 'Pressione uma tecla...' : 'Mudar Tecla'}
            </ControlButton>
        </ControlsContainer>
    );
}

export default ScanControls;

