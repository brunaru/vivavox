import { createContext, useContext, useState } from 'react';
import * as Speech from 'expo-speech';

const PhraseContext = createContext();

export function PhraseContextProvider({ children }) {
  const [words, setWords] = useState([]);

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

    Speech.speak(phrase, {
      language: 'pt-BR',
    });
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