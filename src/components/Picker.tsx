// src/components/Picker.tsx

import * as React from 'react';

export interface Props {
  options: string[];
  value: string;
  onChange: (_: string) => void;
}

export class Picker extends React.PureComponent<Props, object> {
  render() {
    const { options, value, onChange } = this.props;
    return (
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
    );
  }
}

export default Picker;
