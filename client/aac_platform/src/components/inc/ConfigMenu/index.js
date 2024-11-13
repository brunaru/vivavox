import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import Input from '../Input';
import Button from '../Button';
import {
  ConfigMenuContainer,
  ConfigCellContainer,
  ConfigCellForm
} from './styled';
import ColorPicker from '../ColorPicker';

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
            <ColorPicker label="Cor da borda"/>
          </ConfigCellForm>
          <Button 
              text="Confirmar" 
              height="40px" 
              width="180px" 
              margin="150px 0 0 0" 
            />
        </ConfigCellContainer>
      }
    </ConfigMenuContainer>
  );
}

export default ConfigMenu;