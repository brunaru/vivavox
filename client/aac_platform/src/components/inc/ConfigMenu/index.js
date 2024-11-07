import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import Input from '../Input';
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
            <Input label="Texto" />
            <Input label="Cor da borda" />
          </ConfigCellForm>
        </ConfigCellContainer>
      }
    </ConfigMenuContainer>
  );
}

export default ConfigMenu;