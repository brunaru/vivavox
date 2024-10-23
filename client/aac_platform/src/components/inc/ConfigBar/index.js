import {
  ConfigBarContainer
} from "./styled";

function ConfigBar({ color, width, height }) {
  return (
    <ConfigBarContainer 
      $color={color} 
      $width={width} 
      $height={height}
    >
    </ConfigBarContainer>
  );
}

export default ConfigBar;