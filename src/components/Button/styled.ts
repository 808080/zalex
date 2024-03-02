import styled from 'styled-components';
import { C_PRIMARY } from '../../assets/styles/constants';

export const ButtonStyled = styled.button<{ disabled?: boolean }>`
  cursor: pointer;
  border-radius: 8px;
  background-color: #fff;
  border: 2px solid ${C_PRIMARY};
  color: ;
  padding: 10px 14px;
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  transition: .3s;
  &:hover {
    background-color: ${C_PRIMARY};
    color: #fff;
  }
`;