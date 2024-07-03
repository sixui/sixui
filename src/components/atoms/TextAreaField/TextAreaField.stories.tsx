import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITextAreaFieldProps } from './TextAreaFieldProps';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { fieldBaseVariants } from '@/components/atoms/FieldBase';
import { TextAreaField } from './TextAreaField';

const meta = {
  component: TextAreaField,
} satisfies Meta<typeof TextAreaField>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 260,
  },
});

const defaultArgs = {
  sx: styles.host,
  onValueChange: (...args) => void sbHandleEvent('valueChange', args),
} satisfies Partial<ITextAreaFieldProps>;

const states: Array<IComponentPresentation<ITextAreaFieldProps>> = [
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

const rows: Array<IComponentPresentation<ITextAreaFieldProps>> = [
  { legend: 'Empty' },
  { legend: 'Label', props: { label: 'Label' } },
  { legend: 'Placeholder', props: { placeholder: 'Placeholder' } },
  { legend: 'Clearable', props: { clearable: true } },
  { legend: 'Error', props: { defaultValue: 'Value', hasError: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextAreaField}
      props={props}
      cols={fieldBaseVariants.map((variant) => ({
        props: {
          variant,
          placeholder: capitalizeFirstLetter(variant),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextAreaField}
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
      component={TextAreaField}
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
