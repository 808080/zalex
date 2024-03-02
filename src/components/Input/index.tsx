import { FC, HTMLInputTypeAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputStyled } from './styled';

type Props = {
  type: HTMLInputTypeAttribute,
  name: string,
  label: string,
};

const Input: FC<Props> = ({ type, name, label }) => {
  const { control } = useFormContext();

  return <Controller name={name} control={control} render={({ field, fieldState, formState }) => {

    const invalid = Boolean((fieldState.isTouched || formState.isSubmitted) && fieldState.error);

    return <InputStyled $invalid={invalid}>
      <label htmlFor={name} className='wrap'>
        <div className='label'>{label}</div>
        <input {...field} id={name} className='input' autoComplete='off' type={type} />
      </label>

      {invalid && <div className='error'>{fieldState.error?.message}</div>}
    </InputStyled>;
  }}
  />;
};

export default Input;