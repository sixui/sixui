import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Radio, type IRadioProps, type IRadioOwnProps } from './Radio';

// https://m3.material.io/components/radio/overview
// https://material-web.dev/components/radio/
// https://github.com/material-components/material-web/blob/main/radio/demo/stories.ts

const meta = {
  component: Radio,
} satisfies Meta<typeof Radio>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args, 300),
} satisfies Partial<IRadioProps>;

const states: Array<IComponentPresentation<IRadioOwnProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const ControlledRadio: React.FC<Omit<IRadioProps, 'onChange' | 'as'>> = (
  props,
) => {
  const [value, setValue] = useState('2');

  return (
    <>
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
    </>
  );
};

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase component={ControlledRadio} props={props} />
  ),
  args: defaultArgs,
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Radio}
      props={props}
      cols={states}
      rows={[
        { legend: 'Unselected' },
        { legend: 'Selected', props: { checked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
