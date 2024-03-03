import { ChangeEventHandler, FC } from 'react';
import { Option } from '../../utils/types';

type Props = {
  name: string;
  options: Option[];
  onChange: (value: string) => void;
};

const Select: FC<Props> = ({ name, options, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(e.target.value);
  };

  return <div>
    <select name={name} id={name} onChange={handleChange}>
      <option value={''}>-- none --</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>;
};

export default Select;