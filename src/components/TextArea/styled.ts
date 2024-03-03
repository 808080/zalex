import styled from 'styled-components';

export const TextAreaStyled = styled.div<{ $invalid: boolean }>`
  margin-bottom: 20px;

  .label {
    margin-bottom: 5px;
  }
  .input {
    width: 100%;
    padding: 8px;
    border: 1px solid ${({ $invalid }) => $invalid ? 'red' : '#ccc'};
    border-radius: 5px;
    font-size: 14px;
    outline: none;
    max-width: 500px;
    min-height: 100px;
  }
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;