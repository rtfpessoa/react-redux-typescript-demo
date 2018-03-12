// src/components/App.test.tsx

import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { Picker } from './Picker';

enzyme.configure({ adapter: new Adapter() });

it('renders the correct selected subreddit', () => {
  const props = {
    value: 'scala',
    options: ['react', 'scala'],
    onChange: (v: string) => null
  };
  const hello = enzyme.shallow(<Picker {...props} />);
  expect(hello.find('h1').text()).toEqual('scala');
});
