import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITextFieldBaseProps } from './TextFieldBaseProps';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { fieldBaseVariants } from '@/components/atoms/FieldBase';
import { TextFieldBase } from './TextFieldBase';

// https://m3.material.io/components/text-fields/overview
// https://material-web.dev/components/text-field/
// https://github.com/material-components/material-web/blob/main/textfield/demo/stories.ts

const meta = {
  component: TextFieldBase<HTMLElement>,
} satisfies Meta<typeof TextFieldBase<HTMLElement>>;

type IStory = StoryObj<ITextFieldBaseProps<HTMLElement>>;

const styles = stylex.create({
  host: {
    width: 260,
  },
});

const defaultArgs = {
  sx: styles.host,
  onValueChange: (...args) => void sbHandleEvent('valueChange', args),
} satisfies Partial<ITextFieldBaseProps<HTMLElement>>;

const states: Array<IComponentPresentation<ITextFieldBaseProps<HTMLElement>>> =
  [
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

const rows: Array<IComponentPresentation<ITextFieldBaseProps<HTMLElement>>> = [
  { legend: 'Normal' },
  { legend: 'Error', props: { defaultValue: 'Value', hasError: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextFieldBase}
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
      component={TextFieldBase}
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
      component={TextFieldBase}
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
