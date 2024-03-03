import { FC } from 'react';
import { setModalContent, updateRequest } from '../../store/actionCreators';
import Button from '../Button';
import Title from '../Title';
import { useTypedSelector } from '../../hooks/useTypedSelect';
import { Request } from '../../mockDB/requests';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextArea from '../TextArea';

const CloseModal = ({ text = 'Close' }: { text?: string }) => {
  const handleClick = () => { setModalContent({ contentType: null, data: undefined }) };
  return <Button text={text} type='button' onClick={handleClick} />;
};

const puroseSchema = z.object({
  purpose: z.string().min(50, { message: 'Minimum length is 50 characters' }),
});

type PuroseSchema = z.infer<typeof puroseSchema>;

const Content = {
  wrongCreds: () => <div style={{ textAlign: 'center' }}>
    <Title style={{ marginBottom: '40px' }}>Wrong email or password</Title>
    <CloseModal />
  </div>,
  editPurpose: () => {
    const { data } = useTypedSelector(state => state.modal) as { data: Request };

    const methods = useForm<PuroseSchema>({
      resolver: zodResolver(puroseSchema),
      mode: 'all',
      criteriaMode: 'all',
      defaultValues: {
        purpose: data.purpose
      }
    });

    const handleSave = (fields: PuroseSchema) => {
      updateRequest({ ...data, purpose: fields.purpose });
      setModalContent({ contentType: null, data: undefined });
    };

    return <div>
      <Title>Edit purpose</Title>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSave)}>
          <TextArea label='' name='purpose' />

          <div>
            <Button text='Save' type='submit' />
            <CloseModal text='Cancel' />
          </div>
        </form>
      </FormProvider>
    </div>;
  }
};

export type ModalContentType = keyof typeof Content;

type Props = {
  contentType: ModalContentType;
};

const ModalContent: FC<Props> = ({ contentType }) => Content[contentType]();

export default ModalContent;