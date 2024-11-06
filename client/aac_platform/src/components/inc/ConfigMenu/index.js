import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import {
  ConfigMenuContainer,
  ConfigCellContainer,
  ConfigCellForm
} from './styled';

function ConfigMenu() {
  const {configCell} = useCell();

  return (
    <ConfigMenuContainer>
      <ConfigHeader/>
      {
        configCell &&
        <ConfigCellContainer>
          <ConfigCellForm>
            
          </ConfigCellForm>
        </ConfigCellContainer>
      }
    </ConfigMenuContainer>
  );
}

export default ConfigMenu;