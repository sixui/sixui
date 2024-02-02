import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { Radio, type IRadioProps } from './Radio';

// https://m3.material.io/components/radio/overview
// https://material-web.dev/components/radio/
// https://github.com/material-components/material-web/blob/main/radio/demo/stories.ts

const meta = {
  component: Radio,
} satisfies Meta<typeof Radio>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (args) => sbHandleEvent('change', args),
} satisfies Partial<IRadioProps>;

const statesProps: IComponentPropsWithLegend<IRadioProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', disabled: true },
];

const RadioWithState: React.FC<Omit<IRadioProps, 'onChange'>> = (props) => {
  const [value, setValue] = React.useState('2');

  return (
    <React.Fragment>
      <Radio
        {...props}
        aria-label='First radio'
        name='group'
        value='1'
        checked={value === '1'}
        onChange={() => setValue('1')}
      />
      <Radio
        {...props}
        aria-label='Second radio'
        name='group'
        value='2'
        checked={value === '2'}
        onChange={() => setValue('2')}
      />
      <Radio
        {...props}
        aria-label='Third radio'
        name='group'
        value='3'
        checked={value === '3'}
        onChange={() => setValue('3')}
      />
    </React.Fragment>
  );
};

export const Demo: IStory = {
  render: (props) => (
    <ComponentShowcase component={RadioWithState} props={props} />
  ),
  args: defaultArgs,
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Radio}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Unselected' },
        { $legend: 'Selected', checked: true },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
