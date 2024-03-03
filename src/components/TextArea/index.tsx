import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextAreaStyled } from './styled';

type Props = {
  name: string,
  label: string,
};

const TextArea: FC<Props> = ({ name, label }) => {
  const { control } = useFormContext();

  return <Controller name={name} control={control} render={({ field, fieldState, formState }) => {

    const invalid = Boolean((fieldState.isTouched || formState.isSubmitted) && fieldState.error);

    return <TextAreaStyled $invalid={invalid}>
      <label htmlFor={name} className='wrap'>
        <div className='label'>{label}</div>
        <textarea {...field} id={name} className='input' autoComplete='off' />
      </label>

      {invalid && <div className='error'>{fieldState.error?.message}</div>}
    </TextAreaStyled>;
  }}
  />;
};

export default TextArea;