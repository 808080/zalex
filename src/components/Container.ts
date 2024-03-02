import styled from 'styled-components';
import { BORDER } from '../assets/styles/constants';

const Container = styled.div<{ $maxWidth: number }>`
  margin-inline: auto;
  border: ${BORDER};
  overflow: hidden;
  background-color: #fff;
  border-radius: 7px;
  padding: 20px;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
`;

export default Container;