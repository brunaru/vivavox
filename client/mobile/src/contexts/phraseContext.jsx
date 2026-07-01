import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import Tts from 'react-native-tts';
import { MMKV } from 'react-native-mmkv';

const VOICE_STORAGE_KEY = 'tts_selected_voice_id';

function createStorage() {
  try {
    const mmkv = new MMKV();
    return {
      getString: key => mmkv.getString(key),
      set: (key, value) => mmkv.set(key, value),
      isFallback: false,
    };
  } catch (err) {
    console.warn(
      '[phraseContext] MMKV falhou ao inicializar. ' +
        'Usando fallback em memória. Rode "cd ios && pod install" e rebuilde o app.',
      err
    );
    const memoryStore = new Map();
    return {
      getString: key => memoryStore.get(key),
      set: (key, value) => memoryStore.set(key, value),
      isFallback: true,
    };
  }
}

const storage = createStorage();

const PhraseContext = createContext();

function buildSpeakOptions(voice) {
  if (!voice) return {};

  if (Platform.OS === 'ios') {
    return { iosVoiceId: voice.id, rate: 0.5 };
  }

  return {
    androidParams: {
      KEY_PARAM_VOICE_NAME: voice.id,
      KEY_PARAM_STREAM: 'STREAM_MUSIC',
    },
  };
}

async function applyVoiceToEngine(voice) {
  if (!voice) return;
  try {
    await Tts.setDefaultLanguage(voice.language);
  } catch (err) {
  }
  try {
    await Tts.setDefaultVoice(voice.id);
  } catch (err) {
  }
}

export function PhraseContextProvider({ children }) {
  const [words, setWords] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState(null);
  const [isTtsReady, setIsTtsReady] = useState(false);
  const isReady = useRef(false);
  const selectedVoiceRef = useRef(null); 

  useEffect(() => {
    let listeners = [];

    const initTts = async () => {
      try {
        await Tts.getInitStatus();
        const allVoices = await Tts.voices();

        const usableVoices = allVoices.filter(
          v => !v.notInstalled && !v.networkConnectionRequired
        );
        const availableVoices = usableVoices.length > 0 ? usableVoices : allVoices;
        setVoices(availableVoices);

        const storedVoiceId = storage.getString(VOICE_STORAGE_KEY);
        const storedVoice = storedVoiceId
          ? availableVoices.find(v => v.id === storedVoiceId)
          : null;

        const fallbackVoice =
          availableVoices.find(v => v.language?.includes('pt-BR')) ||
          availableVoices.find(v => v.language?.includes('pt')) ||
          availableVoices[0];

        const voiceToUse = storedVoice || fallbackVoice;

        if (voiceToUse) {
          await applyVoiceToEngine(voiceToUse);
          selectedVoiceRef.current = voiceToUse;
          setSelectedVoiceId(voiceToUse.id);
          if (!storedVoice) storage.set(VOICE_STORAGE_KEY, voiceToUse.id);
        }

        try {
          await Tts.setDefaultRate(0.5, true);
        } catch (err) {}

        try {
          await Tts.setDefaultPitch(1.0);
        } catch (err) {}

        listeners.push(Tts.addEventListener('tts-start', () => {}));
        listeners.push(Tts.addEventListener('tts-finish', () => {}));
        listeners.push(Tts.addEventListener('tts-cancel', () => {}));
        listeners.push(Tts.addEventListener('tts-error', () => {}));

        isReady.current = true;
        setIsTtsReady(true);
      } catch (err) {
        console.warn('[phraseContext] Falha ao inicializar TTS:', err);
      }
    };

    initTts();

    return () => {
      listeners.forEach(l => l?.remove?.());
    };
  }, []);

  //Voice Settings
  const changeVoice = useCallback(
    async (voiceId, { preview = true } = {}) => {
      const voice = voices.find(v => v.id === voiceId);
      if (!voice) return false;

      await applyVoiceToEngine(voice);
      selectedVoiceRef.current = voice;
      setSelectedVoiceId(voice.id);
      storage.set(VOICE_STORAGE_KEY, voice.id);

      if (preview) {
        try {
          await Tts.stop();
          await Tts.speak('Olá, esta é a minha voz.', buildSpeakOptions(voice));
        } catch (err) {}
      }
      return true;
    },
    [voices]
  );
//FeatureBar
  function addWord(word) {
    setWords(prev => [...prev, word]);
  }

  function deleteWord() {
    setWords(prev => prev.slice(0, -1));
  }

  function clearPhrase() {
    setWords([]);
  }

  function getPhrase() {
    return words.join(' ');
  }

  async function speech() {
    const phrase = getPhrase();
    if (!phrase || !isReady.current) return;

    try {
      await Tts.stop();
    } catch (err) {}

    try {
      await Tts.speak(phrase, buildSpeakOptions(selectedVoiceRef.current));
    } catch (err) {}
  }

  return (
    <PhraseContext.Provider
      value={{
        words,
        setWords,
        currentPhrase: getPhrase(),
        addWord,
        deleteWord,
        clearPhrase,
        speech,
        voices,
        selectedVoiceId,
        changeVoice,
        isTtsReady,
        isStoragePersistent: !storage.isFallback,
      }}
    >
      {children}
    </PhraseContext.Provider>
  );
}

export function usePhrase() {
  const context = useContext(PhraseContext);
  if (!context) {
    throw new Error('usePhrase deve ser usado dentro de um <PhraseContextProvider>');
  }
  return context;
}