import { FC } from 'react';
import { setModalContent } from '../../store/actionCreators';
import Button from '../Button';
import Title from '../Title';

const CloseModal = ({ text = 'Close' }: { text?: string }) => {
  const handleClick = () => { setModalContent(null) };
  return <Button text={text} type='button' onClick={handleClick} />;
};

const Content = {
  wrongCreds: () => <div style={{ textAlign: 'center' }}>
    <Title style={{ marginBottom: '40px' }}>Wrong email or password</Title>
    <CloseModal />
  </div>
};

export type ModalContentType = keyof typeof Content;

type Props = {
  contentType: ModalContentType;
};

const ModalContent: FC<Props> = ({ contentType }) => Content[contentType]();

export default ModalContent;