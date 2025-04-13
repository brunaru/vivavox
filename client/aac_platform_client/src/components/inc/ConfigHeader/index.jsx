import {
  ConfigHeaderContainer,
  ConfigList,
  ListItem,
  ListButton
} from './styled';

function ConfigHeader(props) {  
  function handleClickL() {
    props.setActiveMenu(false);
  }

  function handleClickR() {
    props.setActiveMenu(true);
  }

  return (
    <ConfigHeaderContainer>
      <ConfigList>
        <ListItem>
          <ListButton onClick={handleClickL} $activeButton={props.activeMenu === false} >{props.text1}</ListButton>
        </ListItem>
        <ListItem>
          <ListButton onClick={handleClickR} $activeButton={props.activeMenu === true} >{props.text2}</ListButton>
        </ListItem>
      </ConfigList>
    </ConfigHeaderContainer>
  );
}

export default ConfigHeader;