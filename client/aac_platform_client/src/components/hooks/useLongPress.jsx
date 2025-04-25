import { useCallback, useRef, useEffect } from 'react';

function useLongPress(
    callback, // A função a ser chamada no long press
    { delay = 1000, // Tempo em milissegundos para considerar long press (1 segundo por padrão)
      shouldPreventDefault = true // Opcional: previne o comportamento padrão (ex: menu de contexto)
    } = {} // Objeto de opções com valores padrão
  ) {

  // Ref para armazenar o ID do timer setTimeout
  const timeout = useRef(null);
  // Ref para armazenar a callback mais recente, evitando problemas com closures em setTimeout
  const savedCallback = useRef(callback);

  // Atualiza a ref da callback se ela mudar
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Função para iniciar o timer
  const start = useCallback((event) => {
    // Previne comportamento padrão (ex: menu de contexto no mobile/desktop) se configurado
    if (shouldPreventDefault && event.cancelable) {
        // event.preventDefault(); // Descomente se precisar previnir o default no início
    }

    // Limpa qualquer timer anterior (segurança)
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // Inicia um novo timer
    timeout.current = setTimeout(() => {
      // Chama a callback mais recente quando o timer completar
      savedCallback.current(event); // Passa o evento original se necessário
    }, delay);

  }, [delay, shouldPreventDefault]); // Recria se delay ou shouldPreventDefault mudar

  // Função para limpar o timer
  const clear = useCallback(() => {
    // Limpa o timer se ele existir
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null; // Limpa a ref
    }
  }, []); // Não tem dependências externas diretas

  // Handler para prevenir o menu de contexto (geralmente disparado com long press/right click)
  const handleContextMenu = useCallback((e) => {
    if (shouldPreventDefault) {
      e.preventDefault(); // Previne o menu de contexto
    }
    // Limpa o timer também, pois o context menu interrompe o "press"
    clear();
  }, [shouldPreventDefault, clear]);


  // Efeito para limpar o timer se o componente for desmontado
  useEffect(() => {
    // A função de cleanup do useEffect será chamada quando o componente desmontar
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []); // Roda apenas na montagem e desmontagem

  // Retorna os handlers de evento para serem aplicados ao elemento desejado
  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear, // Importante: Limpa se o mouse sair do elemento enquanto pressionado
    onTouchEnd: clear,
    onTouchCancel: clear, // Importante: Limpa se o toque for cancelado (ex: scroll)
    onContextMenu: handleContextMenu // Para previnir menu de contexto
  };
}

export default useLongPress;