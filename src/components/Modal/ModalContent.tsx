import { FC } from 'react';
import { createRequest, setModalContent, updateRequest } from '../../store/actionCreators';
import Button from '../Button';
import Title from '../Title';
import { useTypedSelector } from '../../hooks/useTypedSelect';
import { Request, getRequestIdCount } from '../../mockDB/requests';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextArea from '../TextArea';
import { getCurrentUser } from '../../mockDB/users';
import Input from '../Input';
import DatePicker from '../DatePicker';
import httpRequest, { HTTPmethods } from '../../utils/http';

const CloseModal = ({ text = 'Close' }: { text?: string }) => {
  const handleClick = () => { setModalContent({ contentType: null, data: undefined }) };
  return <Button text={text} type='button' onClick={handleClick} />;
};

const puroseSchema = z.object({
  purpose: z.string().min(50, { message: 'Minimum length is 50 characters' }),
});

type PurposeSchema = z.infer<typeof puroseSchema>;



const certSchema = z.object({
  address_to: z.string().regex(/^(?=.*[^\W_])[\w ]*$/, { message: 'Only letters and numbers allowed' }),
  purpose: z.string().min(50, { message: 'Minimum length is 50 characters' }),
  issued_on: z.coerce.date().min(new Date(), { message: 'Issue date can\'t be in the past' }),
  employee_id: z.string().regex(/^\d+$/, { message: 'Digits allowed only' }),
});

type CertSchema = z.infer<typeof certSchema>;


const Content = {
  wrongCreds: () => <div style={{ textAlign: 'center' }}>
    <Title style={{ marginBottom: '40px' }}>Wrong email or password</Title>
    <CloseModal />
  </div>,
  editPurpose: () => {
    const { data } = useTypedSelector(state => state.modal) as { data: Request };

    const methods = useForm<PurposeSchema>({
      resolver: zodResolver(puroseSchema),
      mode: 'all',
      criteriaMode: 'all',
      defaultValues: {
        purpose: data.purpose
      }
    });

    const handleSave = (fields: PurposeSchema) => {
      updateRequest({ ...data, purpose: fields.purpose });
      setModalContent({ contentType: null, data: undefined });
    };

    return <div>
      <Title>Edit purpose</Title>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSave)}>
          <TextArea label='' name='purpose' />

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button text='Save' type='submit' />
            <CloseModal text='Cancel' />
          </div>
        </form>
      </FormProvider>
    </div>;
  },
  newCert: () => {
    const methods = useForm<CertSchema>({
      resolver: zodResolver(certSchema),
      mode: 'all',
      criteriaMode: 'all',
      defaultValues: {
        purpose: '',
        address_to: '',
        employee_id: getCurrentUser()?.id || '0',
        issued_on: new Date()
      }
    });

    const handleSave = async (fields: CertSchema) => {
      const dateFormatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      }).format(new Date(fields.issued_on));

      const res = await httpRequest<{ responce: string }>(HTTPmethods.POST, '/request-certificate', {
        address_to: fields.address_to,
        purpose: fields.purpose,
        issued_on: dateFormatted,
        employee_id: `${+fields.employee_id}`
      });

      if (res.responce === 'Ok') {
        createRequest({
          ...fields,
          employee_id: `${+fields.employee_id}`,
          issued_on: dateFormatted,
          id: getRequestIdCount(),
          reference_no: +getRequestIdCount(),
          status: 'New',
        });
        setModalContent({ contentType: 'success', data: undefined });
      }
    };

    return <div>
      <Title>New certificate</Title>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSave)}>
          <TextArea label='Address to' name='address_to' />
          <TextArea label='Purpose' name='purpose' />
          <DatePicker label='Issued on' name='issued_on' />
          <Input label='Employee ID' name='employee_id' type='text' />

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button text='Submit' type='submit' />
            <CloseModal text='Cancel' />
          </div>
        </form>
      </FormProvider>
    </div>;
  },
  success: () => <div style={{ textAlign: 'center' }}>
    <Title style={{ marginBottom: '40px' }}>Request created successfully</Title>
    <CloseModal />
  </div>,
};

export type ModalContentType = keyof typeof Content;

type Props = {
  contentType: ModalContentType;
};

const ModalContent: FC<Props> = ({ contentType }) => Content[contentType]();

export default ModalContent;