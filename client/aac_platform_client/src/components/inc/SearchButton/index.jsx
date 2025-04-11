import { Search } from 'lucide-react';
import {
  SearchButtonContainer
} from './styled';

function SearchButton(props) {
  return(
    <SearchButtonContainer onClick={props.handleSearchClick}>
      <Search size={18} color="white"/>
    </SearchButtonContainer>
  );
}

export default SearchButton;