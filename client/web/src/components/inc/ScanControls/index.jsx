// client/aac_platform_client/src/components/inc/ScanControls/index.jsx
import { useState, useEffect, useRef } from 'react';
import { useScan } from '../../contexts/ScanContext';
import { useBlinkDetection, DEBUG_MODE } from '../../hooks/BlinkDetection';
import Button from '../Button';
import { 
    ControlsContainer, 
    KeyDisplay, 
    Label, 
    SpeedDisplay,
    ControlGroup,
    BlinkStatusContainer,
    StatusIndicator,
    StatusText,
    GridCell,
    InnerGridCell,
    SpeedRangeContainer
} from './styled';

import playIcon from '../../images/play.svg';
import stopIcon from '../../images/stop.svg';
import configurarIcon from '../../images/configurar.svg';
import eyeIcon from '../../images/eye.svg';

function ScanControls() {
    const { 
        setIsScanning, 
        isScanning, 
        triggerKey, 
        setTriggerKey, 
        scanSpeed, 
        setScanSpeed,
        isBlinkScanMode,
        setIsBlinkScanMode,
        handleScanTrigger,
        isKeyScanMode,
        setIsKeyScanMode,
    } = useScan();
    const [isListening, setIsListening] = useState(false);
    const videoRef = useRef(null);
    const [blinkDetectionReady, setBlinkDetectionReady] = useState(false);
    const [blinkDetectionError, setBlinkDetectionError] = useState(null);
    
    const blinkDetectionHook = useBlinkDetection(videoRef);
    
    const handleScanTriggerRef = useRef(handleScanTrigger);
    const blinkDetectionHookRef = useRef(blinkDetectionHook);

    useEffect(() => {
        handleScanTriggerRef.current = handleScanTrigger;
    }, [handleScanTrigger]);

    useEffect(() => {
        blinkDetectionHookRef.current = blinkDetectionHook;
    }, [blinkDetectionHook]);

    const MIN_SPEED = 500; 
    const MAX_SPEED = 4000; 
    const SPEED_STEP = 250; 

    useEffect(() => {
        if (isBlinkScanMode && !blinkDetectionReady) {
            const initializeBlinkDetection = async () => {
                try {
                    setBlinkDetectionError(null);
                    if (DEBUG_MODE) console.log('Inicializando detecção de piscadas...');
                    await blinkDetectionHookRef.current.initialize();
                    setBlinkDetectionReady(true);
                    if (DEBUG_MODE) console.log('Detecção de piscadas inicializada!');
                } catch (err) {
                    console.error('Erro ao inicializar detecção de piscadas:', err);
                    setBlinkDetectionError(err.message || 'Erro desconhecido');
                }
            };
            initializeBlinkDetection();
        }
    }, [isBlinkScanMode, blinkDetectionReady]);

    useEffect(() => {
        if (isBlinkScanMode && blinkDetectionReady) {
            if (DEBUG_MODE) console.log('Iniciando detecção de piscadas como trigger...');
            let lastBlinkState = false;
            
            const cleanup = blinkDetectionHookRef.current.startPrediction((blinkEvent) => {
                if (!blinkEvent.blink && lastBlinkState) {
                    if (DEBUG_MODE) console.log('Piscada detectada! Acionando gatilho de varredura');
                    handleScanTriggerRef.current();
                }
                lastBlinkState = blinkEvent.blink;
            });
            
            return () => {
                if (DEBUG_MODE) console.log('Parando detecção de piscadas...');
                if (cleanup) cleanup();
                blinkDetectionHookRef.current.stopPrediction();
            };
        }
    }, [isBlinkScanMode, blinkDetectionReady]);

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

    const handleBlinkScanToggle = () => {
        if (!isBlinkScanMode) {
            setIsBlinkScanMode(true);
        } else {
            setIsBlinkScanMode(false);
            blinkDetectionHookRef.current.stopPrediction();
            setBlinkDetectionReady(false);
        }
    };


    const speedPercent = ((scanSpeed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100;

    return (
        <ControlsContainer>
            <GridCell>
                <ControlGroup>
                    <Button
                        onClick={() => setIsKeyScanMode(prev => !prev)}
                        text={isKeyScanMode ? 'Desativar' : 'Ativar'}
                        image={isScanning ? stopIcon : playIcon}
                        height="100%"
                        width="10vw"
                        disabled={isBlinkScanMode}
                        title={isBlinkScanMode ? "Desative modo de piscada para usar varredura por tecla" : ""}
                    />
                    <Label>Varredura por Tecla</Label>
                    
                </ControlGroup>
            </GridCell>

            <GridCell>
                <Label>Gatilho</Label>
                <ControlGroup>
                    <KeyDisplay>{triggerKey}</KeyDisplay>
                    <Button
                        onClick={handleChangeKeyClick}
                        text={isListening ? 'Aguardando...' : 'Mudar'}
                        image={configurarIcon}
                        height="100%"
                        width="12vw"
                        disabled={isBlinkScanMode}
                        title={isBlinkScanMode ? "Desative modo de piscada para mudar a tecla" : ""}
                    />
                </ControlGroup>
            </GridCell>

            <GridCell>
                <InnerGridCell>
                    <Button
                        onClick={handleBlinkScanToggle}
                        text={isBlinkScanMode ? 'Desativar Piscada' : 'Ativar Piscada'}
                        image={eyeIcon}
                        height="100%"
                        width="13vw"
                        title={isBlinkScanMode ? "Clique para desativar varredura por piscada" : "Clique para ativar varredura por piscada"}
                    />
                    <Label>Varredura por Piscada</Label>
                </InnerGridCell>
                <ControlGroup>
                {isBlinkScanMode && (
                    <BlinkStatusContainer>
                        <StatusIndicator $status={
                            blinkDetectionHook.isLoading ? 'loading' :
                            blinkDetectionError ? 'error' :
                            blinkDetectionReady ? 'success' :
                            'idle'
                        } />
                        <StatusText>
                            {blinkDetectionHook.isLoading ? 'Carregando...' :
                             blinkDetectionError ? `Erro` :
                             blinkDetectionReady ? 'Detectando' :
                             'Aguardando'}
                        </StatusText>
                    </BlinkStatusContainer>
                )}


                </ControlGroup>
            </GridCell>

            <GridCell>
                <Label>Intervalo de Varredura</Label>
                <ControlGroup>
                    <Button
                        onClick={decreaseSpeed}
                        text="−"
                        height="2.5vw"
                        width="2.5vw"
                        fontSize="0.9vw"
                    />
                    <SpeedRangeContainer style={{ '--value': `${speedPercent}%` }}>
                        <input 
                            type="range"
                            min={MIN_SPEED}
                            max={MAX_SPEED}
                            step={SPEED_STEP}
                            value={scanSpeed}
                            onChange={handleSpeedChange}
                        />
                    </SpeedRangeContainer>
                    <Button
                        onClick={increaseSpeed}
                        text="+"
                        height="2.5vw"
                        width="2.5vw"
                        fontSize="0.9vw"
                    />
                    <SpeedDisplay>{(scanSpeed / 1000).toFixed(2)}s</SpeedDisplay>
                </ControlGroup>
            </GridCell>

            <video
                ref={videoRef}
                style={{
                    display: 'none',
                    width: '500px',
                    height: '500px',
                    transform: 'scaleX(-1)' 
                }}
                autoPlay
                playsInline
            >
                <track kind="captions" />
            </video>
        </ControlsContainer>
    );
}

export default ScanControls;

