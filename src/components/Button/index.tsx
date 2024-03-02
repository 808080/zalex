import { FC } from 'react';
import { ButtonStyled } from './styled';

type Props = {
  text: string
  type: 'submit' | 'button',
  onClick?: () => void,
};

const Button: FC<Props> = ({ text, type, onClick }) => (
  <ButtonStyled type={type} onClick={onClick}>{text}</ButtonStyled>
);

export default Button;