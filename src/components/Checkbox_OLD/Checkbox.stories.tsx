import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { delay } from '@olivierpascal/helpers';

import type { IOmit } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICheckboxProps } from './Checkbox.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ComponentShowcase } from '../ComponentShowcase';
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
} satisfies Partial<ICheckboxProps>;

const states: Array<IComponentPresentation<ICheckboxProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
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
        { props: { defaultChecked: true } },
        { props: { defaultIndeterminate: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

const ControlledCheckbox: React.FC<IOmit<ICheckboxProps, 'checked'>> = (
  props,
) => {
  const [checked, setChecked] = useState(props.defaultChecked ?? false);
  const [indeterminate, setIndeterminate] = useState(
    props.indeterminate ?? false,
  );

  return (
    <Checkbox
      {...props}
      checked={checked}
      onChange={(event, value) => {
        const checked = value !== undefined;

        return delay(300).then(() => {
          setIndeterminate(false);
          setChecked(checked);
          props.onChange?.(event, value);
        });
      }}
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
        { props: { defaultChecked: true } },
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
        { legend: 'Checked', props: { defaultChecked: true } },
        { legend: 'Indeterminate', props: { indeterminate: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
