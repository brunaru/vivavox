import { createContext, useContext, useState } from 'react';

// Create the context:
const PhraseContext = createContext();

// Create a provider:
export function PhraseContextProvider({ children }) {
  const [currentPhrase, setCurrentPhrase] = ('');

  function addWord(word) {
    setCurrentPhrase((prevPhrase) => {
      const newPhrase = prevPhrase.lenght > 0
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