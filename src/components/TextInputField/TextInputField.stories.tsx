import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITextInputFieldProps } from './TextInputField.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { scaleTokens } from '~/themes/base/scale.stylex';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import type { IFieldBaseVariant } from '../FieldBase';
import { TextInputField } from './TextInputField';

const meta = {
  component: TextInputField,
} satisfies Meta<typeof TextInputField>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: `calc(260px * ${scaleTokens.scale})`,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('change', args),
  onValueChange: (...args) => void sbHandleEvent('valueChange', args),
} satisfies Partial<ITextInputFieldProps>;

const states: Array<IComponentPresentation<ITextInputFieldProps>> = [
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

const rows: Array<IComponentPresentation<ITextInputFieldProps>> = [
  { legend: 'Empty' },
  { legend: 'Label', props: { label: 'Label' } },
  { legend: 'Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'Value',
    props: {
      defaultValue: 'Value',
      prefixText: '$',
      suffixText: '.00',
    },
  },
  { legend: 'Clearable', props: { clearable: true } },
  {
    legend: 'Password',
    props: { type: 'password' },
  },
  {
    legend: 'Date',
    props: { type: 'datetime-local' },
  },
  {
    legend: 'Color',
    props: { type: 'color', defaultValue: '#0000ff' },
  },
  { legend: 'Error', props: { defaultValue: 'Value', hasError: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextInputField}
      props={props}
      cols={(['filled', 'outlined'] as Array<IFieldBaseVariant>).map(
        (variant) => ({
          props: {
            variant,
            placeholder: capitalizeFirstLetter(variant),
          },
        }),
      )}
    />
  ),
  args: defaultArgs,
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextInputField}
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
      component={TextInputField}
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
