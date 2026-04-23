// src/contexts/SidebarContext.js
import React, { createContext, useState, useContext, useMemo } from 'react';

// 1. Criar o Contexto
const SidebarContext = createContext(null);

// 2. Criar o Provedor
export function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado inicial

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Usar useMemo para evitar recriar o objeto de valor em cada renderização
  const value = useMemo(() => ({
    isSidebarOpen,
    toggleSidebar,
    // Se precisar definir explicitamente (ex: fechar ao navegar), adicione:
    // closeSidebar: () => setIsSidebarOpen(false),
    // openSidebar: () => setIsSidebarOpen(true),
  }), [isSidebarOpen]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

// 3. Criar o Hook Customizado para consumir o contexto
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}