import { useBoard } from '../../contexts/BoardContext';
import ConfirmButton from '../ConfirmButton';
import { useState } from 'react';
import Input from '../Input';
import {
  BoardMenuContainer,
  SettingsContainer,
  BoardForm
} from './styled';

function BoardMenu() {
  const {board, setBoard, setConfigBoard} = useBoard();

  function handleNameChange(e) {
    const newBoard = {...board, name: e.target.value};
    setBoard(newBoard);
  }

  function closeBoardMenu() {
    setConfigBoard(false);
  }

  return (
    <BoardMenuContainer>
      <SettingsContainer>
        <BoardForm>
          <Input text={board?.name || ''} handleTextChange={handleNameChange} label="Nome da prancha" />
        </BoardForm>
      </SettingsContainer>
      <ConfirmButton 
        updateCell={closeBoardMenu}
        text="Confirmar" 
        height="40px" 
        width="180px" 
        margin="60px 0 60px 0" 
      />
    </BoardMenuContainer>
  );
}

export default BoardMenu;