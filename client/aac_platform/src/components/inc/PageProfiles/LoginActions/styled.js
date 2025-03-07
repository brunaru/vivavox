import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom';

export const LoginActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 25%;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 0;
  gap: 12px;
  font-size: 1vw;
`;

export const CreateAccountText = styled.p`
  font-weight: 500;
`;

export const CreateAccountLink = styled(Link)`
  color: #003466;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;