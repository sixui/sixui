import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { delay } from '@olivierpascal/helpers';

import type { ICheckboxOwnProps } from './CheckboxProps';
import type { IOmit } from '@/helpers/types';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Checkbox } from './Checkbox';

// https://m3.material.io/components/checkbox/overview
// https://material-web.dev/components/checkbox/
// https://github.com/material-components/material-web/blob/main/checkbox/demo/stories.ts

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args),
} satisfies Partial<ICheckboxOwnProps>;

const states: Array<IComponentPresentation<ICheckboxOwnProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Disabled', props: { disabled: true } },
  { legend: 'Loading', props: { loading: true } },
];

export const Uncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Checkbox}
      props={props}
      cols={[
        {},
        { props: { defaultValue: true } },
        { props: { indeterminate: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

const ControlledCheckbox: React.FC<
  IOmit<ICheckboxOwnProps, 'checked' | 'value'>
> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? false);
  const [indeterminate, setIndeterminate] = useState(
    props.indeterminate ?? false,
  );

  return (
    <Checkbox
      {...props}
      value={value}
      onChange={(event, value) =>
        delay(300).then(() => {
          setIndeterminate(false);
          setValue(value);
          props.onChange?.(event, value);
        })
      }
      indeterminate={indeterminate}
    />
  );
};

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledCheckbox}
      props={props}
      cols={[
        {},
        { props: { defaultValue: true } },
        { props: { indeterminate: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Checkbox}
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Checked', props: { defaultValue: true } },
        { legend: 'Indeterminate', props: { indeterminate: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
