import {
  ConfigHeaderContainer,
  ConfigList,
  ListItem,
  ListButton
} from './styled';

function ConfigHeader() {
  return (
    <ConfigHeaderContainer>
      <ConfigList>
        <ListItem>
          <ListButton>Célula</ListButton>
        </ListItem>
        <ListItem>
          <ListButton>Prancha</ListButton>
        </ListItem>
      </ConfigList>
    </ConfigHeaderContainer>
  );
}

export default ConfigHeader;