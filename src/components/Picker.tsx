// src/components/Picker.tsx

import * as React from 'react';

export interface Props {
  options: Array<string>;
  value: string;
  onChange: (_: string) => void;
}

export const Picker = (props: Props) => {
  const { options, value, onChange } = props;
  return (
    <div>
      <span>
        <h1>{value}</h1>
        <select
          onChange={e => onChange(e.target.value)}
          value={value}
        >
          {options.map(option =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    </div >
  );
};
