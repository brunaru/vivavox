import { useEffect, useState } from 'react';
import { useCell } from '../../contexts/CellContext';
import {
  ConfigHeaderContainer,
  ConfigList,
  ListItem,
  ListButton
} from './styled';

function ConfigHeader() {
  const {configCell} = useCell();
  const [activeMenu, setActiveMenu] = useState(null);

  useState(() => {
    if(configCell !== null) {
      setActiveMenu("cell");
    }
  }, [configCell]);

  return (
    <ConfigHeaderContainer>
      <ConfigList>
        <ListItem>
          <ListButton $activeButton={activeMenu === "cell"} >Célula</ListButton>
        </ListItem>
        <ListItem>
          <ListButton $activeButton={activeMenu === "board"} >Prancha</ListButton>
        </ListItem>
      </ConfigList>
    </ConfigHeaderContainer>
  );
}

export default ConfigHeader;