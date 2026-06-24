import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Tts from 'react-native-tts';

const PhraseContext = createContext();

export function PhraseContextProvider({ children }) {
  const [words, setWords] = useState([]);
  const isReady = useRef(false);

  useEffect(() => {
    const initTts = async () => {
      try {
        await Tts.getInitStatus();

        const voices = await Tts.voices();

        const ptVoice =
          voices.find(v => v.language?.includes('pt-BR')) ||
          voices.find(v => v.language?.includes('pt')) ||
          voices[0];

        if (ptVoice) {
          Tts.setDefaultVoice(ptVoice.id);
          Tts.setDefaultLanguage(ptVoice.language);
        }

        Tts.setDefaultRate(0.5);
        Tts.setDefaultPitch(1.0);
        
        Tts.addEventListener('tts-start', () => console.log('TTS começou'));
        Tts.addEventListener('tts-finish', () => console.log('TTS terminou'));
        Tts.addEventListener('tts-cancel', () => console.log('TTS cancelado'));

        isReady.current = true;
      } catch (err) {
        console.log('TTS init error:', err);
      }
    };

    initTts();

    return () => {
      Tts.removeAllListeners();
    };
  }, []);

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
      Tts.speak(phrase);
    } catch (err) {
      console.log('TTS error:', err);
    }
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
      }}
    >
      {children}
    </PhraseContext.Provider>
  );
}

export function usePhrase() {
  return useContext(PhraseContext);
}