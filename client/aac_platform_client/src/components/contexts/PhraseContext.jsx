import { createContext, useContext, useState } from 'react';

// Create the context:
const PhraseContext = createContext();

// Create a provider:
export function PhraseContextProvider({ children }) {
  const [currentPhrase, setCurrentPhrase] = useState('');

  function addWord(word) {
    setCurrentPhrase((prevPhrase) => {
      const newPhrase = prevPhrase.length > 0
        ? `${prevPhrase} ${word}`
        : word;
      return newPhrase;
    });
  }

  function deleteWord() {
    setCurrentPhrase((prevPhrase) => {
      // Remove first and last white spaces, and split in words:
      const words = prevPhrase.trim().split(' ');

      // Remove last word:
      words.pop();

      return words.join(' ');
    });
  }

  function clearPhrase() {
    setCurrentPhrase('');
  }

  function speech() {
    const utterance = new SpeechSynthesisUtterance(currentPhrase);

    speechSynthesis.speak(utterance);
  }

  return (
    <PhraseContext.Provider value={{ currentPhrase, addWord, clearPhrase, deleteWord, speech }}>
      {children}
    </PhraseContext.Provider>
  );
}

// Hook for context usage:
export function usePhrase() {
  return useContext(PhraseContext);
}