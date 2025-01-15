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

  function clearPhrase() {
    setCurrentPhrase('');
  }

  return (
    <PhraseContext.Provider value={{ currentPhrase, addWord, clearPhrase }}>
      {children}
    </PhraseContext.Provider>
  );
}

// Hook for context usage:
export function usePhrase() {
  return useContext(PhraseContext);
}