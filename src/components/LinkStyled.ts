import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { C_PRIMARY_DARK } from '../assets/styles/constants';

export const LinkStyled = styled(Link)`
  color: ${C_PRIMARY_DARK};
  text-decoration: none;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;