import { createContext, useContext, useState, useEffect } from 'react';
import Tts from 'react-native-tts';

const PhraseContext = createContext();

export function PhraseContextProvider({ children }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
  Tts.getInitStatus()
    .then(() => {
      Tts.setDefaultLanguage('pt-BR');
      Tts.setDefaultRate(0.5, true);
    })
    .catch((err) => {
      console.log('TTS init error:', err);
    });
}, []);

  function addWord(word) {
    setWords((prev) => [...prev, word]);
  }

  function deleteWord() {
    setWords((prev) => prev.slice(0, -1));
  }

  function clearPhrase() {
    setWords([]);
  }

  function getPhrase() {
    return words.join(' ');
  }

  function speech() {
    const phrase = getPhrase();
    if (!phrase) return;

    Tts.stop(); 
    Tts.speak(phrase);
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