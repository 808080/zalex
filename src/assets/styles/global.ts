import { createGlobalStyle } from 'styled-components';
import { C_BG } from './constants';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    padding: 30px;
    margin: 0;
    background-color: ${C_BG};
    font-family: sans-serif;
  }
`;