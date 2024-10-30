import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import {
  ConfigCellMenuContainer
} from './styled';

function ConfigCellMenu() {
  const {configCell} = useCell();

  return (
    <ConfigCellMenuContainer>
      <ConfigHeader/>
      {/* <p>{configCell.text}</p> */}
    </ConfigCellMenuContainer>
  );
}

export default ConfigCellMenu;