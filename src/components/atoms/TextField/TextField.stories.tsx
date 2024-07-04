import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITextFieldProps } from './TextFieldProps';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { fieldBaseVariants } from '@/components/atoms/FieldBase';
import { TextField } from './TextField';

// https://m3.material.io/components/text-fields/overview
// https://material-web.dev/components/text-field/
// https://github.com/material-components/material-web/blob/main/textfield/demo/stories.ts

const meta = {
  component: TextField<HTMLElement>,
} satisfies Meta<typeof TextField<HTMLElement>>;

type IStory = StoryObj<ITextFieldProps<HTMLElement>>;

const styles = stylex.create({
  host: {
    width: 260,
  },
});

const defaultArgs = {
  sx: styles.host,
  onValueChange: (...args) => void sbHandleEvent('valueChange', args),
} satisfies Partial<ITextFieldProps<HTMLElement>>;

const states: Array<IComponentPresentation<ITextFieldProps<HTMLElement>>> = [
  { legend: 'Enabled' },
  {
    legend: 'Hovered',
    props: { visualState: { hovered: true } },
  },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const rows: Array<IComponentPresentation<ITextFieldProps<HTMLElement>>> = [
  { legend: 'Normal' },
  { legend: 'Error', props: { defaultValue: 'Value', hasError: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      cols={fieldBaseVariants.map((variant) => ({
        props: {
          variant,
          placeholder: capitalizeFirstLetter(variant),
        },
      }))}
      rows={[
        {
          legend: 'Text field',
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
