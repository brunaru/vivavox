import { useEffect, useState } from 'react';
import { useCell } from '../../contexts/CellContext';
import {
  ConfigHeaderContainer,
  ConfigList,
  ListItem,
  ListButton
} from './styled';

function ConfigHeader(props) {
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
          <ListButton $activeButton={activeMenu === "cell"} >{props.text1}</ListButton>
        </ListItem>
        <ListItem>
          <ListButton $activeButton={activeMenu === "board"} >{props.text2}</ListButton>
        </ListItem>
      </ConfigList>
    </ConfigHeaderContainer>
  );
}

export default ConfigHeader;