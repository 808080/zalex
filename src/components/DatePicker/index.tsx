import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePickerStyled } from './styled';

type Props = {
  name: string,
  label: string,
};

const DatePicker: FC<Props> = ({ name, label }) => {
  const { control } = useFormContext();

  return <Controller name={name} control={control} render={({ field, fieldState, formState }) => {

    const invalid = Boolean((fieldState.isTouched || formState.isSubmitted) && fieldState.error);

    return <DatePickerStyled $invalid={invalid}>
      <label htmlFor={name} className='wrap'>
        <div className='label'>{label}</div>
        <input {...field} id={name} className='input' autoComplete='off' type='date' />
      </label>

      {invalid && <div className='error'>{fieldState.error?.message}</div>}
    </DatePickerStyled>;
  }}
  />;
};

export default DatePicker;