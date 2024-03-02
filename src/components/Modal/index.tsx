import ReactModal from 'react-modal';
import { useTypedSelector } from '../../hooks/useTypedSelect';
import ModalContent from './ModalContent';
import { CSSProperties } from 'react';

ReactModal.setAppElement('body');

const Modal = () => {
  const { contentType } = useTypedSelector(state => state.modal);

  return <ReactModal isOpen={Boolean(contentType)} style={customStyles}>
    {contentType && <ModalContent contentType={contentType} />}
  </ReactModal>;
};

export default Modal;

const customStyles = {
  overlay: {
    backgroundColor: '#00000080'
  } satisfies CSSProperties,
  content: {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    minHeight: '185px',
    padding: '20px 40px',
  } satisfies CSSProperties,
};