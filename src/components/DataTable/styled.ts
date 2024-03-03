import styled from 'styled-components';
import { C_PRIMARY } from '../../assets/styles/constants';

export const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th {
    background-color: #f2f2f2;
    padding: 12px;
    text-align: left;
    vertical-align: bottom;
  }

  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }

    &:hover {
      background-color: #e6e6e6;
    }
  }

  td, th {
    padding: 12px;
    border: 1px solid #ddd;
    position: relative;

    &:has(.edit-button) {
      padding-top: 25px;
    }

    .edit-button {
      position: absolute;
      top: 3px;
      right: 3px;
      background-color: ${C_PRIMARY};
      font-size: 18px;
      color: #fff;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      text-align: center;
      line-height: 22px;
      opacity: .5;

      &:hover {
        opacity: 1;
      }
    }
  }

  .sort {
    cursor: pointer;
  }

  .filter {
    margin-bottom: 10px;
  }
`;